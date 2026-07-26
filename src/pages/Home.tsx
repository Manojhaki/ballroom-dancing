import { Link } from 'react-router-dom';
import { dances } from '../data/dances';
import { RevealGrid, RevealItem } from '../components/RevealGrid';
import VideoEmbed from '../components/VideoEmbed';

const entryPaths = [
  {
    to: '/start',
    title: "I'm a total beginner",
    description:
      'What ballroom even is, American vs. International style, what to wear, floor etiquette, and the words instructors assume you already know.',
    cta: 'Start here',
  },
  {
    to: '/compete',
    title: "I want to compete",
    description:
      'First competition, how levels work, collegiate circuits, and what to expect walking into your first Bronze heat.',
    cta: 'See the competitor path',
  },
  {
    to: '/resources',
    title: 'I want the official stuff',
    description:
      'Direct links to USA Dance, NDCA, and Dance Vision syllabi, plus free manuals: the primary sources, not a paraphrase.',
    cta: 'Browse resources',
  },
];

export default function Home() {
  const featured = dances.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-maroon-200/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold-600">
              A friend once asked me
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-maroon-900 sm:text-5xl md:text-6xl">
              "I wonder what it's like to be inside music."
            </h1>
            <div className="mt-6 max-w-xl space-y-4 text-lg text-maroon-700/90">
              <p>
                I didn't have a good answer at the time. Ballroom dancing turned out to be the
                closest I've come to one.
              </p>
              <p>
                I walked into a beginner class at a chain studio with zero experience, expecting
                to feel out of place. A few studios and a few years later (some American Smooth
                showcases, a lot of group classes), I was competing Open Latin: Cha Cha, Samba,
                Rumba, Jive, four minutes at a time.
              </p>
              <p>
                I'm on a break from dancing right now, and that's fine. Dancers step away and
                come back. This site isn't going anywhere in the meantime.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/start"
                className="rounded-full bg-maroon-700 px-6 py-3 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
              >
                Start here
              </Link>
              <Link
                to="/finder"
                className="rounded-full border border-maroon-300 bg-white px-6 py-3 text-sm font-semibold text-maroon-800 transition-colors hover:bg-maroon-100"
              >
                Find your dance (2 min quiz)
              </Link>
            </div>
          </div>

          <VideoEmbed
            videoId="EdTWw0In1HM"
            title="Welcome to Part Time Ballroom Dancing"
            orientation="horizontal"
            isOwn
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <RevealGrid className="grid gap-6 sm:grid-cols-3">
          {entryPaths.map((f) => (
            <RevealItem key={f.to}>
              <Link
                to={f.to}
                className="group flex h-full flex-col rounded-2xl border border-maroon-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <h2 className="font-display text-xl font-semibold text-maroon-900">{f.title}</h2>
                <p className="mt-2 flex-1 text-sm text-maroon-700/80">{f.description}</p>
                <span className="mt-4 text-sm font-semibold text-gold-600 group-hover:text-gold-700">
                  {f.cta} →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGrid>
      </section>

      <section className="border-t border-maroon-200/60 bg-maroon-100/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-maroon-900 sm:text-3xl">
              A few dances to get you curious
            </h2>
            <Link to="/start" className="hidden text-sm font-semibold text-maroon-700 hover:text-maroon-900 sm:inline">
              See the full picture →
            </Link>
          </div>
          <RevealGrid className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((d) => (
              <RevealItem key={d.id}>
                <Link
                  to={`/dance/${d.id}`}
                  className="flex h-full flex-col rounded-xl border border-maroon-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                    {d.americanCategory ?? d.internationalCategory ?? 'Social'}
                  </span>
                  <span className="mt-1 font-display text-lg font-semibold text-maroon-900">
                    {d.name}
                  </span>
                  <span className="mt-2 text-sm text-maroon-700/80 line-clamp-3">
                    {d.description}
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGrid>
        </div>
      </section>
    </div>
  );
}
