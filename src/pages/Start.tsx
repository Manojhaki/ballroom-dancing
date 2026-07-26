import { Link } from 'react-router-dom';
import FaqGroup from '../components/FaqGroup';
import { RevealGrid, RevealItem } from '../components/RevealGrid';
import { dances } from '../data/dances';
import { etiquette, glossary, roadmapSteps, studioTypes, styleSystems, wearGuide } from '../data/roadmap';

// Social-only dances: not part of either competitive syllabus, so /american
// and /international never list them — this is their only home on the site.
const socialOnlyDances = dances.filter((d) => d.social && !d.americanCategory && !d.internationalCategory);

export default function Start() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Get started</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Start Here
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        Everything a total beginner needs before their first class: what ballroom actually is,
        what to wear, floor etiquette, and the vocabulary instructors assume you already know.
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
        <FaqGroup title="American Style vs. International Style" items={styleSystems} />
        <p className="mt-3 text-sm text-maroon-700/80">
          Full breakdowns of each:{' '}
          <Link to="/american" className="font-medium text-maroon-800 underline hover:text-maroon-900">
            American Style
          </Link>{' '}
          ·{' '}
          <Link to="/international" className="font-medium text-maroon-800 underline hover:text-maroon-900">
            International Style
          </Link>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">Social dances</h2>
        <p className="mt-2 max-w-2xl text-sm text-maroon-700/80">
          Outside the American/International competitive syllabi entirely — the dances you'll
          actually run into at a night out, a social, or a club.
        </p>
        <RevealGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {socialOnlyDances.map((d) => (
            <RevealItem key={d.id}>
              <Link
                to={`/dance/${d.id}`}
                className="flex h-full flex-col rounded-2xl border border-maroon-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-display text-lg font-semibold text-maroon-900">{d.name}</span>
                <span className="mt-1 text-xs font-medium text-gold-600">{d.difficulty}</span>
                <p className="mt-2 text-sm text-maroon-700/80 line-clamp-3">{d.description}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGrid>
      </section>

      <section className="mt-12">
        <FaqGroup title="Chain vs. independent studios" items={studioTypes} />
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
