import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { getDanceById } from '../data/dances';
import { DANCE_GROUPS } from '../data/danceGroups';

const COMBO_SIZES = [3, 4, 5];

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function FigureDrill() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDance = getDanceById(searchParams.get('dance') ?? '') ?? getDanceById('waltz')!;
  const [selectedId, setSelectedId] = useState(initialDance.id);
  const [comboSize, setComboSize] = useState(4);
  const [combo, setCombo] = useState<string[]>(() =>
    shuffled(initialDance.bronzeFigures).slice(0, Math.min(4, initialDance.bronzeFigures.length)),
  );
  const [spin, setSpin] = useState(0);

  const dance = getDanceById(selectedId)!;
  const hasFigures = dance.bronzeFigures.length > 0;

  const shuffle = (id: string, size: number) => {
    const d = getDanceById(id);
    if (!d || d.bronzeFigures.length === 0) {
      setCombo([]);
      return;
    }
    setCombo(shuffled(d.bronzeFigures).slice(0, Math.min(size, d.bronzeFigures.length)));
    setSpin((s) => s + 1);
  };

  const selectDance = (id: string) => {
    setSelectedId(id);
    setSearchParams({ dance: id }, { replace: true });
    shuffle(id, comboSize);
  };

  const changeComboSize = (size: number) => {
    setComboSize(size);
    shuffle(selectedId, size);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Practice</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Figure Drill
      </h1>
      <p className="mt-3 max-w-xl text-maroon-700/85">
        Not sure what to run through today? Pick a dance and get a random handful of its Bronze
        figures to drill back to back. Shuffle for a fresh combo any time.
      </p>

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
          {hasFigures && (
            <span className="text-sm text-maroon-700/70">
              {dance.bronzeFigures.length} Bronze figures on record
            </span>
          )}
        </div>

        {hasFigures ? (
          <>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <span className="font-medium text-maroon-800">Combo size</span>
              <div className="flex gap-1.5">
                {COMBO_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => changeComboSize(size)}
                    aria-pressed={comboSize === size}
                    disabled={size > dance.bronzeFigures.length}
                    className={`h-8 w-8 rounded-full border text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      comboSize === size
                        ? 'border-maroon-600 bg-maroon-600 text-white'
                        : 'border-maroon-200 bg-white text-maroon-800 hover:border-maroon-500 hover:bg-maroon-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <ol className="mt-6 space-y-3">
              {combo.map((figure, i) => (
                <motion.li
                  key={`${spin}-${figure}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28, delay: i * 0.06 }}
                  className="flex items-center gap-4 rounded-xl border border-maroon-200 bg-maroon-50 px-5 py-4"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-maroon-600 font-display text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="font-medium text-maroon-900">{figure}</span>
                </motion.li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => shuffle(selectedId, comboSize)}
              className="mt-6 rounded-full bg-maroon-700 px-6 py-2.5 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
            >
              Shuffle
            </button>

            <p className="mt-4 text-xs text-maroon-700/60">
              Names only, from this dance's Bronze syllabus — for the full technique behind each
              figure, see the official syllabus on{' '}
              <Link to={`/dance/${dance.id}`} className="underline hover:text-maroon-900">
                {dance.name}'s page
              </Link>
              .
            </p>
          </>
        ) : (
          <p className="mt-6 text-sm text-maroon-700/70">
            {dance.name} doesn't have a Bronze figure list on the site yet — it's more of a
            free-form social dance without one fixed syllabus. Try a syllabus dance like Waltz or
            Cha Cha instead, or check{' '}
            <Link to="/resources" className="font-medium text-maroon-800 underline hover:text-maroon-900">
              Resources
            </Link>{' '}
            for {dance.name}-specific material.
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
