import { useEffect, useRef, useState, type RefObject } from 'react';

export type TempoUnit = 'bpm' | 'bars/min';

export interface ParsedTempo {
  rate: number; // clicks per minute, taken as the midpoint of the dance's published range
  unit: TempoUnit;
}

/** Reads a dance's own `tempo` string (e.g. "84-90 bpm", "30-32 bars/min") as-is */
export function parseTempo(tempo: string): ParsedTempo {
  const numbers = tempo.match(/\d+(\.\d+)?/g)?.map(Number) ?? [120];
  const rate = Math.round(numbers.reduce((a, b) => a + b, 0) / numbers.length);
  const unit: TempoUnit = tempo.includes('bars/min') ? 'bars/min' : 'bpm';
  return { rate, unit };
}

export function beatsPerBar(timeSignature: string): number {
  return Number(timeSignature.split('/')[0]) || 4;
}

/** One step within a repeating count cycle (one bar) */
export interface CountStep {
  /** What's shown/announced, e.g. '1', '2', '&' */
  label: string;
  /** Position within the cycle, in beats, ascending from 0 -- fractional for off-beats like the '&' */
  beatOffset: number;
  accent?: boolean;
}

/** A dance's repeating count structure -- one cycle is one bar */
export interface CountPattern {
  cycleBeats: number;
  steps: CountStep[];
}

/**
 * The generic pattern used for any dance without a verified count pattern -- reproduces
 * the metronome's original behavior exactly: `bpm` dances click every beat with the
 * downbeat accented, `bars/min` dances click once per bar with no accent (studios publish
 * these in bars because how many steps fit in a bar varies dance to dance, and guessing a
 * bars-to-beats conversion doesn't hold universally -- see Beat Trainer's explainer text).
 */
export function defaultPattern(unit: TempoUnit, cycleBeats: number): CountPattern {
  if (unit === 'bars/min') {
    return { cycleBeats, steps: [{ label: 'Bar', beatOffset: 0, accent: false }] };
  }
  return {
    cycleBeats,
    steps: Array.from({ length: cycleBeats }, (_, i) => ({
      label: String(i + 1),
      beatOffset: i,
      accent: i === 0,
    })),
  };
}

/**
 * A short, genuinely silent WAV as a data URI. iOS WebKit (Safari and, since it's
 * required to use the same engine, Chrome/every other iOS browser) mutes raw Web
 * Audio API output whenever the hardware ring/silent switch is flipped, *unless*
 * the page also has a real <audio>/<video> element actively playing — that shifts
 * the page's audio session into the category iOS doesn't silence. Looping this
 * while the metronome runs "unlocks" the click sounds on affected devices.
 */
export function createSilentWavDataUri(durationSec = 0.2, sampleRate = 8000): string {
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

/* Web Audio look-ahead scheduler — avoids the drift a plain setInterval click would have */
const SCHEDULER = {
  lookaheadMs: 25, // how often the scheduler wakes up to queue more clicks
  scheduleAheadSec: 0.1, // how far into the future clicks get queued
};

/**
 * Lazily creates the AudioContext and returns a `start()` you call synchronously
 * inside a click handler. Browsers only let audio actually start playing when the
 * context is created/resumed within that same user-gesture call stack — doing it a
 * tick later from a useEffect (which fires after the click handler returns) leaves
 * the context silently suspended.
 */
export function useAudioContext() {
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

export interface CurrentStep {
  index: number;
  label: string;
  accent: boolean;
}

export function useMetronome({ pattern, cyclesPerMinute, playing, audioCtxRef, volumeRef, onClickScheduled }: {
  pattern: CountPattern;
  cyclesPerMinute: number;
  playing: boolean;
  audioCtxRef: RefObject<AudioContext | null>;
  volumeRef: RefObject<number>;
  /** Fired at the moment each step is scheduled, with its exact AudioContext time */
  onClickScheduled?: (time: number, index: number) => void;
}) {
  const [currentStep, setCurrentStep] = useState<CurrentStep | null>(null);
  const cycleStartRef = useRef(0);
  const stepPointerRef = useRef(0);
  const globalIndexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) {
      setCurrentStep(null);
      return;
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    stepPointerRef.current = 0;
    globalIndexRef.current = 0;
    cycleStartRef.current = ctx.currentTime + 0.05;

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

    const secondsPerCycle = 60 / cyclesPerMinute;

    const nextStepTime = () => {
      const step = pattern.steps[stepPointerRef.current];
      return cycleStartRef.current + secondsPerCycle * (step.beatOffset / pattern.cycleBeats);
    };

    const tick = () => {
      while (nextStepTime() < ctx.currentTime + SCHEDULER.scheduleAheadSec) {
        const step = pattern.steps[stepPointerRef.current];
        const time = nextStepTime();
        const index = globalIndexRef.current;
        playClick(time, !!step.accent);
        onClickScheduled?.(time, index);
        const delay = Math.max(0, time - ctx.currentTime) * 1000;
        setTimeout(() => setCurrentStep({ index, label: step.label, accent: !!step.accent }), delay);

        globalIndexRef.current += 1;
        stepPointerRef.current += 1;
        if (stepPointerRef.current >= pattern.steps.length) {
          stepPointerRef.current = 0;
          cycleStartRef.current += secondsPerCycle;
        }
      }
    };

    tick();
    timerRef.current = setInterval(tick, SCHEDULER.lookaheadMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, cyclesPerMinute, pattern]);

  return currentStep;
}
