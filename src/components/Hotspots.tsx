import { SAMPLE_HOTSPOTS } from '@/data/sampleData';
import { TrendingUp, AlertTriangle } from 'lucide-react';

const LEVEL_HEIGHTS = { low: 'h-8', medium: 'h-16', high: 'h-24' };
const LEVEL_COLORS = { low: 'bg-gwin-300', medium: 'bg-gwin-500', high: 'bg-gwin-700' };

export function Hotspots() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gwin-900">Potential Emerging Hotspots</h2>
          <p className="text-sm text-neutral-500">Repeated observations can help identify locations that may deserve additional monitoring.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-800">
        <AlertTriangle className="h-4 w-4" />
        SAMPLE G-WIN DATA — Prototype demonstration using sample data only. Do not treat these hotspots as real.
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {SAMPLE_HOTSPOTS.map((spot) => (
          <div key={spot.location} className="card p-5">
            <div className="mb-1 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gwin-900">{spot.location}</h3>
            </div>
            <p className="mb-4 text-xs text-neutral-500">{spot.country} · {spot.environment}</p>

            <div className="flex items-end justify-between gap-3 px-2 pb-2">
              {spot.weeks.map((w) => (
                <div key={w.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-24 w-full items-end justify-center">
                    <div
                      className={`w-full max-w-[3rem] rounded-t-md transition-all ${LEVEL_COLORS[w.level]} ${LEVEL_HEIGHTS[w.level]}`}
                      title={`${w.value} items`}
                    />
                  </div>
                  <span className="text-[10px] text-neutral-500">{w.label}</span>
                </div>
              ))}
            </div>

            {spot.emerging ? (
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                <TrendingUp className="h-3.5 w-3.5" />
                Potential emerging hotspot
              </div>
            ) : (
              <div className="mt-3 rounded-lg bg-neutral-50 px-3 py-2 text-xs font-medium text-neutral-600">
                Stable — no clear upward trend
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
