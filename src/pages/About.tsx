import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">About</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        About this site
      </h1>

      <div className="mt-8 space-y-4 text-maroon-800">
        <p>
          I started with no dance background at all, at an Arthur Murray chain studio — walked
          in cold, no partner, no idea what any of the terminology meant. That beginner class
          turned into a few years of dancing across a few different studios in a few different
          states: a run of American Smooth showcases, then eventually competing Open Latin — Cha
          Cha, Samba, Rumba, and Jive, unrestricted by syllabus, judged on full routines instead
          of a fixed figure list.
        </p>
        <p>
          Right now I'm on a break from dancing. That's a deliberate pause, not a quiet exit —
          dancers step away and come back, and this site isn't going anywhere in the meantime.
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

      <div className="mt-10 rounded-2xl border border-gold-200 bg-gold-50 p-6">
        <h2 className="font-display text-lg font-semibold text-gold-900">More dancing, on video</h2>
        <p className="mt-2 text-sm text-gold-900/90">
          I post clips on YouTube — you'll find a few of them scattered across the dance pages on
          this site, tagged "Danced by me." The rest are on the channel.
        </p>
        <a
          href="https://www.youtube.com/@PartTimeBallroomDancing"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block rounded-full bg-maroon-700 px-5 py-2 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
        >
          Part Time Ballroom Dancing on YouTube →
        </a>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">
          A few things I learned along the way
        </h2>
        <ul className="mt-5 space-y-4">
          <li className="rounded-xl border border-maroon-200 bg-white p-5">
            <p className="font-semibold text-maroon-900">Frame matters more than the steps.</p>
            <p className="mt-1 text-sm text-maroon-700/85">
              I spent too long memorizing foot patterns before I understood that a good frame —
              the connection through your arms and posture — is what actually lets you dance a
              figure you've never drilled. The steps come easier once that clicks.
            </p>
          </li>
          <li className="rounded-xl border border-maroon-200 bg-white p-5">
            <p className="font-semibold text-maroon-900">It's fine to studio-hop.</p>
            <p className="mt-1 text-sm text-maroon-700/85">
              I didn't stay at the first studio I walked into, or the second. Chain studios,
              independent studios, different cities — each one taught me something the last one
              didn't, and none of that time was wasted.
            </p>
          </li>
          <li className="rounded-xl border border-maroon-200 bg-white p-5">
            <p className="font-semibold text-maroon-900">Mistakes are part of the dance, not a break in it.</p>
            <p className="mt-1 text-sm text-maroon-700/85">
              Every dancer messes up constantly, including the good ones. The move is to smile,
              reset, and keep going — stopping to apologize disrupts your partner more than the
              mistake did.
            </p>
          </li>
          <li className="rounded-xl border border-maroon-200 bg-white p-5">
            <p className="font-semibold text-maroon-900">Understanding the scoring took the mystery out of competing.</p>
            <p className="mt-1 text-sm text-maroon-700/85">
              The skating system looks opaque from the outside — ordinal placements, sums, half
              marks. Once I understood it was just "lowest sum wins" with a tiebreak rule
              underneath, competing stopped feeling like a black box.
            </p>
          </li>
          <li className="rounded-xl border border-maroon-200 bg-white p-5">
            <p className="font-semibold text-maroon-900">Stepping away doesn't mean stepping out.</p>
            <p className="mt-1 text-sm text-maroon-700/85">
              Taking a break felt like quitting at first. It isn't. The floor is still there
              whenever I'm ready to go back.
            </p>
          </li>
        </ul>
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
