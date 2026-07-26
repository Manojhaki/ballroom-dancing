import { Link } from 'react-router-dom';
import FaqGroup from '../components/FaqGroup';
import type { FaqItem } from '../data/roadmap';
import {
  arenas,
  collegiateFaq,
  eventFormatNote,
  moveUpFaq,
  proficiencyLadder,
  scoringFaq,
  terminologyNote,
} from '../data/compete';

const firstComp: FaqItem[] = [
  {
    question: 'What actually happens at your first competition?',
    answer:
      'You check in, warm up, and dance a series of short heats (often under 90 seconds each) in front of judges, usually multiple times across different dances and levels. Most newcomer events are Newcomer or Bronze — low-pressure, and it is completely normal to place last and still have a great time.',
  },
  {
    question: 'What should I wear?',
    answer:
      "For a first Newcomer/Bronze event, simple and clean beats flashy — a nice dress or a shirt/slacks combination works fine. Save rhinestones and competition-cut dresses for once you know you'll keep competing. Many newcomer divisions explicitly discourage over-the-top costuming.",
  },
  {
    question: 'Do I need my own partner?',
    answer:
      'Not necessarily — many studios and collegiate teams run "partner rotation" or pair students with pro/am instructors for early competitions. Amateur couples (partnering another student) are common at collegiate and USA Dance events.',
  },
];

export default function Compete() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Going further</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Compete
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        Competing isn't required to enjoy ballroom, but if you're curious, here's what the path
        actually looks like — from your first heat to how levels, scoring, and collegiate
        circuits work.
      </p>

      <section className="mt-10">
        <FaqGroup title="Your first competition" items={firstComp} />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">
          Closed vs. open — the distinction that actually matters
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-maroon-700/80">
          Every level falls into one of two tracks. The mental model: <strong>closed = follow
          the approved menu, open = write your own.</strong>
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {proficiencyLadder.map((track) => (
            <div key={track.title} className="rounded-2xl border border-maroon-200 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-maroon-900">{track.title}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {track.levels.map((l) => (
                  <span key={l} className="rounded-full bg-maroon-100 px-2.5 py-0.5 text-xs font-medium text-maroon-800">
                    {l}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-maroon-700/85">{track.description}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border-l-4 border-l-gold-500 bg-gold-50 p-4 text-sm text-gold-900/90">
          {terminologyNote}
        </p>
        <p className="mt-4 text-sm text-maroon-700/80">{eventFormatNote}</p>
      </section>

      <section className="mt-12">
        <FaqGroup title="How scoring works (the skating system)" items={scoringFaq} />
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-maroon-900">
          Where competitions happen
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {arenas.map((a) => (
            <div key={a.title} className="rounded-2xl border border-maroon-200 bg-white p-5">
              <h3 className="font-display font-semibold text-maroon-900">{a.title}</h3>
              <p className="mt-2 text-sm text-maroon-700/80">{a.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <FaqGroup title="Collegiate ballroom specifics" items={collegiateFaq} />
        <p className="mt-3 text-sm text-maroon-700/80">
          Run through organizations like the{' '}
          <a
            href="https://collegiatedancesport.org/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-maroon-800 underline hover:text-maroon-900"
          >
            Collegiate DanceSport Association
          </a>
          . Often the cheapest way into competition — many teams offer free or low-cost lessons
          and travel to regional competitions as a club sport rather than a paid studio program.
        </p>
      </section>

      <section className="mt-12">
        <FaqGroup title="Moving up a level" items={[moveUpFaq]} />
      </section>

      <section className="mt-12 rounded-2xl border border-dashed border-maroon-300 bg-maroon-50 p-6">
        <h2 className="font-display text-xl font-semibold text-maroon-900">
          How I found a competitive partner
        </h2>
        <p className="mt-2 text-sm text-maroon-700/85">
          Finding a partner for Open-level competition is a bigger commitment than a studio
          pro-am pairing — you're both training, choreographing, and competing as a unit, not
          just showing up to the same lesson. I'll write up how that search actually went for me
          once I've got it down properly.
        </p>
      </section>

      <section className="mt-14 rounded-2xl border border-gold-200 bg-gold-50 p-8 text-center">
        <h2 className="font-display text-xl font-semibold text-gold-900">New to all this?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gold-900/85">
          Competition makes a lot more sense once the basics click. Start with the beginner path
          first.
        </p>
        <Link
          to="/start"
          className="mt-5 inline-block rounded-full bg-maroon-700 px-6 py-2.5 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
        >
          Start Here
        </Link>
      </section>
    </div>
  );
}
