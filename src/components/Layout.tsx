import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/start', label: 'Start Here' },
  { to: '/american', label: 'American Style' },
  { to: '/international', label: 'International Style' },
  { to: '/compete', label: 'Compete' },
  { to: '/resources', label: 'Resources' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About' },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-maroon-50 text-maroon-950">
      <header className="sticky top-0 z-40 border-b border-maroon-200/60 bg-maroon-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="font-display text-xl font-semibold tracking-tight text-maroon-800">
              Ballroom Basics
            </span>
          </NavLink>
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-medium transition-colors sm:px-4 ${
                    isActive
                      ? 'bg-maroon-700 text-gold-50'
                      : 'text-maroon-700 hover:bg-maroon-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-maroon-200/60 bg-maroon-50">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-maroon-700/80 sm:px-6">
          <p>
            Ballroom Basics — a personal, first-hand starting point for people curious about
            ballroom dancing. Not affiliated with any studio or federation.
          </p>
          <p className="mt-2">
            Original writing and figure-name lists on this site are shared under{' '}
            <a
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-maroon-900"
            >
              CC BY-NC-SA 4.0
            </a>
            . Linked syllabi, videos, and archival material remain the property of their
            respective organizations — see{' '}
            <NavLink to="/credits" className="underline hover:text-maroon-900">
              credits
            </NavLink>{' '}
            for the full list of sources.
          </p>
        </div>
      </footer>
    </div>
  );
}
