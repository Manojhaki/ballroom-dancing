/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — Beat Trainer
 *
 * The circle pulses once per click, synced to the Web Audio scheduler
 * (not to a CSS/JS timer) so what you see always matches what you hear:
 *    click    circle snaps out to full scale, full opacity
 *  ~150ms     eases back down to resting size before the next click
 * A downbeat (beat 1, bpm dances only) pulses larger and plays a
 * higher-pitched tone than the other beats in the bar.
 * ───────────────────────────────────────────────────────── */

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { dances, getDanceById, type Dance } from '../data/dances';

type TempoUnit = 'bpm' | 'bars/min';

interface ParsedTempo {
  rate: number; // clicks per minute, taken as the midpoint of the dance's published range
  unit: TempoUnit;
}

/** Reads the dance's own `tempo` string (e.g. "84-90 bpm", "30-32 bars/min") as-is */
function parseTempo(tempo: string): ParsedTempo {
  const numbers = tempo.match(/\d+(\.\d+)?/g)?.map(Number) ?? [120];
  const rate = Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length);
  const unit: TempoUnit = tempo.includes('bars/min') ? 'bars/min' : 'bpm';
  return { rate, unit };
}

function beatsPerBar(timeSignature: string): number {
  return Number(timeSignature.split('/')[0]) || 4;
}

const PULSE = {
  spring: { type: 'spring' as const, stiffness: 400, damping: 22 },
};

/* Web Audio look-ahead scheduler — avoids the drift a plain setInterval click would have */
const SCHEDULER = {
  lookaheadMs: 25, // how often the scheduler wakes up to queue more clicks
  scheduleAheadSec: 0.1, // how far into the future clicks get queued
};

function useMetronome({ clicksPerMinute, isDownbeat, playing }: {
  clicksPerMinute: number;
  isDownbeat: (clickIndex: number) => boolean;
  playing: boolean;
}) {
  const [currentClick, setCurrentClick] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextClickTimeRef = useRef(0);
  const clickIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;
    clickIndexRef.current = 0;
    nextClickTimeRef.current = ctx.currentTime + 0.05;

    const playClick = (time: number, accented: boolean) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = accented ? 1400 : 900;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(accented ? 0.35 : 0.22, time + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);
      osc.connect(gain).connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.07);
    };

    const secondsPerClick = 60 / clicksPerMinute;

    const tick = () => {
      while (nextClickTimeRef.current < ctx.currentTime + SCHEDULER.scheduleAheadSec) {
        const index = clickIndexRef.current;
        playClick(nextClickTimeRef.current, isDownbeat(index));
        const delay = Math.max(0, nextClickTimeRef.current - ctx.currentTime) * 1000;
        setTimeout(() => setCurrentClick(index), delay);
        clickIndexRef.current += 1;
        nextClickTimeRef.current += secondsPerClick;
      }
    };

    tick();
    timerRef.current = setInterval(tick, SCHEDULER.lookaheadMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      ctx.close();
      audioCtxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, clicksPerMinute]);

  useEffect(() => {
    if (!playing) setCurrentClick(0);
  }, [playing]);

  return currentClick;
}

const DANCE_GROUPS: { label: string; ids: string[] }[] = [
  {
    label: 'Smooth & Standard',
    ids: ['waltz', 'tango', 'viennese-waltz', 'foxtrot', 'quickstep'],
  },
  {
    label: 'Rhythm & Latin',
    ids: ['cha-cha', 'rumba', 'samba', 'jive', 'paso-doble', 'bolero', 'mambo'],
  },
  {
    label: 'Social',
    ids: ['east-coast-swing', 'salsa', 'hustle', 'bachata'],
  },
];

export default function BeatTrainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDance = getDanceById(searchParams.get('dance') ?? '') ?? getDanceById('waltz')!;
  const [selectedId, setSelectedId] = useState(initialDance.id);
  const [speedPct, setSpeedPct] = useState(75);
  const [playing, setPlaying] = useState(false);

  const dance = getDanceById(selectedId) ?? dances[0];
  const { rate, unit } = useMemo(() => parseTempo(dance.tempo), [dance]);
  const perBar = useMemo(() => beatsPerBar(dance.timeSignature), [dance]);
  const clicksPerMinute = Math.round((rate * speedPct) / 100);

  const isDownbeat = (clickIndex: number) => unit === 'bpm' && clickIndex % perBar === 0;
  const currentClick = useMetronome({ clicksPerMinute, isDownbeat, playing });
  const beatInBar = unit === 'bpm' ? (currentClick % perBar) + 1 : null;

  useEffect(() => {
    setPlaying(false);
  }, [selectedId]);

  const selectDance = (d: Dance) => {
    setSelectedId(d.id);
    setSearchParams({ dance: d.id }, { replace: true });
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Practice</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        Beat Trainer
      </h1>
      <div className="mt-3 max-w-xl space-y-3 text-maroon-700/85">
        <p>
          Before I could dance a rhythm, I had to be able to hear it. This is a metronome for
          each dance's own tempo — pick one, slow it down, and count along a few times before
          you ever need to do it with your feet.
        </p>
      </div>

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
            {dance.timeSignature} time · published tempo {dance.tempo}
          </span>
        </div>

        <p className="mt-2 text-sm text-maroon-700/80">
          {unit === 'bpm'
            ? `Studios publish this one in beats per minute, so each click below is a beat — the accented click is beat 1 of every ${perBar}-beat bar.`
            : `Studios publish this one in bars per minute rather than beats, since how many steps fit in a bar changes dance to dance. Each click below marks one full bar — count your own steps into the gap between clicks.`}
        </p>

        <div className="mt-8 flex flex-col items-center">
          <motion.div
            key={currentClick}
            initial={{ scale: beatInBar === 1 || unit === 'bars/min' ? 1.15 : 1.05, opacity: 1 }}
            animate={{ scale: 1, opacity: 0.85 }}
            transition={PULSE.spring}
            className={`flex h-28 w-28 items-center justify-center rounded-full font-display text-2xl font-semibold ${
              beatInBar === 1 || (unit === 'bars/min' && playing)
                ? 'bg-gold-500 text-maroon-950'
                : 'bg-maroon-600 text-white'
            }`}
          >
            {unit === 'bpm' ? beatInBar ?? 1 : 'Bar'}
          </motion.div>

          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-pressed={playing}
            className="mt-6 rounded-full bg-maroon-700 px-8 py-3 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
          >
            {playing ? 'Stop' : 'Play'}
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="speed" className="font-medium text-maroon-800">
              Practice speed
            </label>
            <span className="text-maroon-700/80">
              {speedPct}% · ≈{clicksPerMinute} {unit === 'bpm' ? 'beats' : 'bars'}/min
            </span>
          </div>
          <input
            id="speed"
            type="range"
            min={50}
            max={100}
            step={5}
            value={speedPct}
            onChange={(e) => setSpeedPct(Number(e.target.value))}
            className="mt-2 w-full accent-maroon-600"
          />
          <p className="mt-1 text-xs text-maroon-700/60">
            Capped at the dance's own published tempo — start slower, work up to full speed.
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-maroon-700/70">
        Ready to see it danced?{' '}
        <Link to={`/dance/${dance.id}`} className="font-medium text-maroon-800 underline hover:text-maroon-900">
          Go to {dance.name}
        </Link>
      </p>
    </div>
  );
}
