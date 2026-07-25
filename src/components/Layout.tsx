import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/encyclopedia', label: 'Dance Styles' },
  { to: '/roadmap', label: "Beginner's Roadmap" },
  { to: '/finder', label: 'Find Your Dance' },
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
            Ballroom Basics — a friendly starting point for people curious about ballroom
            dancing. Not affiliated with any studio or federation.
          </p>
        </div>
      </footer>
    </div>
  );
}
