import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, dances, type Category, type Difficulty } from '../data/dances';

const difficulties: Difficulty[] = ['Easy', 'Moderate', 'Challenging'];

const difficultyStyles: Record<Difficulty, string> = {
  Easy: 'bg-emerald-100 text-emerald-800',
  Moderate: 'bg-gold-100 text-gold-800',
  Challenging: 'bg-maroon-200 text-maroon-900',
};

export default function Encyclopedia() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [difficulty, setDifficulty] = useState<Difficulty | 'All'>('All');

  const filtered = useMemo(() => {
    return dances.filter((d) => {
      const matchesQuery =
        query.trim() === '' ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.moodTags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = category === 'All' || d.category === category;
      const matchesDifficulty = difficulty === 'All' || d.difficulty === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [query, category, difficulty]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Encyclopedia</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Dance Styles
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        Ten of the most common ballroom and social dances, grouped the way most studios teach
        them: Standard (smooth ballroom), Latin, and Social.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or mood (e.g. romantic, fast)…"
          className="w-full rounded-full border border-maroon-200 bg-white px-4 py-2.5 text-sm text-maroon-900 placeholder:text-maroon-400 focus:border-maroon-500 focus:outline-none sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | 'All')}
            className="rounded-full border border-maroon-200 bg-white px-4 py-2 text-sm text-maroon-800 focus:border-maroon-500 focus:outline-none"
          >
            <option value="All">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty | 'All')}
            className="rounded-full border border-maroon-200 bg-white px-4 py-2 text-sm text-maroon-800 focus:border-maroon-500 focus:outline-none"
          >
            <option value="All">All levels</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-maroon-700/70">
          No dances match those filters — try widening your search.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <Link
              key={d.id}
              to={`/encyclopedia/${d.id}`}
              className="flex flex-col rounded-2xl border border-maroon-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gold-600">
                  {d.category}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyStyles[d.difficulty]}`}>
                  {d.difficulty}
                </span>
              </div>
              <h2 className="mt-2 font-display text-xl font-semibold text-maroon-900">{d.name}</h2>
              <p className="mt-2 flex-1 text-sm text-maroon-700/80 line-clamp-3">{d.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {d.moodTags.map((tag) => (
                  <span key={tag} className="rounded-full bg-maroon-50 px-2.5 py-0.5 text-xs text-maroon-700">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
