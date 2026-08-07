import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { dances, getDanceById } from '../data/dances';
import { DANCE_GROUPS } from '../data/danceGroups';
import { songsByDance, spotifySearchUrl, youtubeSearchUrl, type SongPick } from '../data/songs';

function SongRow({ song }: { song: SongPick }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-xl border border-maroon-200 bg-white p-4">
      <div>
        <p className="font-medium text-maroon-900">{song.title}</p>
        <p className="text-sm text-maroon-700/70">{song.artist}</p>
      </div>
      <div className="flex gap-3 text-sm font-medium">
        <a
          href={spotifySearchUrl(song)}
          target="_blank"
          rel="noreferrer"
          className="text-maroon-700 underline hover:text-maroon-900"
        >
          Spotify ↗
        </a>
        <a
          href={youtubeSearchUrl(song)}
          target="_blank"
          rel="noreferrer"
          className="text-maroon-700 underline hover:text-maroon-900"
        >
          YouTube ↗
        </a>
      </div>
    </li>
  );
}

export default function SongFinder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDance = getDanceById(searchParams.get('dance') ?? '') ?? getDanceById('waltz')!;
  const [selectedId, setSelectedId] = useState(initialDance.id);

  const dance = getDanceById(selectedId) ?? dances[0];
  const songs = songsByDance[selectedId];

  const selectDance = (id: string) => {
    setSelectedId(id);
    setSearchParams({ dance: id }, { replace: true });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Practice</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Song Finder
      </h1>
      <div className="mt-3 max-w-xl space-y-3 text-maroon-700/85">
        <p>
          The hardest part of practicing at home is finding music that actually fits. These are
          songs the ballroom and social dance world commonly reaches for, by style — hand-picked,
          not pulled from a chart. "Danceable" always depends on the exact recording's tempo, so
          check a pick against{' '}
          <Link
            to={`/beat-trainer?dance=${selectedId}`}
            className="font-medium text-maroon-800 underline hover:text-maroon-900"
          >
            this dance's Beat Trainer
          </Link>{' '}
          before building a routine around it.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {DANCE_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-maroon-500">{group.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.ids.map((id) => {
                const d = getDanceById(id);
                if (!d) return null;
                const isSelected = d.id === selectedId;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => selectDance(d.id)}
                    aria-pressed={isSelected}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-maroon-600 bg-maroon-600 text-white'
                        : 'border-maroon-200 bg-white text-maroon-800 hover:border-maroon-500 hover:bg-maroon-50'
                    }`}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-maroon-200 bg-white p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-semibold text-maroon-900">{dance.name}</h2>
          <span className="text-sm text-maroon-700/70">
            {dance.timeSignature} time · {dance.tempo}
          </span>
        </div>

        {songs ? (
          <>
            <section className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-maroon-500">
                Popular picks
              </h3>
              <ul className="mt-3 space-y-3">
                {songs.popular.map((song) => (
                  <SongRow key={`${song.title}-${song.artist}`} song={song} />
                ))}
              </ul>
            </section>

            <section className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-maroon-500">
                Newer picks
              </h3>
              {songs.latest.length > 0 ? (
                <ul className="mt-3 space-y-3">
                  {songs.latest.map((song) => (
                    <SongRow key={`${song.title}-${song.artist}`} song={song} />
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-maroon-700/70">
                  {dance.name} stays close to its traditional music even in modern routines —
                  pop tracks are rarely cut in this dance's exact tempo. The picks above are
                  still the standard choice.
                </p>
              )}
            </section>
          </>
        ) : (
          <p className="mt-6 text-sm text-maroon-700/70">
            Song picks for {dance.name} are still on the list — check back soon, or browse{' '}
            <Link to="/resources" className="font-medium text-maroon-800 underline hover:text-maroon-900">
              Resources
            </Link>{' '}
            for official syllabus music guidance in the meantime.
          </p>
        )}
      </div>

      <p className="mt-6 text-sm text-maroon-700/70">
        Ready to see it danced?{' '}
        <Link to={`/dance/${dance.id}`} className="font-medium text-maroon-800 underline hover:text-maroon-900">
          Go to {dance.name}
        </Link>
      </p>
    </div>
  );
}
