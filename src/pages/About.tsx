import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">About</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        About this site
      </h1>

      <div className="mt-8 space-y-4 text-maroon-800">
        <p className="italic text-maroon-600">
          [Placeholder — full bio going here: the Arthur Murray start, studio-hopping across
          states, American Smooth showcases, competing Open Latin, and where things stand now
          that I'm on a break. Written properly soon; this page is a stub until then.]
        </p>
        <p>
          What won't change: this site is one dancer's honest map of the beginner path, not an
          official resource. For the real, authoritative syllabus material, see{' '}
          <Link to="/resources" className="font-medium text-maroon-800 underline hover:text-maroon-900">
            Resources
          </Link>
          .
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-maroon-200 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-maroon-900">Where things come from</h2>
        <p className="mt-2 text-sm text-maroon-700/85">
          Video tutorials, syllabus figures, and archival material are linked to their original
          sources, never rehosted.{' '}
          <Link to="/credits" className="font-medium text-maroon-800 underline hover:text-maroon-900">
            Full credits →
          </Link>
        </p>
      </div>
    </div>
  );
}
