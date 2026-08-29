import { useState } from 'react';
import type { Country, EnvironmentType, DetectiveReport } from '@/types';
import { COUNTRIES, ENVIRONMENTS } from '@/data/options';
import { analyzeObservation, REAL_DISCLAIMER } from '@/lib/analysis';
import { ImageUpload } from '@/components/ImageUpload';
import { PriorityBadge, ConfidenceBadge } from '@/components/Badges';
import { Search, FileSearch, Eye, AlertTriangle, Target, Gauge, ClipboardList, Info, ScanLine, Loader2 } from 'lucide-react';

interface Props {
  onReportGenerated: (report: DetectiveReport, meta: { country: Country; city: string; environment: EnvironmentType }) => void;
}

export function ObservationSection({ onReportGenerated }: Props) {
  const [country, setCountry] = useState<Country>('Canada');
  const [city, setCity] = useState('');
  const [environment, setEnvironment] = useState<EnvironmentType>('Park');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [report, setReport] = useState<DetectiveReport | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleImage(file: File | null) {
    setImageFile(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    setReport(null);
    setError(null);
  }

  function clearImage() {
    setImageFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setReport(null);
    setError(null);
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Could not read image file'));
      reader.readAsDataURL(file);
    });
  }

  async function handleInvestigate() {
    if (!imageFile) return;
    setAnalyzing(true);
    setReport(null);
    setError(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzeObservation({
        country,
        city,
        environment,
        image: base64Image,
      });
      setReport(result);
      onReportGenerated(result, { country, city, environment });
      setTimeout(() => {
        document.getElementById('detective-report')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="card p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gwin-100 text-gwin-700">
            <Search className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gwin-900">New Observation</h2>
            <p className="text-sm text-neutral-500">Upload a photograph and describe the location to begin.</p>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-2 rounded-xl border border-gwin-200 bg-gwin-50 px-4 py-2.5 text-xs font-medium text-gwin-800">
          <ScanLine className="h-4 w-4 shrink-0" />
          REAL IMAGE ANALYSIS — The uploaded photograph is sent to an AI vision model for analysis.
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="country">Country</label>
            <select id="country" className="input-base" value={country} onChange={(e) => setCountry(e.target.value as Country)}>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="city">City / Community</label>
            <input id="city" type="text" className="input-base" placeholder="e.g. Vancouver" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="environment">Environment</label>
            <select id="environment" className="input-base" value={environment} onChange={(e) => setEnvironment(e.target.value as EnvironmentType)}>
              {ENVIRONMENTS.map((env) => <option key={env} value={env}>{env}</option>)}
            </select>
          </div>
          <div className="md:col-span-1" />
          <div className="md:col-span-2">
            <ImageUpload onImageSelected={handleImage} previewUrl={previewUrl} onClear={clearImage} />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button className="btn-primary" onClick={handleInvestigate} disabled={!imageFile || analyzing}>
            {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {analyzing ? 'Investigating…' : 'Investigate Observation'}
          </button>
          {!imageFile && <p className="text-xs text-neutral-500">Upload a photograph to enable investigation.</p>}
        </div>

        {analyzing && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-gwin-200 bg-gwin-50 px-4 py-3 text-sm text-gwin-700">
            <ScanLine className="h-4 w-4 animate-pulse" />
            The AI vision model is analyzing your photograph. This may take a few seconds…
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}
      </div>

      {report && (
        <div id="detective-report" className="scroll-mt-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gwin-100 text-gwin-700">
              <FileSearch className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gwin-900">Detective Report</h2>
              <p className="text-sm text-neutral-500">AI-assisted interpretation of the submitted observation.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gwin-200 bg-gwin-50 px-4 py-2.5 text-xs font-semibold text-gwin-800">
            <ScanLine className="h-4 w-4" />
            REAL IMAGE ANALYSIS — Generated by AI vision model
          </div>

          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{REAL_DISCLAIMER}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ReportCard icon={<Eye className="h-4 w-4" />} title="What I Observed">
              {report.observed.length > 0 ? (
                <ul className="space-y-1.5">
                  {report.observed.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gwin-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-gwin-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500">No waste items were identified in the photograph.</p>
              )}
            </ReportCard>

            <ReportCard icon={<AlertTriangle className="h-4 w-4" />} title="Possible Pattern">
              <p className="text-sm leading-relaxed text-gwin-800">{report.possiblePattern}</p>
            </ReportCard>

            <ReportCard icon={<Target className="h-4 w-4" />} title="Priority">
              <PriorityBadge level={report.priority} />
              <p className="mt-2 text-xs text-neutral-500">Relative urgency for follow-up observation.</p>
            </ReportCard>

            <ReportCard icon={<Gauge className="h-4 w-4" />} title="Confidence">
              <ConfidenceBadge level={report.confidence} />
              <p className="mt-2 text-xs text-neutral-500">
                Confidence refers to the AI-assisted interpretation and does not replace human verification.
              </p>
            </ReportCard>

            <ReportCard icon={<ClipboardList className="h-4 w-4" />} title="Investigate Next" className="md:col-span-2">
              <p className="text-sm leading-relaxed text-gwin-800">{report.investigateNext}</p>
            </ReportCard>
          </div>
        </div>
      )}
    </section>
  );
}

function ReportCard({
  icon,
  title,
  children,
  className = '',
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card p-5 ${className}`}>
      <div className="mb-3 flex items-center gap-2 text-gwin-700">
        {icon}
        <h3 className="text-xs font-semibold uppercase tracking-wide text-gwin-700">{title}</h3>
      </div>
      {children}
    </div>
  );
}
