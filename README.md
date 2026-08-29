# G-WIN AI Detective

> **Global Waste Intelligence Network** — AI-assisted environmental observation prototype.

G-WIN AI Detective is a tool that helps communities notice possible waste patterns and decide what should be investigated by humans. A user uploads a photograph of a waste situation, enters the country and location, selects the environment type, and receives a **Detective Report**.

```
PHOTO + LOCATION + COUNTRY + G-WIN OBSERVATIONS
  → AI DETECTIVE
  → POSSIBLE PATTERN
  → HUMAN INVESTIGATION
```

The purpose is **not** to make definitive environmental claims. The purpose is to turn observations into questions worth investigating.

---

## Status: Prototype / Demo

This is a **prototype**. It uses a built-in demo analysis engine — **no external AI API is connected** and **no API keys are required** to run it. All detective reports are generated from sample logic and are clearly labelled as demonstration results.

The code is structured so a real AI vision model can be connected later by replacing a single function (see [Connecting a real AI model](#connecting-a-real-ai-model)).

---

## Features

- **New Observation** — Upload a photo (JPG/PNG), select country, city, and environment type.
- **Detective Report** — Five cards: What I Observed, Possible Pattern, Priority, Confidence, and Investigate Next. Uses cautious language ("may indicate", "could suggest", "appears consistent with") and never presents a hypothesis as proven fact.
- **Human Verification** — Correct / Partially Correct / Needs Correction buttons with a notes field.
- **G-WIN Observations** — A filterable table of ~16 sample observations across Canada, Spain, and China.
- **Potential Emerging Hotspots** — A prototype visualization showing three sample locations, including one with an increasing low → medium → high trend.
- **One Detective. Different Contexts.** — A side-by-side country comparison built only from the sample dataset.
- **Responsive design** — Works from mobile to desktop.

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool / dev server)
- **Tailwind CSS** (styling)
- **lucide-react** (icons)

No backend, no database, no authentication, no payments — the app runs entirely in the browser.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

The app will be available at the URL Vite prints (typically `http://localhost:5173`).

### Other Scripts

```bash
npm run build       # Production build → dist/
npm run preview     # Preview the production build locally
npm run typecheck   # TypeScript type checking (no emit)
npm run lint        # ESLint
```

---

## Project Structure

```
src/
├── App.tsx                      # Main app shell — assembles all sections
├── main.tsx                     # React entry point
├── index.css                    # Tailwind + global styles
├── types.ts                     # Shared TypeScript types
├── data/
│   ├── options.ts               # Country & environment dropdown options
│   └── sampleData.ts            # Sample observations + hotspot data
├── lib/
│   └── analysis.ts              # Demo analysis engine (swap point for real AI)
└── components/
    ├── ObservationSection.tsx   # Upload form + Detective Report
    ├── ImageUpload.tsx          # Drag-and-drop photo upload
    ├── Badges.tsx               # Priority & Confidence badges
    ├── HumanVerification.tsx    # Verification buttons + notes
    ├── ObservationsTable.tsx    # Filterable sample data table
    ├── Hotspots.tsx             # Emerging hotspot bar charts
    └── GlobalContext.tsx        # Country comparison
```

---

## Connecting a Real AI Model

The demo analysis is isolated in **one file**: `src/lib/analysis.ts`.

The exported function `analyzeObservation(input: AnalysisInput): DetectiveReport` takes the country, city, and environment and returns a `DetectiveReport`. To connect a real AI vision API:

1. Add your API key to `.env` (see `.env.example`).
2. Modify `analyzeObservation()` in `src/lib/analysis.ts` to call your vision model (e.g., send the uploaded image + context to the API and map the response to the `DetectiveReport` interface).
3. Remove the `isDemo: true` flag (or keep it as `false`) once results are real.
4. Update or remove the demo disclaimers in the UI.

Everything else — the report cards, the UI, the data flow — stays the same because it all works through the `DetectiveReport` interface defined in `src/types.ts`.

---

## Important Notes

- All detective reports are **DEMONSTRATION results** and are not real observations.
- The sample G-WIN dataset is **prototype data** and is not real G-WIN data.
- The hotspot visualizations are **prototype demonstrations** using sample data.
- The country comparison uses **only the sample dataset** — no environmental statistics, regulations, or factual claims are represented.
- AI-assisted observations **require human verification**.

---

## License

This project is a prototype. Add a license of your choice before public distribution.
