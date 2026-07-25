import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { dances, type Dance } from '../data/dances';

type TraitKey = 'pace' | 'holdCloseness' | 'energy' | 'playfulness' | 'elegance';

interface Question {
  trait: TraitKey;
  prompt: string;
  options: { label: string; value: number }[];
}

const questions: Question[] = [
  {
    trait: 'pace',
    prompt: 'What pace of music do you gravitate toward?',
    options: [
      { label: 'Slow, soulful ballads', value: 1 },
      { label: 'A steady mid-tempo groove', value: 3 },
      { label: 'Fast, driving beats', value: 5 },
    ],
  },
  {
    trait: 'holdCloseness',
    prompt: 'How close do you want to be with your partner while dancing?',
    options: [
      { label: 'Give me room to move', value: 1 },
      { label: 'A relaxed, easy connection', value: 3 },
      { label: 'Close and connected the whole time', value: 5 },
    ],
  },
  {
    trait: 'energy',
    prompt: "What's the energy level you're after?",
    options: [
      { label: 'Calm and controlled', value: 1 },
      { label: 'Engaged but comfortable', value: 3 },
      { label: 'Full effort, working up a sweat', value: 5 },
    ],
  },
  {
    trait: 'playfulness',
    prompt: 'Which mood sounds most like you?',
    options: [
      { label: 'Composed and refined', value: 1 },
      { label: 'A little of both', value: 3 },
      { label: 'Fun, flirty, and playful', value: 5 },
    ],
  },
  {
    trait: 'elegance',
    prompt: 'Last one — what look are you drawn to?',
    options: [
      { label: 'Casual and easygoing', value: 1 },
      { label: 'Somewhere in the middle', value: 3 },
      { label: 'Polished and elegant', value: 5 },
    ],
  },
];

const MAX_DISTANCE = Math.sqrt(questions.length * 4 ** 2);

function matchScore(answers: Record<TraitKey, number>, dance: Dance) {
  const squaredDiffs = (Object.keys(answers) as TraitKey[]).map((trait) => {
    const diff = answers[trait] - dance.traits[trait];
    return diff * diff;
  });
  const distance = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0));
  return Math.round(100 - (distance / MAX_DISTANCE) * 100);
}

export default function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<TraitKey, number>>>({});

  const isComplete = step >= questions.length;

  const results = useMemo(() => {
    if (!isComplete) return [];
    const full = answers as Record<TraitKey, number>;
    return [...dances]
      .map((d) => ({ dance: d, score: matchScore(full, d) }))
      .sort((a, b) => b.score - a.score);
  }, [answers, isComplete]);

  const handleAnswer = (trait: TraitKey, value: number) => {
    setAnswers((prev) => ({ ...prev, [trait]: value }));
    setStep((s) => s + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Find your dance</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Dance Finder
      </h1>
      <p className="mt-3 text-maroon-700/85">
        Five quick questions, no dance experience required. We'll match your answers to the
        styles that best fit your taste.
      </p>

      {!isComplete ? (
        <div className="mt-10">
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-maroon-100">
            <div
              className="h-full rounded-full bg-maroon-600 transition-all"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm font-medium text-maroon-500">
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-maroon-900">
            {questions[step].prompt}
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            {questions[step].options.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleAnswer(questions[step].trait, opt.value)}
                className="rounded-xl border border-maroon-200 bg-white px-5 py-4 text-left font-medium text-maroon-900 transition-colors hover:border-maroon-500 hover:bg-maroon-50"
              >
                {opt.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-6 text-sm font-medium text-maroon-600 hover:text-maroon-800"
            >
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-maroon-900">Your top matches</h2>
          <div className="mt-6 space-y-4">
            {results.slice(0, 3).map(({ dance, score }, i) => (
              <Link
                key={dance.id}
                to={`/encyclopedia/${dance.id}`}
                className="flex items-center gap-4 rounded-2xl border border-maroon-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gold-100 font-display text-lg font-semibold text-gold-800">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-semibold text-maroon-900">
                      {dance.name}
                    </span>
                    <span className="text-sm font-semibold text-maroon-600">{score}% match</span>
                  </div>
                  <p className="mt-1 text-sm text-maroon-700/80 line-clamp-2">{dance.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <button
            type="button"
            onClick={restart}
            className="mt-8 rounded-full border border-maroon-300 bg-white px-6 py-2.5 text-sm font-semibold text-maroon-800 transition-colors hover:bg-maroon-100"
          >
            Retake the quiz
          </button>
        </div>
      )}
    </div>
  );
}
