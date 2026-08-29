const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisRequest {
  image: string;
  country: string;
  city: string;
  environment: string;
}

interface AnalysisResult {
  observed: string[];
  possiblePattern: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  confidence: "LOW" | "MEDIUM" | "HIGH";
  investigateNext: string;
}

const SYSTEM_PROMPT = `You are an environmental waste observation analyst. You analyze photographs of environments to identify visible waste items.

CRITICAL RULES:
1. Analyze ONLY what is reasonably visible in the submitted photograph.
2. Identify visible waste categories such as: plastic bottles, food packaging, paper, cans, cigarette butts, glass, plastic bags/wrappers, organic waste, electronic waste, textiles, construction debris, fishing gear, medical waste, or other identifiable waste.
3. Do NOT assume waste exists based on the location context (country, city, environment type). These provide background context only.
4. If no waste is visible in the photograph, say so honestly.
5. Never claim that a single photograph proves a broader environmental pattern.
6. Be cautious and scientific in your language.

You must respond with a JSON object matching this TypeScript interface exactly:
{
  "observed": string[],
  "possiblePattern": string,
  "priority": "LOW" | "MEDIUM" | "HIGH",
  "confidence": "LOW" | "MEDIUM" | "HIGH",
  "investigateNext": string
}

Return ONLY the JSON object. No markdown, no code fences, no explanations outside the JSON.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { image, country, city, environment } = (await req.json()) as AnalysisRequest;

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            "AI API key not configured. Get a free key at https://aistudio.google.com/apikey and add it as GEMINI_API_KEY in your Supabase Edge Function secrets.",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const userPrompt = `Analyze this photograph for visible waste and environmental observations.

Location context (for background only — do NOT use this to assume what waste is present):
- Country: ${country || "Not specified"}
- City/Community: ${city || "Not specified"}
- Environment type: ${environment || "Not specified"}

Identify only what you can actually see in the image. Return the JSON object as specified.`;

    // Extract base64 data from data URL
    const base64Match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    let imageData: string;
    let mimeType: string;

    if (base64Match) {
      mimeType = base64Match[1];
      imageData = base64Match[2];
    } else {
      // Assume it's raw base64 with no prefix
      mimeType = "image/jpeg";
      imageData = image;
    }

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            {
              role: "user",
              parts: [
                { text: userPrompt },
                { inline_data: { mime_type: mimeType, data: imageData } },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
          },
        }),
      },
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      let providerError: { error?: { code?: number; message?: string; status?: string } } = {};
      try {
        providerError = JSON.parse(errorText) as typeof providerError;
      } catch {
        providerError = {};
      }

      const providerMessage = providerError.error?.message;
      let message: string;

      if (geminiResponse.status === 429) {
        message =
          providerMessage ||
          "Gemini free-tier rate limit reached (15 requests/minute). Wait a moment and try again.";
      } else if (geminiResponse.status === 400 && providerMessage?.includes("API key not valid")) {
        message =
          "The Gemini API key is invalid. Check your key at https://aistudio.google.com/apikey and update the GEMINI_API_KEY secret in Supabase.";
      } else {
        message = providerMessage || `Gemini API returned status ${geminiResponse.status}`;
      }

      console.error("Gemini API error:", geminiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: message }),
        { status: geminiResponse.status === 429 ? 429 : 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const geminiData = await geminiResponse.json();

    // Extract text from Gemini response
    let rawText = "";
    if (
      geminiData.candidates &&
      Array.isArray(geminiData.candidates) &&
      geminiData.candidates[0]?.content?.parts
    ) {
      for (const part of geminiData.candidates[0].content.parts) {
        if (part.text) {
          rawText += part.text;
        }
      }
    }

    if (!rawText) {
      const finishReason = geminiData.candidates?.[0]?.finishReason;
      console.error("Unexpected Gemini response:", JSON.stringify(geminiData).slice(0, 500));
      const message =
        finishReason === "SAFETY"
          ? "The image was blocked by Gemini's safety filters. Try a different photo."
          : "Could not extract analysis from AI response.";
      return new Response(
        JSON.stringify({ error: message }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Parse the JSON from the AI response
    let cleaned = rawText.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }

    let result: AnalysisResult;
    try {
      result = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response as JSON:", cleaned.slice(0, 300));
      return new Response(
        JSON.stringify({ error: "AI response was not valid JSON" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Validate required fields
    if (!Array.isArray(result.observed) || typeof result.possiblePattern !== "string") {
      return new Response(
        JSON.stringify({ error: "AI response missing required fields" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Clamp priority and confidence to allowed values
    const validLevels = ["LOW", "MEDIUM", "HIGH"] as const;
    if (!validLevels.includes(result.priority)) result.priority = "MEDIUM";
    if (!validLevels.includes(result.confidence)) result.confidence = "MEDIUM";

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
