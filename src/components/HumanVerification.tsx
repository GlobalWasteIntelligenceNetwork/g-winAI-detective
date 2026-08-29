import { useState } from 'react';
import { Check, Minus, X, UserCheck } from 'lucide-react';

type Verdict = 'correct' | 'partial' | 'correction' | null;

export function HumanVerification() {
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [notes, setNotes] = useState('');

  const buttons: { key: Exclude<Verdict, null>; label: string; icon: React.ReactNode; active: string }[] = [
    { key: 'correct', label: 'Correct', icon: <Check className="h-4 w-4" />, active: 'bg-gwin-700 text-white border-gwin-700' },
    { key: 'partial', label: 'Partially Correct', icon: <Minus className="h-4 w-4" />, active: 'bg-amber-500 text-white border-amber-500' },
    { key: 'correction', label: 'Needs Correction', icon: <X className="h-4 w-4" />, active: 'bg-red-600 text-white border-red-600' },
  ];

  return (
    <section className="card p-6 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gwin-100 text-gwin-700">
          <UserCheck className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gwin-900">Human Verification</h2>
          <p className="text-sm text-neutral-500">AI-assisted observation. Human verification is required.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {buttons.map((b) => (
          <button
            key={b.key}
            onClick={() => setVerdict(b.key)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              verdict === b.key ? b.active : 'border-neutral-300 bg-white text-gwin-800 hover:bg-neutral-50'
            }`}
          >
            {b.icon}
            {b.label}
          </button>
        ))}
      </div>

      {verdict && (
        <p className="mt-3 text-xs font-medium text-gwin-700">
          Thank you — your verification has been recorded for this prototype session.
        </p>
      )}

      <div className="mt-6">
        <label className="field-label" htmlFor="notes">Human notes</label>
        <textarea
          id="notes"
          rows={3}
          className="input-base resize-none"
          placeholder="Add observations, corrections, or context for a human investigator…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
    </section>
  );
}
