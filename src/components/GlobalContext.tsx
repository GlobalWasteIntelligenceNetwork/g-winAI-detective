import { useMemo, useState } from 'react';
import type { Country } from '@/types';
import { SAMPLE_OBSERVATIONS } from '@/data/sampleData';
import { COUNTRIES } from '@/data/options';
import { Globe } from 'lucide-react';

export function GlobalContext() {
  const [countryA, setCountryA] = useState<Country>('Canada');
  const [countryB, setCountryB] = useState<Country>('Spain');

  const stats = useMemo(() => {
    function calc(country: Country) {
      const rows = SAMPLE_OBSERVATIONS.filter((o) => o.country === country);
      const byEnv = new Map<string, number>();
      rows.forEach((r) => byEnv.set(r.environment, (byEnv.get(r.environment) ?? 0) + 1));
      const verified = rows.filter((r) => r.verification === 'Verified').length;
      return {
        total: rows.length,
        verified,
        topEnvironment: byEnv.size > 0
          ? Array.from(byEnv.entries()).sort((a, b) => b[1] - a[1])[0][0]
          : '—',
        cities: new Set(rows.map((r) => r.city)).size,
      };
    }
    return { a: calc(countryA), b: calc(countryB) };
  }, [countryA, countryB]);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gwin-100 text-gwin-700">
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gwin-900">One Detective. Different Contexts.</h2>
          <p className="text-sm text-neutral-500">
            The same Detective can be used in different countries. Country, location, environment and community observations provide context for the investigation.
          </p>
        </div>
      </div>

      <div className="card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="cA">Country A</label>
            <select id="cA" className="input-base" value={countryA} onChange={(e) => setCountryA(e.target.value as Country)}>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="field-label" htmlFor="cB">Country B</label>
            <select id="cB" className="input-base" value={countryB} onChange={(e) => setCountryB(e.target.value as Country)}>
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[{ name: countryA, s: stats.a }, { name: countryB, s: stats.b }].map(({ name, s }) => (
            <div key={name} className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-gwin-900">{name}</h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Sample observations</dt>
                  <dd className="font-medium text-gwin-800">{s.total}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Distinct cities</dt>
                  <dd className="font-medium text-gwin-800">{s.cities}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Most observed environment</dt>
                  <dd className="font-medium text-gwin-800">{s.topEnvironment}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-500">Verified observations</dt>
                  <dd className="font-medium text-gwin-800">{s.verified}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-neutral-400">
          Comparison is based only on the sample prototype dataset. No environmental statistics, regulations, or factual claims are represented.
        </p>
      </div>
    </section>
  );
}
