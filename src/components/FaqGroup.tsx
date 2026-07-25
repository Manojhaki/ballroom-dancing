import { useState } from 'react';
import type { FaqItem } from '../data/roadmap';

export default function FaqGroup({ title, items }: { title: string; items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-maroon-900">{title}</h2>
      <div className="mt-4 divide-y divide-maroon-200 rounded-2xl border border-maroon-200 bg-white">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={open}
              >
                <span className="font-medium text-maroon-900">{item.question}</span>
                <span className="flex-shrink-0 text-lg text-maroon-500">{open ? '−' : '+'}</span>
              </button>
              {open && <p className="px-5 pb-4 text-sm text-maroon-700/85">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
