import { useState } from 'react';
import type { DetectiveReport, Country, EnvironmentType } from '@/types';
import { ObservationSection } from '@/components/ObservationSection';
import { HumanVerification } from '@/components/HumanVerification';
import { ObservationsTable } from '@/components/ObservationsTable';
import { Hotspots } from '@/components/Hotspots';
import { GlobalContext } from '@/components/GlobalContext';
import { ShieldCheck, Leaf } from 'lucide-react';

function App() {
  const [hasReport, setHasReport] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gwin-700 text-white">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gwin-900 sm:text-2xl">G-WIN AI Detective</h1>
              <p className="text-sm text-gwin-700">Turning observations into questions worth investigating.</p>
              <p className="mt-0.5 text-xs text-neutral-400">AI-assisted environmental observation for G-WIN.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6">
        {/* Section 1 & 2 */}
        <ObservationSection onReportGenerated={() => setHasReport(true)} />

        {/* Section 3 — Human Verification */}
        {hasReport && <HumanVerification />}

        {/* Section 4 — G-WIN Observations */}
        <ObservationsTable />

        {/* Section 5 — Hotspots */}
        <Hotspots />

        {/* Section 6 — Global Context */}
        <GlobalContext />
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="flex items-center gap-2 text-gwin-800">
            <ShieldCheck className="h-4 w-4" />
            <p className="text-sm font-medium">G-WIN AI Detective — Prototype</p>
          </div>
          <p className="mt-1 text-xs text-neutral-500">AI-assisted observations require human verification.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
