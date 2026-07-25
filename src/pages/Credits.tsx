import { dances } from '../data/dances';
import { freeManuals, historyLinks, officialSyllabi } from '../data/resources';

export default function Credits() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Attribution</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Credits
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        Original writing and figure-name lists on this site are shared under{' '}
        <a
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-maroon-800 underline hover:text-maroon-900"
        >
          CC BY-NC-SA 4.0
        </a>
        . Everything below remains the property of its original source — embedded or linked, never
        rehosted.
      </p>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-maroon-900">Tutorial videos</h2>
        <p className="mt-2 text-sm text-maroon-700/80">
          Embedded via standard YouTube iframe. All rights belong to the original creators.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {dances.map((d) => (
            <li key={d.id} className="flex justify-between gap-4 border-b border-maroon-100 pb-2">
              <span className="text-maroon-700/80">
                {d.name} —{' '}
                <a
                  href={`https://www.youtube.com/watch?v=${d.videoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-maroon-800 underline hover:text-maroon-900"
                >
                  {d.videoTitle}
                </a>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-maroon-900">Official syllabi & organizations</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {officialSyllabi.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-maroon-800 underline hover:text-maroon-900">
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-maroon-900">Free manuals</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {freeManuals.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-maroon-800 underline hover:text-maroon-900">
                {r.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-maroon-900">Historical archive</h2>
        <ul className="mt-4 space-y-2 text-sm">
          {historyLinks.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noreferrer" className="font-medium text-maroon-800 underline hover:text-maroon-900">
                {r.title}
              </a>{' '}
              — Library of Congress, public domain.
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-maroon-900">Type</h2>
        <p className="mt-2 text-sm text-maroon-700/80">
          Playfair Display and Inter, via{' '}
          <a
            href="https://fonts.google.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-maroon-800 underline hover:text-maroon-900"
          >
            Google Fonts
          </a>
          , licensed under the Open Font License.
        </p>
      </section>
    </div>
  );
}
