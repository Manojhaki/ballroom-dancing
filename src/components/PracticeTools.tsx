import { Link } from 'react-router-dom';
import { RevealGrid, RevealItem } from './RevealGrid';

const TOOLS = [
  {
    to: '/finder',
    title: 'Dance Finder',
    description: 'A two-minute quiz matched to your taste in music and energy.',
    cta: 'Find your dance',
    filled: true,
  },
  {
    to: '/beat-trainer',
    title: 'Beat Trainer',
    description: "A metronome for each dance's own tempo. Slow it down and count along.",
    cta: 'Try the Beat Trainer',
    filled: false,
  },
  {
    to: '/songs',
    title: 'Song Finder',
    description: 'Popular and newer songs to practice each style to, by dance.',
    cta: 'Find songs',
    filled: false,
  },
];

export default function PracticeTools({ heading = true }: { heading?: boolean }) {
  return (
    <section>
      {heading && (
        <div className="mb-8">
          <h2 className="font-display text-2xl font-semibold text-maroon-900 sm:text-3xl">
            Practice tools
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-maroon-700/80">
            Three small tools for the space between "I read about it" and "I can do it."
          </p>
        </div>
      )}
      <RevealGrid className="grid gap-5 sm:grid-cols-3">
        {TOOLS.map((tool) => (
          <RevealItem key={tool.to}>
            <div className="flex h-full flex-col rounded-2xl border border-gold-200 bg-gold-50 p-6 text-center">
              <h3 className="font-display text-lg font-semibold text-gold-900">{tool.title}</h3>
              <p className="mt-2 flex-1 text-sm text-gold-900/85">{tool.description}</p>
              <Link
                to={tool.to}
                className={`mt-5 inline-block rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  tool.filled
                    ? 'bg-maroon-700 text-gold-50 hover:bg-maroon-800'
                    : 'border border-maroon-300 bg-white text-maroon-800 hover:bg-maroon-100'
                }`}
              >
                {tool.cta}
              </Link>
            </div>
          </RevealItem>
        ))}
      </RevealGrid>
    </section>
  );
}
