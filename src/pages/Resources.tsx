import type { ResourceLink } from '../data/resources';
import { freeManuals, officialSyllabi } from '../data/resources';

function ResourceList({ items }: { items: ResourceLink[] }) {
  return (
    <div className="mt-5 space-y-4">
      {items.map((r) => (
        <a
          key={r.url}
          href={r.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-2xl border border-maroon-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="font-display font-semibold text-maroon-900">{r.title}</span>
            <span className="flex-shrink-0 text-maroon-400">↗</span>
          </div>
          <p className="mt-1 text-sm text-maroon-700/80">{r.description}</p>
        </a>
      ))}
    </div>
  );
}

export default function Resources() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Primary sources</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Resources
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        This site paraphrases and summarizes, but figure lists and technique ultimately belong to
        the organizations that publish them. These are the primary sources — linked directly,
        never rehosted or copied.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">Official syllabi</h2>
        <ResourceList items={officialSyllabi} />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">Free manuals</h2>
        <p className="mt-2 text-sm text-maroon-700/80">
          Written for collegiate teams and freely shared — a good next step once the basics
          click.
        </p>
        <ResourceList items={freeManuals} />
      </section>
    </div>
  );
}
