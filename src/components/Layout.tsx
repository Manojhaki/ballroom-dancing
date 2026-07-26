import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — mobile menu toggle
 *
 * Two states, no timed sequence — everything below reacts to
 * `menuOpen` directly rather than a stage counter.
 *
 *  closed → open   hamburger bars rotate into an X (top/bottom bars),
 *                  middle bar fades out, panel expands height 0 → auto
 *  open → closed   the exact reverse, same springs
 * ───────────────────────────────────────────────────────── */

/* Hamburger ⇄ X icon bars */
const ICON = {
  spring: { type: 'spring' as const, stiffness: 400, damping: 34 },
  middleBarFade: { duration: 0.15 }, // the fade doesn't need spring physics
  barRotateDeg: 45, // top/bottom bars rotate this many degrees to form the X
  barOffsetY: 4, // px the top/bottom bars travel to meet in the middle
};

/* Mobile nav panel */
const PANEL = {
  spring: { type: 'spring' as const, stiffness: 400, damping: 34 },
};

function NavLinks({ onNavigate, className, linkClassName }: { onNavigate?: () => void; className?: string; linkClassName: (isActive: boolean) => string }) {
  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) => `${className ?? ''} ${linkClassName(isActive)}`}
        >
          {item.label}
        </NavLink>
      ))}
    </>
  );
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-maroon-50 text-maroon-950">
      <header className="sticky top-0 z-40 border-b border-maroon-200/60 bg-maroon-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <NavLink to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <img src="/images/ptbIcon.avif" alt="" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-display text-xl font-semibold tracking-tight text-maroon-800">
              Part Time Ballroom Dancing
            </span>
          </NavLink>

          <nav className="hidden flex-wrap items-center gap-1 lg:flex">
            <NavLinks
              linkClassName={(isActive) =>
                `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-maroon-700 text-gold-50' : 'text-maroon-700 hover:bg-maroon-100'
                }`
              }
            />
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full text-maroon-800 hover:bg-maroon-100 lg:hidden"
          >
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-current"
              animate={{ rotate: menuOpen ? ICON.barRotateDeg : 0, y: menuOpen ? ICON.barOffsetY : 0 }}
              transition={ICON.spring}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-current"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={ICON.middleBarFade}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-current"
              animate={{ rotate: menuOpen ? -ICON.barRotateDeg : 0, y: menuOpen ? -ICON.barOffsetY : 0 }}
              transition={ICON.spring}
            />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={PANEL.spring}
              className="overflow-hidden border-t border-maroon-200/60 lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3 sm:px-6">
                <NavLinks
                  onNavigate={() => setMenuOpen(false)}
                  className="w-full"
                  linkClassName={(isActive) =>
                    `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive ? 'bg-maroon-700 text-gold-50' : 'text-maroon-700 hover:bg-maroon-100'
                    }`
                  }
                />
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-maroon-200/60 bg-maroon-50">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-maroon-700/80 sm:px-6">
          <p>
            Part Time Ballroom Dancing — a personal, first-hand starting point for people curious
            about ballroom dancing. Not affiliated with any studio or federation.
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
