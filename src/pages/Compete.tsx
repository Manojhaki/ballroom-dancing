import { Link } from 'react-router-dom';
import FaqGroup from '../components/FaqGroup';
import type { FaqItem } from '../data/roadmap';

const levels: FaqItem[] = [
  {
    question: 'How do skill levels work?',
    answer:
      "Syllabus levels run Pre-Bronze → Bronze → Silver → Gold, each unlocking more figures and more freedom of styling. Above Gold, competitors move into 'Open' (also called Championship), where syllabus restrictions drop entirely and choreography is unrestricted.",
  },
  {
    question: 'What is a "heat"?',
    answer:
      'A single round of competition: a group of couples dancing the same event together while judges rank them. Prelims narrow the field; finals decide placements. Most Bronze/Silver events run as heats of 4-8 couples.',
  },
  {
    question: 'Syllabus vs. Open — what\'s the difference?',
    answer:
      'Syllabus events (Bronze/Silver/Gold) restrict which figures you can use, keeping the competition about execution rather than choreography. Open/Championship events drop those restrictions — routines are fully choreographed and judged on artistry as much as technique.',
  },
];

const firstComp: FaqItem[] = [
  {
    question: 'What actually happens at your first competition?',
    answer:
      'You check in, warm up, and dance a series of short heats (often under 90 seconds each) in front of judges, usually multiple times across different dances and levels. Most newcomer events are Pre-Bronze or Bronze — low-pressure, and it is completely normal to place last and still have a great time.',
  },
  {
    question: 'What should I wear?',
    answer:
      "For a first Bronze/Silver event, simple and clean beats flashy — a nice dress or a shirt/slacks combination works fine. Save rhinestones and competition-cut dresses for once you know you'll keep competing. Many newcomer divisions explicitly discourage over-the-top costuming.",
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
        actually looks like — from your first heat to how levels and collegiate circuits work.
      </p>

      <section className="mt-10">
        <FaqGroup title="Your first competition" items={firstComp} />
      </section>

      <section className="mt-12">
        <FaqGroup title="How levels work" items={levels} />
      </section>

      <section className="mt-12 rounded-2xl border border-maroon-200 bg-white p-6">
        <h2 className="font-display text-xl font-semibold text-maroon-900">Collegiate ballroom</h2>
        <p className="mt-2 text-sm text-maroon-700/85">
          US colleges run an active competitive circuit through organizations like the{' '}
          <a
            href="https://collegiatedancesport.org/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-maroon-800 underline hover:text-maroon-900"
          >
            Collegiate DanceSport Association
          </a>
          . It's often the cheapest way into competition — many teams offer free or low-cost
          lessons, rotate students through partners, and travel to regional competitions as a
          club sport rather than a paid studio program.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-dashed border-maroon-300 bg-maroon-50 p-6">
        <h2 className="font-display text-xl font-semibold text-maroon-900">
          How I found a competitive partner
        </h2>
        <p className="mt-2 text-sm italic text-maroon-600">
          [Coming soon — this section will walk through how I found my Open Latin partner and
          what that search actually looked like. Stubbed for now rather than guessed at.]
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
