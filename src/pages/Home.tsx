import { Link } from 'react-router-dom';
import { dances } from '../data/dances';

const featureLinks = [
  {
    to: '/encyclopedia',
    title: 'Explore Dance Styles',
    description:
      'Browse Waltz, Tango, Cha Cha, Salsa and more — origins, music, difficulty, and what makes each one distinct.',
    cta: 'See the styles',
  },
  {
    to: '/roadmap',
    title: "Beginner's Roadmap",
    description:
      'A step-by-step path for total beginners: what to wear, etiquette, key terms, and how to find your first class.',
    cta: 'Start the roadmap',
  },
  {
    to: '/finder',
    title: 'Find Your Dance',
    description:
      'Answer a few quick questions about your taste and energy, and get matched to the dance styles you\'ll likely enjoy most.',
    cta: 'Take the quiz',
  },
];

export default function Home() {
  const featured = dances.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-maroon-200/60">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
            A friendly starting point
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-maroon-900 sm:text-5xl md:text-6xl">
            Find your way into the world of ballroom dancing.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-maroon-700/90">
            Waltz, Tango, Salsa, Swing — there are dozens of styles and it's easy to feel lost
            before you've taken a single step. Ballroom Basics breaks it down for total
            beginners: what each dance feels like, how to get started, and which one might suit
            you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/finder"
              className="rounded-full bg-maroon-700 px-6 py-3 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
            >
              Find your dance
            </Link>
            <Link
              to="/encyclopedia"
              className="rounded-full border border-maroon-300 bg-white px-6 py-3 text-sm font-semibold text-maroon-800 transition-colors hover:bg-maroon-100"
            >
              Browse dance styles
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {featureLinks.map((f) => (
            <Link
              key={f.to}
              to={f.to}
              className="group flex flex-col rounded-2xl border border-maroon-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="font-display text-xl font-semibold text-maroon-900">{f.title}</h2>
              <p className="mt-2 flex-1 text-sm text-maroon-700/80">{f.description}</p>
              <span className="mt-4 text-sm font-semibold text-gold-600 group-hover:text-gold-700">
                {f.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-maroon-200/60 bg-maroon-100/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-maroon-900 sm:text-3xl">
              A few dances to get you curious
            </h2>
            <Link to="/encyclopedia" className="hidden text-sm font-semibold text-maroon-700 hover:text-maroon-900 sm:inline">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((d) => (
              <Link
                key={d.id}
                to={`/encyclopedia/${d.id}`}
                className="flex flex-col rounded-xl border border-maroon-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {d.category}
                </span>
                <span className="mt-1 font-display text-lg font-semibold text-maroon-900">
                  {d.name}
                </span>
                <span className="mt-2 text-sm text-maroon-700/80 line-clamp-3">
                  {d.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
