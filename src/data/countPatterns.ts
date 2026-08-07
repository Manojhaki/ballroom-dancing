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
  samba: {
    pattern: {
      // The samba bounce: "1" held 3/4 beat, a quick "a" pickup, then a full beat on "2" --
      // one bar of Samba's 2/4 time, repeating (longer phrases just keep counting 3-a-4,
      // 5-a-6, 7-a-8 across further bars, same shape each time)
      cycleBeats: 2,
      steps: [
        { label: '1', beatOffset: 0, accent: true },
        { label: 'a', beatOffset: 0.75 },
        { label: '2', beatOffset: 1 },
      ],
    },
    description:
      'Samba bounces "1-a-2" — 1 held for three-quarters of a beat, a quick "a" pickup, then a full beat on 2. The accent lands on 1.',
  },
  jive: {
    pattern: {
      // Quick, Quick, then two syncopated triples -- one bar of Jive's 4/4 time. Each
      // triple's first sub-step is held 3/4 beat, a quick "&" pickup at the 3/4 mark, then
      // a full beat on the triple's last sub-step.
      cycleBeats: 6,
      steps: [
        { label: '1', beatOffset: 0 }, // Quick
        { label: '2', beatOffset: 1 }, // Quick
        { label: '3', beatOffset: 2, accent: true }, // Triple
        { label: '&', beatOffset: 2.75 },
        { label: '4', beatOffset: 3 },
        { label: '5', beatOffset: 4 }, // Triple
        { label: '&', beatOffset: 4.75 },
        { label: '6', beatOffset: 5 },
      ],
    },
    description:
      'Jive is Quick, Quick, then two syncopated triples — 3-&-4 and 5-&-6, each a sharp 3/4-beat, 1/4-beat, full-beat snap. The accent lands on 3, the first triple.',
  },
  'east-coast-swing': {
    pattern: {
      // Two triples, then the rock step -- one bar of East Coast Swing's 4/4 time. Same
      // shape as Jive's triples but split evenly (half/half) rather than syncopated.
      cycleBeats: 6,
      steps: [
        { label: '1', beatOffset: 0 }, // Triple
        { label: '&', beatOffset: 0.5 },
        { label: '2', beatOffset: 1 },
        { label: '3', beatOffset: 2 }, // Triple
        { label: '&', beatOffset: 2.5 },
        { label: '4', beatOffset: 3 },
        { label: '5', beatOffset: 4, accent: true }, // Rock step
        { label: '6', beatOffset: 5 },
      ],
    },
    description:
      'East Coast Swing is two even triples — 1-&-2 and 3-&-4 — followed by the rock step on 5-6, which carries the accent.',
  },
};
