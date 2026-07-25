import { useState } from 'react';
import { Link } from 'react-router-dom';
import { etiquette, glossary, roadmapSteps, wearGuide, type FaqItem } from '../data/roadmap';

function FaqGroup({ title, items }: { title: string; items: FaqItem[] }) {
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
              {open && (
                <p className="px-5 pb-4 text-sm text-maroon-700/85">{item.answer}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Get started</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Beginner's Roadmap
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        Everything a total beginner needs before their first class: what to expect, what to
        wear, floor etiquette, and the vocabulary instructors assume you already know.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">Your first five steps</h2>
        <ol className="mt-5 space-y-4">
          {roadmapSteps.map((s) => (
            <li key={s.step} className="flex gap-4 rounded-2xl border border-maroon-200 bg-white p-5">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-maroon-700 font-display font-semibold text-gold-50">
                {s.step}
              </span>
              <div>
                <h3 className="font-semibold text-maroon-900">{s.title}</h3>
                <p className="mt-1 text-sm text-maroon-700/85">{s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <FaqGroup title="What to wear" items={wearGuide} />
      </section>

      <section className="mt-12">
        <FaqGroup title="Etiquette on the floor" items={etiquette} />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">Glossary of terms</h2>
        <p className="mt-2 text-sm text-maroon-700/80">
          The words instructors use without explaining, decoded.
        </p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          {glossary.map((g) => (
            <div key={g.term} className="rounded-xl border border-maroon-200 bg-white p-4">
              <dt className="font-display font-semibold text-maroon-900">{g.term}</dt>
              <dd className="mt-1 text-sm text-maroon-700/85">{g.definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 rounded-2xl border border-gold-200 bg-gold-50 p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-gold-900">
          Not sure which dance to start with?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gold-900/85">
          Take the two-minute Dance Finder quiz and get matched to styles that fit your taste in
          music and energy.
        </p>
        <Link
          to="/finder"
          className="mt-5 inline-block rounded-full bg-maroon-700 px-6 py-2.5 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
        >
          Find your dance
        </Link>
      </section>
    </div>
  );
}
