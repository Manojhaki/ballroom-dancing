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
  tango: {
    pattern: {
      // A full walk phrase is Slow, Slow, Quick, Quick, Drag -- 4 bars of Tango's 2/4 time
      cycleBeats: 8,
      steps: [
        { label: '1', beatOffset: 0 }, // Slow
        { label: '3', beatOffset: 2 }, // Slow
        { label: '5', beatOffset: 4, accent: true }, // Quick
        { label: '6', beatOffset: 5, accent: true }, // Quick
        { label: '7', beatOffset: 6 }, // Drag
      ],
    },
    description:
      'Tango walks Slow, Slow, Quick, Quick, Drag — the accented Quick-Quick on 5-6 is the staccato snap that gives Tango its character.',
  },
  foxtrot: {
    pattern: {
      // Slow, Slow, Quick, Quick -- 1.5 bars of Foxtrot's 4/4 time
      cycleBeats: 6,
      steps: [
        { label: '1', beatOffset: 0, accent: true }, // Slow
        { label: '3', beatOffset: 2 }, // Slow
        { label: '5', beatOffset: 4 }, // Quick
        { label: '6', beatOffset: 5 }, // Quick
      ],
    },
    description:
      'Foxtrot walks Slow, Slow, Quick, Quick — the accent falls on 1, the start of each smooth, gliding phrase.',
  },
  quickstep: {
    pattern: {
      // Slow, Quick, Quick -- one bar of Quickstep's 4/4 time
      cycleBeats: 4,
      steps: [
        { label: '1', beatOffset: 0, accent: true }, // Slow
        { label: '3', beatOffset: 2 }, // Quick
        { label: '4', beatOffset: 3 }, // Quick
      ],
    },
    description:
      "Quickstep's basic is Slow, Quick, Quick over a single bar — the accent lands on 1.",
  },
  rumba: {
    pattern: {
      // Quick, Quick, Slow -- one bar of Rumba's 4/4 time
      cycleBeats: 4,
      steps: [
        { label: '1', beatOffset: 0, accent: true }, // Quick
        { label: '2', beatOffset: 1 }, // Quick
        { label: '3', beatOffset: 2 }, // Slow, spans 3-4
      ],
    },
    description:
      'Rumba is Quick, Quick, Slow — quick steps on 1 and 2, then a slow that stretches across 3 and 4. The accent lands on 1.',
  },
};
