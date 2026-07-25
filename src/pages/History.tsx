import { historyLinks } from '../data/resources';

export default function History() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Where it comes from</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        History
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        Ballroom dancing has a written record going back over 500 years. The Library of Congress
        holds the largest public-domain digitized collection of social dance instruction manuals
        anywhere — genuinely worth a browse if you're curious where any of this actually came
        from.
      </p>

      <section className="mt-10 space-y-4">
        {historyLinks.map((r) => (
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
      </section>

      <p className="mt-8 text-sm text-maroon-700/70">
        All material linked above is hosted directly by the Library of Congress and is in the
        public domain. Nothing here is rehosted — follow the links to view or download originals.
      </p>
    </div>
  );
}
