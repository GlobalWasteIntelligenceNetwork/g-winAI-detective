import type { Priority, Confidence } from '@/types';

const PRIORITY_STYLES: Record<Priority, string> = {
  LOW: 'bg-gwin-50 text-gwin-700 border-gwin-200',
  MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
  HIGH: 'bg-red-50 text-red-700 border-red-200',
};

const CONFIDENCE_STYLES: Record<Confidence, string> = {
  LOW: 'bg-neutral-50 text-neutral-600 border-neutral-200',
  MEDIUM: 'bg-gwin-50 text-gwin-700 border-gwin-200',
  HIGH: 'bg-gwin-100 text-gwin-800 border-gwin-300',
};

export function PriorityBadge({ level }: { level: Priority }) {
  return (
    <span className={`chip border ${PRIORITY_STYLES[level]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

export function ConfidenceBadge({ level }: { level: Confidence }) {
  return (
    <span className={`chip border ${CONFIDENCE_STYLES[level]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}
