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

import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { motion } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { dances, getDanceById, type Dance } from '../data/dances';
import { DANCE_GROUPS } from '../data/danceGroups';

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

/**
 * A short, genuinely silent WAV as a data URI. iOS WebKit (Safari and, since it's
 * required to use the same engine, Chrome/every other iOS browser) mutes raw Web
 * Audio API output whenever the hardware ring/silent switch is flipped, *unless*
 * the page also has a real <audio>/<video> element actively playing — that shifts
 * the page's audio session into the category iOS doesn't silence. Looping this
 * while the metronome runs "unlocks" the click sounds on affected devices.
 */
function createSilentWavDataUri(durationSec = 0.2, sampleRate = 8000): string {
  const numSamples = Math.floor(durationSec * sampleRate);
  const dataSize = numSamples * 2; // 16-bit mono
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);
  const writeString = (offset: number, s: string) => {
    for (let i = 0; i < s.length; i += 1) view.setUint8(offset + i, s.charCodeAt(i));
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, 'data');
  view.setUint32(40, dataSize, true);
  // remaining bytes are zero-initialized -- genuine silence
  let binary = '';
  new Uint8Array(buffer).forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return `data:audio/wav;base64,${btoa(binary)}`;
}

const PULSE = {
  spring: { type: 'spring' as const, stiffness: 400, damping: 22 },
};

/* Web Audio look-ahead scheduler — avoids the drift a plain setInterval click would have */
const SCHEDULER = {
  lookaheadMs: 25, // how often the scheduler wakes up to queue more clicks
  scheduleAheadSec: 0.1, // how far into the future clicks get queued
};

/**
 * Lazily creates the AudioContext and returns a `start()` you call synchronously
 * inside the Play button's click handler. Browsers only let audio actually start
 * playing when the context is created/resumed within that same user-gesture call
 * stack — doing it a tick later from a useEffect (which fires after the click
 * handler returns) leaves the context silently suspended.
 */
function useAudioContext() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
    };
  }, []);

  const start = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    // Must be called synchronously in the gesture handler, not awaited, to satisfy autoplay policy
    void audioCtxRef.current.resume();
    return audioCtxRef.current;
  };

  return { audioCtxRef, start };
}

function useMetronome({ clicksPerMinute, isDownbeat, playing, audioCtxRef, volumeRef }: {
  clicksPerMinute: number;
  isDownbeat: (clickIndex: number) => boolean;
  playing: boolean;
  audioCtxRef: RefObject<AudioContext | null>;
  volumeRef: RefObject<number>;
}) {
  const [currentClick, setCurrentClick] = useState(0);
  const nextClickTimeRef = useRef(0);
  const clickIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      setCurrentClick(0);
      return;
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    clickIndexRef.current = 0;
    nextClickTimeRef.current = ctx.currentTime + 0.05;

    const playClick = (time: number, accented: boolean) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const volumeScale = Math.max(volumeRef.current, 0.01) / 100;
      osc.frequency.value = accented ? 1400 : 900;
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime((accented ? 0.55 : 0.4) * volumeScale, time + 0.005);
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
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, clicksPerMinute]);

  return currentClick;
}

const SILENT_UNLOCK_SRC = createSilentWavDataUri();

