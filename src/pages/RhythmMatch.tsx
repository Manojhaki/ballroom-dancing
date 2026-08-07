/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Rhythm Match
 *
 * The tap target pulses on every scheduled click (same audio-synced
 * pulse as Beat Trainer). Each tap spawns a floating accuracy label
 * that rises and fades out over ~700ms, independent of the pulse.
 * ───────────────────────────────────────────────────────── */

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { dances, getDanceById, type Dance } from '../data/dances';
import { DANCE_GROUPS } from '../data/danceGroups';
import { parseTempo, beatsPerBar, createSilentWavDataUri, useAudioContext, useMetronome } from '../lib/metronome';

const ROUND_LENGTH = 16;
const PERFECT_WINDOW_MS = 80;
const GOOD_WINDOW_MS = 180;
const MISS_WINDOW_SEC = 0.35;
const SWEEP_INTERVAL_MS = 120;
const FEEDBACK_LIFETIME_MS = 700;

type Tier = 'perfect' | 'good' | 'off' | 'miss';

const TIER_LABEL: Record<Tier, string> = {
  perfect: 'Perfect!',
  good: 'Good',
  off: 'Off beat',
  miss: 'Miss',
};

const TIER_CLASS: Record<Tier, string> = {
  perfect: 'text-gold-600',
  good: 'text-maroon-700',
  off: 'text-maroon-400',
  miss: 'text-maroon-400',
};

interface PendingClick {
  index: number;
  time: number;
  hit: boolean;
}

const SILENT_UNLOCK_SRC = createSilentWavDataUri();

