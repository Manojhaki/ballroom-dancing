export interface RoadmapStep {
  step: number;
  title: string;
  description: string;
}

export const roadmapSteps: RoadmapStep[] = [
  {
    step: 1,
    title: 'Pick a friendly first dance',
    description:
      "Start with something forgiving of mistakes. East Coast Swing and Waltz are the classic first dances: steady tempo, simple patterns, and music you already know how to hear.",
  },
  {
    step: 2,
    title: 'Take a group class before private lessons',
    description:
      'Group classes are cheap, low-pressure, and you rotate partners so you get comfortable dancing with anyone, which is a core ballroom skill. Save private lessons for once you know you want to go deeper.',
  },
  {
    step: 3,
    title: 'Learn to follow or lead the frame, not just the steps',
    description:
      "The biggest beginner mistake is memorizing foot patterns instead of learning to connect through frame (the shape formed by your arms and posture). Good frame lets you dance a pattern you've never drilled.",
  },
  {
    step: 4,
    title: 'Go to a social dance / practice party',
    description:
      "Studios and community centers often run casual social nights. This is where steps turn into actual dancing: real music, strangers, variable tempos.",
  },
  {
    step: 5,
    title: 'Branch into a second style',
    description:
      'Once one dance feels natural, add a contrasting one, a Latin dance like Cha Cha if you started with Standard, or vice versa. Skills cross over more than you would expect.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const wearGuide: FaqItem[] = [
  {
    question: "What shoes should I wear?",
    answer:
      'Smooth-soled shoes (leather or suede sole) let you pivot and turn without your feet sticking to the floor. Sneakers grip too much and can twist your knees; slick dress-shoe soles are too slippery. Many studios sell inexpensive practice shoes or suede sole covers.',
  },
  {
    question: 'What should I wear to my first class?',
    answer:
      'Comfortable, breathable clothing you can move in: think what you would wear to a light workout, but presentable. Avoid restrictive jeans and skirts that limit long steps. Save the fancy outfit for a social event, not your first lesson.',
  },
  {
    question: 'Do I need a partner to start?',
    answer:
      "No. Most beginner group classes rotate partners every few minutes, and it's completely normal, even encouraged, to show up solo.",
  },
];

export const etiquette: FaqItem[] = [
  {
    question: 'Do I need to accept every dance I\'m asked for?',
    answer:
      "No, you can always decline politely, no explanation required. But at a social dance, it's considered good form to say yes to a reasonable request when you're free, especially from beginners.",
  },
  {
    question: 'What is "line of dance"?',
    answer:
      'On a social floor, traveling dances (Waltz, Foxtrot, Tango) move counter-clockwise around the room in a shared lane called the line of dance. Slower or stationary dancing happens toward the center, faster couples toward the outside. Stay aware of who is behind you.',
  },
  {
    question: 'What if I mess up?',
    answer:
      'Everyone does, constantly, including advanced dancers. The etiquette is simple: smile, reset, keep dancing. Stopping to apologize or over-explain disrupts your partner more than the mistake did.',
  },
  {
    question: 'How do I ask someone to dance?',
    answer:
      "A simple, direct invitation works: eye contact, a smile, an offered hand, \"Would you like to dance?\" If they decline, thank them and move on. It's not a comment on the dance.",
  },
];

export const styleSystems: FaqItem[] = [
  {
    question: 'What is American Style?',
    answer:
      "The style system most common at US studios and USA Dance events, split into American Smooth (Waltz, Tango, Foxtrot, Viennese Waltz, which allows open and separated figures) and American Rhythm (Cha Cha, Rumba, Swing, Bolero, Mambo). It tends to be more flexible and improvisation-friendly than International Style.",
  },
  {
    question: 'What is International Style?',
    answer:
      "The style system used worldwide in DanceSport competition, split into International Standard (Waltz, Tango, Foxtrot, Quickstep, Viennese Waltz, always in closed hold) and International Latin (Cha Cha, Samba, Rumba, Paso Doble, Jive). It's more rigid in structure, which many beginners find easier to drill.",
  },
  {
    question: 'Do I have to pick one?',
    answer:
      "No. Most studios teach American Style first since it is more common in the US social scene, but plenty of dancers learn figures from both. The underlying rhythm, frame, and musicality skills transfer either way.",
  },
];

export const studioTypes: FaqItem[] = [
  {
    question: 'Chain studios (e.g. Arthur Murray, Fred Astaire)',
    answer:
      'Franchise studios with a standardized curriculum, in-house syllabus, and structured pricing packages, often bundling group classes, private lessons, and studio parties. A predictable, guided on-ramp, though private lesson packages can get expensive quickly.',
  },
  {
    question: 'Independent studios',
    answer:
      'Owner-operated studios with more variation in teaching style, pricing, and curriculum. Often cheaper per lesson and more flexible, but quality and structure vary more. Worth trying a class before committing to a package.',
  },
  {
    question: 'Community / university programs',
    answer:
      'Parks-and-rec departments, dance clubs, and collegiate ballroom teams often run low-cost group lessons. Usually the cheapest entry point, with less individual attention than private lessons.',
  },
];

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const glossary: GlossaryTerm[] = [
  { term: 'Frame', definition: "The connected shape formed by a couple's arms and upper body: how lead and follow communicate movement without words." },
  { term: 'Lead / Follow', definition: 'The two roles in a partnered dance. The lead initiates and signals movement; the follow interprets and responds. Either role can be danced by anyone.' },
  { term: 'Closed hold', definition: 'A dance position where partners face each other with the lead\'s right hand on the follow\'s back and hands joined. Used in Waltz, Tango, Foxtrot.' },
  { term: 'Open hold', definition: 'A looser position, often just one or both hands joined, giving room for turns and separations. Common in Latin and social dances.' },
  { term: 'Rise and fall', definition: 'The gentle rising onto the toes and lowering through the knees that gives Waltz and Foxtrot their smooth, wave-like quality.' },
  { term: 'Cuban motion', definition: 'The natural hip movement created by bending and straightening the knees on alternating steps. The foundation of Rumba, Cha Cha, and Salsa styling.' },
  { term: 'Slow / Quick', definition: 'How ballroom counts timing relative to the beat. A "slow" takes two beats, a "quick" takes one. Foxtrot\'s basic rhythm is Slow-Quick-Quick.' },
  { term: 'Line of dance', definition: 'The counter-clockwise traffic pattern that traveling dances follow around a social dance floor.' },
  { term: 'Spot turn', definition: 'A turn completed in place, used in Latin and swing dances, where the dancer "spots" a fixed point to avoid dizziness.' },
  { term: 'Syllabus / Bronze, Silver, Gold', definition: 'The standard skill levels used by American-style ballroom programs. Bronze covers foundational figures, Silver and Gold add complexity and styling.' },
];
