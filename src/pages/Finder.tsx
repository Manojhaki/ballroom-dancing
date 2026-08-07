/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Dance Finder quiz
 *
 * Per question:
 *    0ms   question card slides in from the direction of travel, fades in
 *  ~60ms   each option button staggers in (60ms apart)
 *  click   selected option highlights and scales up briefly
 *  280ms   after click, advance to next question (card exits opposite way)
 *
 * Results reveal:
 *    0ms   result cards stagger in (120ms apart), sliding up
 *  150ms + rank*150ms   each match percentage counts up from 0
 * ───────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, animate, useMotionValueEvent } from 'motion/react';
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
    prompt: "Last one: what look are you drawn to?",
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

const TRAIT_LABELS: Record<TraitKey, string> = {
  pace: 'pace',
  holdCloseness: 'closeness',
  energy: 'energy',
  playfulness: 'playfulness',
  elegance: 'elegance',
};

/** The traits where your answer landed closest to this dance, for a "why this matched" hint */
function closestTraits(answers: Record<TraitKey, number>, dance: Dance, count = 2): TraitKey[] {
  return (Object.keys(answers) as TraitKey[])
    .map((trait) => ({ trait, diff: Math.abs(answers[trait] - dance.traits[trait]) }))
    .sort((a, b) => a.diff - b.diff)
    .slice(0, count)
    .map(({ trait }) => trait);
}

/* Timing for the click → advance beat and question-card travel */
const TIMING = {
  selectionHold: 280, // ms the clicked option stays highlighted before advancing
};

/* Question card enter/exit */
const CARD = {
  offsetX: 28, // px the card travels in from / exits to
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
};

/* Answer option buttons */
const OPTIONS = {
  stagger: 0.06, // seconds between each option's entrance
  offsetY: 10, // px each option slides up from
  spring: { type: 'spring' as const, stiffness: 420, damping: 26 }, // snappy pop-in
  selectedScale: 1.03,
};

/* Progress bar fill */
const PROGRESS = {
  spring: { type: 'spring' as const, stiffness: 200, damping: 32 },
};

/* Results list */
const RESULTS = {
  stagger: 0.12, // seconds between each result card's entrance
  offsetY: 16,
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  countDuration: 0.9, // seconds for the percentage to count up
  countStaggerDelay: 0.15, // extra seconds of count-up delay per rank
};

function AnimatedPercent({ value, delay = 0 }: { value: number; delay?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useMotionValueEvent(rounded, 'change', (latest) => setDisplay(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: RESULTS.countDuration, delay, ease: 'easeOut' });
    return () => controls.stop();
  }, [value, delay]);

  return <span>{display}% match</span>;
}

