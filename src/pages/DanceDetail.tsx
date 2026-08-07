import { Link, Navigate, useParams } from 'react-router-dom';
import { dances, getDanceById } from '../data/dances';
import VideoEmbed from '../components/VideoEmbed';

const traitList: { key: 'energy' | 'holdCloseness' | 'pace' | 'playfulness' | 'elegance'; label: string }[] = [
  { key: 'energy', label: 'Energy' },
  { key: 'holdCloseness', label: 'Hold closeness' },
  { key: 'pace', label: 'Pace' },
  { key: 'playfulness', label: 'Playfulness' },
  { key: 'elegance', label: 'Elegance' },
];

export default function DanceDetail() {
  const { danceId } = useParams();
  const dance = danceId ? getDanceById(danceId) : undefined;

  if (!dance) {
    return <Navigate to="/start" replace />;
  }

  // Every syllabus a dance belongs to gets its own explicit back link —
  // no guessing at where the visitor came from.
  const backLinks = [
    dance.americanCategory && { to: '/american', label: 'American Style' },
    dance.internationalCategory && { to: '/international', label: 'International Style' },
  ].filter((l): l is { to: string; label: string } => Boolean(l));
  if (backLinks.length === 0) backLinks.push({ to: '/start', label: 'Start Here' });

  const related = dances
    .filter(
      (d) =>
        d.id !== dance.id &&
        ((dance.americanCategory && d.americanCategory === dance.americanCategory) ||
          (dance.internationalCategory && d.internationalCategory === dance.internationalCategory)),
    )
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {backLinks.map((l) => (
          <Link key={l.to} to={l.to} className="text-sm font-semibold text-maroon-700 hover:text-maroon-900">
            ← {l.label}
          </Link>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {dance.americanCategory && (
          <span className="rounded-full bg-maroon-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-maroon-800">
            American {dance.americanCategory}
          </span>
        )}
        {dance.internationalCategory && (
          <span className="rounded-full bg-maroon-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-maroon-800">
            International {dance.internationalCategory}
          </span>
        )}
        {dance.social && (
          <span className="rounded-full bg-maroon-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-maroon-800">
            Social
          </span>
        )}
        <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-800">
          {dance.difficulty}
        </span>
      </div>

      <h1 className="mt-4 font-display text-4xl font-semibold text-maroon-900 sm:text-5xl">
        {dance.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-maroon-700/90">{dance.description}</p>

      <div className="mt-8">
        <VideoEmbed
          videoId={dance.videoId}
          title={dance.videoTitle}
          orientation={dance.videoOrientation}
          isOwn={dance.videoIsOwn}
        />
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border-l-4 border-l-maroon-500 bg-maroon-50 p-6">
          <h2 className="font-display text-lg font-semibold text-maroon-900">At a glance</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-maroon-700/70">Origin</dt>
              <dd className="text-right font-medium text-maroon-900">{dance.origin}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-maroon-700/70">Era</dt>
              <dd className="text-right font-medium text-maroon-900">{dance.era}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-maroon-700/70">Time signature</dt>
              <dd className="text-right font-medium text-maroon-900">{dance.timeSignature}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-maroon-700/70">Tempo</dt>
              <dd className="text-right font-medium text-maroon-900">{dance.tempo}</dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-col gap-1">
            <Link
              to={`/beat-trainer?dance=${dance.id}`}
              className="inline-block text-sm font-medium text-maroon-700 underline hover:text-maroon-900"
            >
              Practice this tempo →
            </Link>
            <Link
              to={`/songs?dance=${dance.id}`}
              className="inline-block text-sm font-medium text-maroon-700 underline hover:text-maroon-900"
            >
              Songs to try →
            </Link>
            {dance.bronzeFigures.length > 0 && (
              <Link
                to={`/drill?dance=${dance.id}`}
                className="inline-block text-sm font-medium text-maroon-700 underline hover:text-maroon-900"
              >
                Drill these figures →
              </Link>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-maroon-200 bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-maroon-900">Character</h2>
          <div className="mt-3 space-y-3">
            {traitList.map((t) => (
              <div key={t.key}>
                <div className="mb-1 flex justify-between text-xs text-maroon-700/70">
                  <span>{t.label}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-maroon-100">
                  <div
                    className="h-full rounded-full bg-gold-500"
                    style={{ width: `${(dance.traits[t.key] / 5) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-maroon-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-maroon-900">What makes it distinct</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {dance.characteristics.map((c) => (
            <li key={c} className="flex items-start gap-2 text-sm text-maroon-800">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-maroon-500" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {dance.bronzeFigures.length > 0 && (
        <div className="mt-8 rounded-2xl border-l-4 border-l-maroon-500 bg-maroon-50 p-6">
          <h2 className="font-display text-lg font-semibold text-maroon-900">Bronze-level figures</h2>
          <p className="mt-1 text-xs text-maroon-700/70">
            Names only. For full technique, see the official syllabus below.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {dance.bronzeFigures.map((f) => (
              <li key={f} className="rounded-full border border-maroon-200 bg-white px-3 py-1 text-sm text-maroon-800">
                {f}
              </li>
            ))}
          </ul>
          {dance.officialSyllabus.length > 0 && (
            <div className="mt-4 flex flex-col gap-1">
              {dance.officialSyllabus.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-maroon-700 underline hover:text-maroon-900"
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50 p-6">
        <h2 className="font-display text-lg font-semibold text-gold-900">Fun fact</h2>
        <p className="mt-2 text-sm text-gold-900/90">{dance.funFact}</p>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-xl font-semibold text-maroon-900">More like this</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/dance/${r.id}`}
                className="rounded-xl border border-maroon-200 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <span className="font-display font-semibold text-maroon-900">{r.name}</span>
                <p className="mt-1 text-xs text-maroon-700/70 line-clamp-2">{r.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
