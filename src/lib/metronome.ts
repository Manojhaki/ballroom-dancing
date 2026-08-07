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

export function useMetronome({ clicksPerMinute, isDownbeat, playing, audioCtxRef, volumeRef, onClickScheduled }: {
  clicksPerMinute: number;
  isDownbeat: (clickIndex: number) => boolean;
  playing: boolean;
  audioCtxRef: RefObject<AudioContext | null>;
  volumeRef: RefObject<number>;
  /** Fired at the moment each click is scheduled, with its exact AudioContext time */
  onClickScheduled?: (time: number, index: number) => void;
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
        onClickScheduled?.(nextClickTimeRef.current, index);
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