export default function Finder() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Partial<Record<TraitKey, number>>>({});
  const [showAll, setShowAll] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const isComplete = step >= questions.length;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, isComplete]);

  const results = isComplete
    ? [...dances]
        .map((d) => ({ dance: d, score: matchScore(answers as Record<TraitKey, number>, d) }))
        .sort((a, b) => b.score - a.score)
    : [];

  const handleAnswer = (trait: TraitKey, value: number, index: number) => {
    setDirection(1);
    setSelected(index);
    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [trait]: value }));
      setStep((s) => s + 1);
      setSelected(null);
    }, TIMING.selectionHold);
  };

  const goBack = () => {
    setDirection(-1);
    setSelected(null);
    setStep((s) => s - 1);
  };

  const restart = () => {
    setAnswers({});
    setDirection(1);
    setSelected(null);
    setShowAll(false);
    setStep(0);
  };

  useEffect(() => {
    if (isComplete || selected !== null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const optionIndex = Number(e.key) - 1;
      const options = questions[step].options;
      if (Number.isInteger(optionIndex) && optionIndex >= 0 && optionIndex < options.length) {
        handleAnswer(questions[step].trait, options[optionIndex].value, optionIndex);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, selected, isComplete]);

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
          <div
            className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-maroon-100"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={step}
          >
            <motion.div
              className="h-full rounded-full bg-maroon-600"
              animate={{ width: `${(step / questions.length) * 100}%` }}
              transition={PROGRESS.spring}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: direction * CARD.offsetX }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -CARD.offsetX }}
              transition={CARD.spring}
            >
              <p className="text-sm font-medium text-maroon-500">
                Question {step + 1} of {questions.length}
              </p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-2 font-display text-2xl font-semibold text-maroon-900 outline-none"
              >
                {questions[step].prompt}
              </h2>
              <div
                role="radiogroup"
                aria-label={questions[step].prompt}
                className="mt-6 flex flex-col gap-3"
              >
                {questions[step].options.map((opt, i) => {
                  const isSelected = selected === i;
                  return (
                    <motion.button
                      key={opt.label}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      disabled={selected !== null}
                      onClick={() => handleAnswer(questions[step].trait, opt.value, i)}
                      initial={{ opacity: 0, y: OPTIONS.offsetY }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: isSelected ? OPTIONS.selectedScale : 1,
                      }}
                      transition={{ ...OPTIONS.spring, delay: i * OPTIONS.stagger }}
                      className={`flex items-center gap-3 rounded-xl border px-5 py-4 text-left font-medium transition-colors ${
                        isSelected
                          ? 'border-maroon-600 bg-maroon-50 text-maroon-900'
                          : 'border-maroon-200 bg-white text-maroon-900 hover:border-maroon-500 hover:bg-maroon-50'
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected ? 'border-maroon-600 bg-maroon-600' : 'border-maroon-300'
                        }`}
                      >
                        {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      {opt.label}
                      <span className="ml-auto flex-shrink-0 text-xs font-normal text-maroon-400">
                        {i + 1}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="mt-6 text-sm font-medium text-maroon-600 hover:text-maroon-800"
            >
              ← Back
            </button>
          )}
        </div>
      ) : (
        <div className="mt-10">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-2xl font-semibold text-maroon-900 outline-none"
          >
            Your top matches
          </h2>
          <div className="mt-6 space-y-4">
            {(showAll ? results : results.slice(0, 3)).map(({ dance, score }, i) => {
              const matchedTraits = closestTraits(answers as Record<TraitKey, number>, dance);
              return (
                <motion.div
                  key={dance.id}
                  initial={{ opacity: 0, y: RESULTS.offsetY }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...RESULTS.spring, delay: Math.min(i, 2) * RESULTS.stagger }}
                >
                  <Link
                    to={`/dance/${dance.id}`}
                    className={`flex items-center gap-4 rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md ${
                      i === 0 ? 'border-l-4 border-l-gold-500 border-y-maroon-200 border-r-maroon-200' : 'border-maroon-200'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold ${
                        i === 0 ? 'bg-gold-500 text-maroon-950' : 'bg-gold-100 text-gold-800'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-lg font-semibold text-maroon-900">
                          {dance.name}
                        </span>
                        <span className="text-sm font-semibold text-maroon-600">
                          <AnimatedPercent value={score} delay={Math.min(i, 2) * RESULTS.countStaggerDelay} />
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-maroon-700/80 line-clamp-2">{dance.description}</p>
                      <p className="mt-2 text-xs font-medium text-maroon-500">
                        Closest on your {matchedTraits.map((t) => TRAIT_LABELS[t]).join(' & ')} answers
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {dance.moodTags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-maroon-50 px-2.5 py-0.5 text-xs font-medium text-maroon-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={restart}
              className="rounded-full border border-maroon-300 bg-white px-6 py-2.5 text-sm font-semibold text-maroon-800 transition-colors hover:bg-maroon-100"
            >
              Retake the quiz
            </button>
            {results.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="rounded-full px-6 py-2.5 text-sm font-semibold text-maroon-600 transition-colors hover:text-maroon-800"
              >
                {showAll ? 'Show top 3 only' : `See all ${results.length} matches`}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