export default function BeatTrainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDance = getDanceById(searchParams.get('dance') ?? '') ?? getDanceById('waltz')!;
  const [selectedId, setSelectedId] = useState(initialDance.id);
  const [speedPct, setSpeedPct] = useState(75);
  const [playing, setPlaying] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const [volumePct, setVolumePct] = useState(80);
  const [customBpm, setCustomBpm] = useState<number | null>(null);
  const unlockAudioRef = useRef<HTMLAudioElement | null>(null);
  const volumeRef = useRef(volumePct);
  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    volumeRef.current = volumePct;
  }, [volumePct]);

  const dance = getDanceById(selectedId) ?? dances[0];
  const { rate, unit: publishedUnit } = useMemo(() => parseTempo(dance.tempo), [dance]);
  const perBar = useMemo(() => beatsPerBar(dance.timeSignature), [dance]);
  // Tapping your own tempo always yields beats, regardless of how the dance's own tempo is published
  const unit: TempoUnit = customBpm ? 'bpm' : publishedUnit;
  const clicksPerMinute = customBpm ?? Math.round((rate * speedPct) / 100);

  const { audioCtxRef, start: startAudio } = useAudioContext();
  const isDownbeat = (clickIndex: number) => unit === 'bpm' && clickIndex % perBar === 0;
  const currentClick = useMetronome({ clicksPerMinute, isDownbeat, playing, audioCtxRef, volumeRef });
  const beatInBar = unit === 'bpm' ? (currentClick % perBar) + 1 : null;

  useEffect(() => {
    setPlaying(false);
    setCustomBpm(null);
    tapTimesRef.current = [];
    unlockAudioRef.current?.pause();
  }, [selectedId]);

  const selectDance = (d: Dance) => {
    setSelectedId(d.id);
    setSearchParams({ dance: d.id }, { replace: true });
  };

  const handleTap = () => {
    const now = performance.now();
    const taps = tapTimesRef.current;
    const last = taps[taps.length - 1];
    const resetGap = last !== undefined && now - last > 2500;
    const nextTaps = resetGap ? [now] : [...taps, now].slice(-8);
    tapTimesRef.current = nextTaps;
    if (nextTaps.length >= 2) {
      const intervals = nextTaps.slice(1).map((t, i) => t - nextTaps[i]);
      const avgIntervalMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const bpm = Math.round(60000 / avgIntervalMs);
      setCustomBpm(Math.min(300, Math.max(20, bpm)));
    }
  };

  const useDanceTempo = () => {
    tapTimesRef.current = [];
    setCustomBpm(null);
  };

  const togglePlay = () => {
    if (!playing) {
      const ctx = startAudio(); // must happen synchronously in this click handler
      ctx
        .resume()
        .then(() => setAudioBlocked(ctx.state !== 'running'))
        .catch(() => setAudioBlocked(true));
      unlockAudioRef.current?.play().catch(() => {}); // ignore -- best-effort iOS unlock
    } else {
      setAudioBlocked(false);
      unlockAudioRef.current?.pause();
    }
    setPlaying((p) => !p);
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
          {customBpm
            ? `Tapped to ${customBpm} beats per minute — match this to whatever song you've got playing, and the accent still marks beat 1 of every ${perBar}-beat bar for this dance.`
            : publishedUnit === 'bpm'
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

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              aria-pressed={playing}
              className="rounded-full bg-maroon-700 px-8 py-3 text-sm font-semibold text-gold-50 transition-colors hover:bg-maroon-800"
            >
              {playing ? 'Stop' : 'Play'}
            </button>
            <button
              type="button"
              onClick={handleTap}
              className="rounded-full border border-maroon-300 bg-white px-6 py-3 text-sm font-semibold text-maroon-800 transition-colors hover:bg-maroon-100"
            >
              Tap tempo
            </button>
          </div>
          {playing && audioBlocked && (
            <p className="mt-2 text-xs text-maroon-600">
              Your browser is blocking sound here — tap Stop, then Play again, or check your
              device isn't muted.
            </p>
          )}
        </div>

        {customBpm ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-maroon-50 px-4 py-3 text-sm">
            <span className="font-medium text-maroon-800">Custom tempo: {customBpm} bpm</span>
            <button
              type="button"
              onClick={useDanceTempo}
              className="font-medium text-maroon-700 underline hover:text-maroon-900"
            >
              Use {dance.name}'s own tempo instead
            </button>
          </div>
        ) : (
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
        )}

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="volume" className="font-medium text-maroon-800">
              Volume
            </label>
            <span className="text-maroon-700/80">{volumePct}%</span>
          </div>
          <input
            id="volume"
            type="range"
            min={0}
            max={100}
            step={5}
            value={volumePct}
            onChange={(e) => setVolumePct(Number(e.target.value))}
            className="mt-2 w-full accent-maroon-600"
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-maroon-700/70">
        Ready to see it danced?{' '}
        <Link to={`/dance/${dance.id}`} className="font-medium text-maroon-800 underline hover:text-maroon-900">
          Go to {dance.name}
        </Link>
      </p>

      <audio ref={unlockAudioRef} src={SILENT_UNLOCK_SRC} loop preload="auto" hidden />
    </div>
  );
}
