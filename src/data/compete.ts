import type { FaqItem } from './roadmap';

export interface LevelTrack {
  title: string;
  levels: string[];
  description: string;
}

/** The core mental model: closed = follow the approved menu, open = write your own. */
export const proficiencyLadder: LevelTrack[] = [
  {
    title: 'Closed (syllabus)',
    levels: ['Newcomer', 'Bronze', 'Silver', 'Gold'],
    description:
      'Follow the approved menu. Couples may only perform figures from the allowed syllabus for that level — you cannot legally dance a Silver figure in a Bronze event. Levels are cumulative: Silver can draw on Bronze + Silver figures, Gold adds Gold on top, but never above your level.',
  },
  {
    title: 'Open',
    levels: ['Novice', 'Pre-Champ', 'Championship'],
    description:
      "Write your own. The figure restriction lifts entirely — couples choreograph custom routines with any figures and their own composition, judged on artistry as much as technique.",
  },
];

export const terminologyNote =
  '"Syllabus" and "closed" mean the same idea — restricted to an allowed figure list. Comps label events inconsistently: sometimes "Syllabus" is an umbrella term for all closed levels, sometimes it\'s its own named event (e.g. a "Syllabus Paso Doble" listed separately from "Gold"). Don\'t worry if it looks inconsistent between competitions — it is.';

export const eventFormatNote =
  'Beginners usually dance single-dance events (e.g. "Newcomer Cha Cha"). Higher levels bundle multiple dances into one event ("Silver Samba Jive"), up to the full four-dance Latin set at Gold/Open — Cha Cha, Rumba, Samba, Paso Doble, Jive, often abbreviated "CRSJ" in event listings.';

export const scoringFaq: FaqItem[] = [
  {
    question: 'How does judging actually work? (the "skating system")',
    answer:
      "Each couple gets an ordinal placement from every judge in every dance — 1st, 2nd, 3rd, and so on — never a numeric score. Those placements get summed: a couple placed (1,1) by two judges has a Sum of 2; a couple placed (3,2) has a Sum of 5. Lowest sum wins. It's called the skating system because it's the same method used to judge figure skating.",
  },
  {
    question: 'What is "Rule 11"?',
    answer:
      "The tiebreak that resolves equal sums — it looks at how many judges placed a couple 1st, then 2nd, and so on, working down until the tie breaks. You'll see it referenced on official results sheets when two couples land on the same sum.",
  },
  {
    question: 'What are the half-marks (like 4.5) I see on results sheets?',
    answer:
      'Those come from split decisions among judges and are part of how ties get resolved within the skating system — you don\'t need to calculate them yourself, just know they show up on legitimate results and aren\'t an error.',
  },
];

export const collegiateFaq: FaqItem[] = [
  {
    question: 'What does "Unaffiliated" mean on a results sheet?',
    answer:
      'Collegiate competitors dance under their university\'s team affiliation. "Unaffiliated" just means the dancer isn\'t competing under a school — common for alumni or non-collegiate entrants at collegiate-hosted events.',
  },
  {
    question: 'Why do some events say "Newcomer I" and "Newcomer II"?',
    answer:
      "Many collegiate circuits split Newcomer into two tiers — Newcomer I for absolute first-timers, Newcomer II for slightly more experienced newcomers — so true beginners aren't competing directly against people who've already danced a season or two.",
  },
  {
    question: 'What is "Rookie-Vet"?',
    answer:
      'A special partnership format that pairs a first-year competitor with an experienced one — a common collegiate format precisely because it gives brand-new dancers a partner who already knows how competitions run.',
  },
];

export interface Arena {
  title: string;
  description: string;
}

export const arenas: Arena[] = [
  {
    title: 'Collegiate competitions',
    description:
      'Hosted by university dance teams, running many events across a season. Competitors dance under school affiliations (or "Unaffiliated"). Often the cheapest, most beginner-friendly entry point.',
  },
  {
    title: 'Studio / private competitions',
    description:
      'Independent and chain studios host their own events, including pro-am (dancing with your instructor) and showcase formats — common if you started at a studio rather than a collegiate team.',
  },
  {
    title: 'Federation / organization events',
    description:
      'Bodies like NDCA and USA Dance sanction competitions and open membership registration to enter. The more formal, nationally organized tier — usually where dancers head once they\'re competing seriously.',
  },
];

export const moveUpFaq: FaqItem = {
  question: 'What is "pointing out" or a mandatory move-up?',
  answer:
    "Do well enough at a level and most organizations require you to move up to the next one — usually via a points system where strong placements accrue points until you hit a threshold. The purpose is to stop experienced couples from camping at a level they've outgrown (\"sandbagging\"), keeping competition fair for genuine newcomers. The principle is universal; the exact mechanics — points needed, wins counted, per-partnership vs. per-dancer, whether points reset — vary by organization and circuit (collegiate, NDCA, and USA Dance all differ). Check the specific rules for whatever circuit you're entering rather than assuming a number.",
};