export default function RhythmMatch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDance = getDanceById(searchParams.get('dance') ?? '') ?? getDanceById('waltz')!;
  const [selectedId, setSelectedId] = useState(initialDance.id);
  const [phase, setPhase] = useState<'idle' | 'playing' | 'results'>('idle');
  const [roundActive, setRoundActive] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [tierCounts, setTierCounts] = useState<Record<Tier, number>>({ perfect: 0, good: 0, off: 0, miss: 0 });
  const [feedback, setFeedback] = useState<{ id: number; tier: Tier }[]>([]);
  const [audioBlocked, setAudioBlocked] = useState(false);

  const unlockAudioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(85);
  const pendingClicksRef = useRef<PendingClick[]>([]);
  const feedbackIdRef = useRef(0);
  const sweepTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const roundEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dance = getDanceById(selectedId) ?? dances[0];
  const { rate, unit } = useMemo(() => parseTempo(dance.tempo), [dance]);
  const perBar = useMemo(() => beatsPerBar(dance.timeSignature), [dance]);
  const isDownbeat = (clickIndex: number) => unit === 'bpm' && clickIndex % perBar === 0;

  const { audioCtxRef, start: startAudio } = useAudioContext();

  const pushFeedback = (tier: Tier) => {
    const id = feedbackIdRef.current;
    feedbackIdRef.current += 1;
    setFeedback((items) => [...items, { id, tier }]);
    setTimeout(() => {
      setFeedback((items) => items.filter((i) => i.id !== id));
    }, FEEDBACK_LIFETIME_MS);
  };

  const registerResult = (tier: Tier) => {
    setScore((s) => s + (tier === 'perfect' ? 3 : tier === 'good' ? 1 : 0));
    setStreak((prev) => {
      const next = tier === 'perfect' || tier === 'good' ? prev + 1 : 0;
      setBestStreak((b) => Math.max(b, next));
      return next;
    });
    setTierCounts((counts) => ({ ...counts, [tier]: counts[tier] + 1 }));
    pushFeedback(tier);
  };

  const finishRound = () => {
    setRoundActive(false);
    setPhase('results');
    if (sweepTimerRef.current) clearInterval(sweepTimerRef.current);
    unlockAudioRef.current?.pause();
  };

  const onClickScheduled = (time: number, index: number) => {
    pendingClicksRef.current.push({ index, time, hit: false });
    if (index === ROUND_LENGTH - 1) {
      const ctx = audioCtxRef.current;
      const delayMs = ctx ? Math.max(0, (time - ctx.currentTime) * 1000) : 0;
      roundEndTimerRef.current = setTimeout(finishRound, delayMs + 500);
    }
  };

  const currentClick = useMetronome({
    clicksPerMinute: rate,
    isDownbeat,
    playing: roundActive,
    audioCtxRef,
    volumeRef,
    onClickScheduled,
  });

  useEffect(() => {
    if (!roundActive) return;
    sweepTimerRef.current = setInterval(() => {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const now = ctx.currentTime;
      pendingClicksRef.current.forEach((click) => {
        if (!click.hit && now - click.time > MISS_WINDOW_SEC) {
          click.hit = true;
          registerResult('miss');
        }
      });
      pendingClicksRef.current = pendingClicksRef.current.filter((c) => now - c.time < 2);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, SWEEP_INTERVAL_MS);
    return () => {
      if (sweepTimerRef.current) clearInterval(sweepTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundActive]);

  useEffect(() => {
    setPhase('idle');
    setRoundActive(false);
    unlockAudioRef.current?.pause();
    if (roundEndTimerRef.current) clearTimeout(roundEndTimerRef.current);
    if (sweepTimerRef.current) clearInterval(sweepTimerRef.current);
  }, [selectedId]);

  const selectDance = (d: Dance) => {
    setSelectedId(d.id);
    setSearchParams({ dance: d.id }, { replace: true });
  };

  const startRound = () => {
    const ctx = startAudio(); // must happen synchronously in this click handler
    ctx
      .resume()
      .then(() => setAudioBlocked(ctx.state !== 'running'))
      .catch(() => setAudioBlocked(true));
    unlockAudioRef.current?.play().catch(() => {}); // ignore -- best-effort iOS unlock

    pendingClicksRef.current = [];
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTierCounts({ perfect: 0, good: 0, off: 0, miss: 0 });
    setFeedback([]);
    setPhase('playing');
    setRoundActive(true);
  };

  const handleTap = () => {
    if (phase !== 'playing') return;
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;

    let closest: PendingClick | null = null;
    let closestDelta = Infinity;
    pendingClicksRef.current.forEach((click) => {
      if (click.hit) return;
      const delta = Math.abs(now - click.time);
      if (delta < closestDelta) {
        closestDelta = delta;
        closest = click;
      }
    });

    if (!closest || closestDelta > MISS_WINDOW_SEC) {
      registerResult('off');
      return;
    }
    (closest as PendingClick).hit = true;
    const deltaMs = Math.abs(closestDelta * 1000);
    const tier: Tier = deltaMs <= PERFECT_WINDOW_MS ? 'perfect' : deltaMs <= GOOD_WINDOW_MS ? 'good' : 'off';
    registerResult(tier);
  };

  useEffect(() => {
    if (phase !== 'playing') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const totalTaps = tierCounts.perfect + tierCounts.good + tierCounts.off + tierCounts.miss;
  const accuracy = totalTaps > 0 ? Math.round(((tierCounts.perfect + tierCounts.good) / totalTaps) * 100) : 0;
  const beatInBar = unit === 'bpm' ? (currentClick % perBar) + 1 : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Play</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Rhythm Match
      </h1>
      <p className="mt-3 max-w-xl text-maroon-700/85">
        Sixteen beats, real tempo, no slowing it down. Tap (or hit space) right when you hear
        the click and see how close you land.
      </p>

      <div className="mt-8 space-y-4">
        {DANCE_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-maroon-500">{group.label}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.ids.map((id) => {
                const d = getDanceById(id);
                if (!d) return null;
                const isSelected = d.id === selectedId;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => selectDance(d)}
                    aria-pressed={isSelected}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'border-maroon-600 bg-maroon-600 text-white'
                        : 'border-maroon-200 bg-white text-maroon-800 hover:border-maroon-500 hover:bg-maroon-50'
                    }`}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-maroon-200 bg-white p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-semibold text-maroon-900">{dance.name}</h2>
          <span className="text-sm text-maroon-700/70">
            {dance.timeSignature} time · {dance.tempo}
          </span>
        </div>

        {phase === 'playing' && (
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <span className="font-medium text-maroon-800">Score {score}</span>
            <span className="font-medium text-maroon-800">Streak {streak}</span>
            <span className="text-maroon-700/70">Beat {currentClick + 1}/{ROUND_LENGTH}</span>
          </div>
        )}

        <div className="relative mt-10 flex flex-col items-center">
          <div className="pointer-events-none absolute top-0 flex h-10 items-start justify-center">
            <AnimatePresence>
              {feedback.map((f) => (
                <motion.span
                  key={f.id}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className={`absolute font-display text-lg font-semibold ${TIER_CLASS[f.tier]}`}
                >
                  {TIER_LABEL[f.tier]}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            onClick={phase === 'playing' ? handleTap : startRound}
            key={phase === 'playing' ? currentClick : phase}
            initial={phase === 'playing' ? { scale: beatInBar === 1 ? 1.15 : 1.05, opacity: 1 } : { scale: 1 }}
            animate={{ scale: 1, opacity: phase === 'playing' ? 0.85 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className={`flex h-32 w-32 items-center justify-center rounded-full font-display text-lg font-semibold transition-colors ${
              phase === 'playing'
                ? beatInBar === 1
                  ? 'bg-gold-500 text-maroon-950'
                  : 'bg-maroon-600 text-white'
                : 'bg-maroon-700 text-gold-50 hover:bg-maroon-800'
            }`}
          >
            {phase === 'idle' && 'Start'}
            {phase === 'playing' && 'Tap'}
            {phase === 'results' && 'Play again'}
          </motion.button>

          {phase === 'playing' && audioBlocked && (
            <p className="mt-3 text-xs text-maroon-600">
              Your browser is blocking sound here — stop and start again, or check your device
              isn't muted.
            </p>
          )}
        </div>

        {phase === 'results' && (
          <div className="mt-8 rounded-xl bg-maroon-50 p-5 text-center">
            <p className="font-display text-2xl font-semibold text-maroon-900">{accuracy}% accuracy</p>
            <div className="mt-3 flex justify-center gap-6 text-sm text-maroon-700/80">
              <span>Score {score}</span>
              <span>Best streak {bestStreak}</span>
            </div>
            <p className="mt-3 text-xs text-maroon-700/60">
              {tierCounts.perfect} perfect · {tierCounts.good} good · {tierCounts.off + tierCounts.miss} off
            </p>
          </div>
        )}

        {phase === 'idle' && (
          <p className="mt-6 text-center text-sm text-maroon-700/70">
            Press Start when you're ready — the round begins right away.
          </p>
        )}
      </div>

      <p className="mt-6 text-sm text-maroon-700/70">
        Want to practice this tempo slower first?{' '}
        <Link
          to={`/beat-trainer?dance=${dance.id}`}
          className="font-medium text-maroon-800 underline hover:text-maroon-900"
        >
          Try the Beat Trainer
        </Link>
      </p>

      <audio ref={unlockAudioRef} src={SILENT_UNLOCK_SRC} loop preload="auto" hidden />
    </div>
  );
}
