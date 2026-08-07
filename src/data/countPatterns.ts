import type { CountPattern } from '../lib/metronome';

/**
 * Verified per-dance count patterns, confirmed against how the dance is actually counted
 * on the floor rather than derived from the published tempo alone. Deliberately sparse --
 * every dance not listed here falls back to the generic pattern (see
 * `lib/metronome.ts`'s `defaultPattern`) rather than a guessed count. Add entries here only
 * once a pattern is confirmed accurate.
 */
export const countPatterns: Record<string, { pattern: CountPattern; description: string }> = {
  'cha-cha': {
    pattern: {
      cycleBeats: 4,
      steps: [
        { label: '1', beatOffset: 0 },
        { label: '2', beatOffset: 1, accent: true },
        { label: '3', beatOffset: 2 },
        { label: '4', beatOffset: 3 },
        { label: '&', beatOffset: 3.5 },
      ],
    },
    description:
      "Cha Cha breaks on 2 — that's the accented click — then closes the phrase with the classic cha-cha-cha triple on 4-&-1.",
  },
};
