import { useMemo, useState } from 'react';
import type { Country, EnvironmentType, VerificationStatus } from '@/types';
import { SAMPLE_OBSERVATIONS } from '@/data/sampleData';
import { COUNTRIES, ENVIRONMENTS } from '@/data/options';
import { Database, Filter } from 'lucide-react';

const VERIFICATION_STYLES: Record<VerificationStatus, string> = {
  Verified: 'bg-gwin-50 text-gwin-700 border-gwin-200',
  Partially: 'bg-amber-50 text-amber-700 border-amber-200',
  'Needs correction': 'bg-red-50 text-red-700 border-red-200',
  Unverified: 'bg-neutral-50 text-neutral-600 border-neutral-200',
};

export function ObservationsTable() {
  const [countryFilter, setCountryFilter] = useState<Country | 'All'>('All');
  const [envFilter, setEnvFilter] = useState<EnvironmentType | 'All'>('All');
  const [wasteFilter, setWasteFilter] = useState<string>('All');

  const wasteTypes = useMemo(
    () => Array.from(new Set(SAMPLE_OBSERVATIONS.map((o) => o.wasteType))).sort(),
    []
  );

  const filtered = useMemo(
    () =>
      SAMPLE_OBSERVATIONS.filter(
        (o) =>
          (countryFilter === 'All' || o.country === countryFilter) &&
          (envFilter === 'All' || o.environment === envFilter) &&
          (wasteFilter === 'All' || o.wasteType === wasteFilter)
      ),
    [countryFilter, envFilter, wasteFilter]
  );

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gwin-100 text-gwin-700">
          <Database className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gwin-900">G-WIN Observations</h2>
          <p className="text-sm text-neutral-500">Sample dataset for prototype demonstration.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-semibold text-amber-800">
        <Database className="h-4 w-4" />
        SAMPLE G-WIN DATA — PROTOTYPE ONLY. This is not real G-WIN data.
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gwin-800">
          <Filter className="h-4 w-4" /> Filters
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="field-label" htmlFor="f-country">Country</label>
            <select id="f-country" className="input-base" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value as Country | 'All')}>
              <option value="All">All countries</option>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="f-env">Environment</label>
            <select id="f-env" className="input-base" value={envFilter} onChange={(e) => setEnvFilter(e.target.value as EnvironmentType | 'All')}>
              <option value="All">All environments</option>
              {ENVIRONMENTS.map((env) => <option key={env} value={env}>{env}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="f-waste">Waste type</label>
            <select id="f-waste" className="input-base" value={wasteFilter} onChange={(e) => setWasteFilter(e.target.value)}>
              <option value="All">All waste types</option>
              {wasteTypes.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">City</th>
                <th className="px-4 py-3 font-medium">Environment</th>
                <th className="px-4 py-3 font-medium">Waste type</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-neutral-50/60">
                  <td className="px-4 py-3 text-gwin-800">{o.country}</td>
                  <td className="px-4 py-3 text-gwin-800">{o.city}</td>
                  <td className="px-4 py-3 text-gwin-800">{o.environment}</td>
                  <td className="px-4 py-3 text-gwin-800">{o.wasteType}</td>
                  <td className="px-4 py-3 text-neutral-600">{o.quantity}</td>
                  <td className="px-4 py-3 text-neutral-600">{o.date}</td>
                  <td className="px-4 py-3">
                    <span className={`chip border ${VERIFICATION_STYLES[o.verification]}`}>{o.verification}</span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-neutral-400">
                    No observations match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-neutral-400">{filtered.length} of {SAMPLE_OBSERVATIONS.length} sample observations shown.</p>
    </section>
  );
}
