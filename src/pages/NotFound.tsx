import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-maroon-800">Page not found</h1>
      <p className="text-maroon-700/80">
        Looks like this step isn't in the syllabus. Let's get you back on the floor.
      </p>
      <Link
        to="/"
        className="rounded-full bg-maroon-700 px-5 py-2.5 text-sm font-medium text-gold-50 transition-colors hover:bg-maroon-800"
      >
        Back to home
      </Link>
    </div>
  );
}
