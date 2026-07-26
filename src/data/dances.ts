export type AmericanCategory = 'Smooth' | 'Rhythm';
export type InternationalCategory = 'Standard' | 'Latin';
export type Difficulty = 'Easy' | 'Moderate' | 'Challenging';

export interface SyllabusLink {
  label: string;
  url: string;
}

export interface Dance {
  id: string;
  name: string;
  /** Present if this dance belongs to the American Style syllabus */
  americanCategory?: AmericanCategory;
  /** Present if this dance belongs to the International Style syllabus */
  internationalCategory?: InternationalCategory;
  /** Common outside the competitive syllabi, at social dances and clubs */
  social: boolean;
  difficulty: Difficulty;
  origin: string;
  era: string;
  timeSignature: string;
  tempo: string;
  description: string;
  characteristics: string[];
  /**
   * Bronze-level figure NAMES only — never step-by-step technique or foot
   * diagrams. See CLAUDE.md copyright rules: names/lists are fine to host,
   * full syllabus text belongs to the issuing organization.
   */
  bronzeFigures: string[];
  /** Link out to the organization's own syllabus material — never rehosted */
  officialSyllabus: SyllabusLink[];
  funFact: string;
  videoId: string;
  videoTitle: string;
  /** True for clips from the author's own YouTube channel, false for third-party tutorials */
  videoIsOwn: boolean;
  /** Shorts from the author's channel are vertical; third-party tutorials are horizontal */
  videoOrientation: 'horizontal' | 'vertical';
  /** Quiz-matching traits, each 1 (low) to 5 (high) */
  traits: {
    energy: number;
    holdCloseness: number;
    pace: number;
    playfulness: number;
    elegance: number;
  };
  moodTags: string[];
}

const danceVisionSmooth: SyllabusLink = {
  label: 'Dance Vision — American Smooth Bronze Syllabus',
  url: 'https://shop.dancevision.com/products/american-smooth-bronze-syllabus-manual',
};
const danceVisionRhythm: SyllabusLink = {
  label: 'Dance Vision — American Rhythm Bronze Syllabus',
  url: 'https://shop.dancevision.com/products/american-rhythm-bronze-syllabus-manual',
};
const ndcaApproved: SyllabusLink = {
  label: 'NDCA — Approved Figures, Elements & Restrictions',
  url: 'https://www.ndca.org/pdf/2023%20January%20-%205%20-%20NDCA%20APPROVED%20JAN%202023.pdf',
};

export const dances: Dance[] = [
  {
    id: 'waltz',
    name: 'Waltz',
    americanCategory: 'Smooth',
    internationalCategory: 'Standard',
    social: false,
    difficulty: 'Easy',
    origin: 'Austria/Germany, late 18th century',
    era: 'c. 1780s',
    timeSignature: '3/4',
    tempo: '84-90 bpm',
    description:
      "The Waltz is the dance most people picture when they hear 'ballroom.' Smooth, rising-and-falling box steps carry couples around the floor in gentle turns. Its slow, steady 3/4 rhythm makes it one of the most forgiving dances for absolute beginners to pick up.",
    characteristics: ['Rise and fall', 'Smooth continuous motion', 'Closed hold', 'Box step foundation'],
    bronzeFigures: ['Box Step', 'Natural Turn', 'Reverse Turn', 'Whisk', 'Progressive Chasse'],
    officialSyllabus: [danceVisionSmooth, ndcaApproved],
    funFact: 'The Waltz was considered scandalous in the 1800s because it was the first dance where couples held each other in a closed embrace.',
    videoId: 'HCch-zPc_BY',
    videoTitle: 'How to Waltz Dance for Beginners — The Box Step',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 2, holdCloseness: 4, pace: 2, playfulness: 1, elegance: 5 },
    moodTags: ['Romantic', 'Classic', 'Calm'],
  },
  {
    id: 'tango',
    name: 'Tango',
    americanCategory: 'Smooth',
    internationalCategory: 'Standard',
    social: false,
    difficulty: 'Moderate',
    origin: 'Argentina/Uruguay, adapted for ballroom in Europe',
    era: 'c. 1880s (ballroom form c. 1920s)',
    timeSignature: '2/4',
    tempo: '30-33 bars/min',
    description:
      'Sharp, staccato movements and dramatic pauses define the ballroom Tango. Unlike the smooth glide of Waltz, Tango is danced with a proud, deliberate walk and quick head snaps, giving it an intense, theatrical character.',
    characteristics: ['Staccato action', 'No rise and fall', 'Dramatic pauses', 'Close, contained hold'],
    bronzeFigures: ['Walk', 'Progressive Side Step', 'Rock Turn', 'Corte', 'Open Reverse Turn'],
    officialSyllabus: [danceVisionSmooth, ndcaApproved],
    funFact: "Ballroom (International) Tango is a distinct style from Argentine Tango — it was formalized in England in the 1920s with its own technique.",
    videoId: 'PvTkG-Xjc9U',
    videoTitle: 'Basic Tango for Beginners — Ballroom Dance Workshop',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 4, holdCloseness: 5, pace: 3, playfulness: 1, elegance: 4 },
    moodTags: ['Dramatic', 'Intense', 'Sultry'],
  },
  {
    id: 'viennese-waltz',
    name: 'Viennese Waltz',
    americanCategory: 'Smooth',
    internationalCategory: 'Standard',
    social: false,
    difficulty: 'Challenging',
    origin: 'Austria, late 18th century',
    era: 'c. 1780s',
    timeSignature: '3/4',
    tempo: '174-180 bpm',
    description:
      "The faster, older cousin of the Waltz. Couples rotate continuously around the floor at high speed with very few figures beyond turns, so most of the challenge is building the stamina and spatial awareness to keep spinning smoothly.",
    characteristics: ['Continuous rotation', 'Fast tempo', 'Minimal figures', 'Outward spotting'],
    bronzeFigures: ['Forward Box', 'Backward Box', 'Natural Turn', 'Reverse Turn', 'Change Step'],
    officialSyllabus: [danceVisionSmooth, ndcaApproved],
    funFact: 'It predates the slower "English" Waltz by decades and was the original ballroom waltz — the slower version was created later to make waltzing more accessible.',
    videoId: 'n4E5eggBwUg',
    videoTitle: 'Crash Course: Viennese Waltz Basics for Beginners',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 4, holdCloseness: 4, pace: 5, playfulness: 1, elegance: 5 },
    moodTags: ['Fast-paced', 'Elegant', 'Classic'],
  },
  {
    id: 'foxtrot',
    name: 'Foxtrot',
    americanCategory: 'Smooth',
    internationalCategory: 'Standard',
    social: false,
    difficulty: 'Moderate',
    origin: 'United States',
    era: 'c. 1914',
    timeSignature: '4/4',
    tempo: '28-30 bars/min',
    description:
      "Smooth, walking steps blended with slow-quick-quick timing make Foxtrot the dance most directly descended from social ballroom walking. It's prized for how naturally it fits big-band and modern pop music alike.",
    characteristics: ['Slow-quick-quick rhythm', 'Smooth walking action', 'Long, gliding steps'],
    bronzeFigures: ['Basic Step', 'Box Step', 'Feather Step', 'Three Step', 'Left Turn'],
    officialSyllabus: [danceVisionSmooth, ndcaApproved],
    funFact: "Foxtrot is named after its creator, vaudeville performer Harry Fox, not the animal.",
    videoId: 'bi006WcCsaQ',
    videoTitle: 'Beginner Social Foxtrot — Basic Step Ballroom Dance Lesson',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 3, holdCloseness: 4, pace: 3, playfulness: 2, elegance: 4 },
    moodTags: ['Smooth', 'Versatile', 'Classic'],
  },
  {
    id: 'quickstep',
    name: 'Quickstep',
    internationalCategory: 'Standard',
    social: false,
    difficulty: 'Challenging',
    origin: 'United Kingdom, evolved from fast Foxtrot and Charleston',
    era: 'c. 1920s',
    timeSignature: '4/4',
    tempo: '48-52 bars/min',
    description:
      "A fast, bouncy relative of Foxtrot built for the syncopated jazz of the 1920s. Quickstep mixes quick walks, chasses, and hops, and is widely considered the most physically demanding Standard dance because of its speed and constant lightness on the feet.",
    characteristics: ['Fast chasse action', 'Light, bouncy footwork', 'Syncopated timing', 'High travel around the floor'],
    bronzeFigures: ['Quarter Turns', 'Progressive Chasse', 'Natural Turn', 'Natural Spin Turn', 'Lock Step'],
    officialSyllabus: [ndcaApproved],
    funFact: "Quickstep was created in the 1920s specifically because Foxtrot's tempo couldn't keep up with the fast jazz music of the era — dancers needed something quicker.",
    videoId: '5y7XQ3_3iK4',
    videoTitle: 'Basic Quickstep for Beginners — Natural Turn and Chasse',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 5, holdCloseness: 4, pace: 5, playfulness: 2, elegance: 4 },
    moodTags: ['Fast-paced', 'High-energy', 'Classic'],
  },
  {
    id: 'cha-cha',
    name: 'Cha Cha',
    americanCategory: 'Rhythm',
    internationalCategory: 'Latin',
    social: true,
    difficulty: 'Moderate',
    origin: 'Cuba',
    era: 'c. 1950s',
    timeSignature: '4/4',
    tempo: '30-32 bars/min',
    description:
      "Playful hip action and the signature 'cha-cha-cha' triple step make this one of the most fun Latin dances to learn. Sharp, staccato movement stays low to the ground with lots of energetic hip motion.",
    characteristics: ['Triple step (cha-cha-cha)', 'Sharp hip action', 'Staccato timing', 'Playful styling'],
    bronzeFigures: ['Basic Movement', 'New Yorker', 'Hand to Hand', 'Underarm Turn', 'Cross Body Lead'],
    officialSyllabus: [danceVisionRhythm, ndcaApproved],
    funFact: "The name comes from the shuffling sound dancers' feet made on the floor during the triple step at Havana dance halls.",
    videoId: 'DVP_jQWFt4U',
    videoTitle: 'The Way I Are — Timbaland ft. Keri Hilson (Cha Cha)',
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 4, holdCloseness: 2, pace: 3, playfulness: 5, elegance: 2 },
    moodTags: ['Fun', 'Flirty', 'Upbeat'],
  },
  {
    id: 'rumba',
    name: 'Rumba',
    americanCategory: 'Rhythm',
    internationalCategory: 'Latin',
    social: true,
    difficulty: 'Moderate',
    origin: 'Cuba',
    era: 'c. 1930s',
    timeSignature: '4/4',
    tempo: '25-27 bars/min',
    description:
      "Known as the 'dance of love,' Rumba is slow and sensual, built around deliberate hip movement (Cuban motion) rather than fast footwork. It's a favorite first Latin dance because the tempo gives beginners time to think.",
    characteristics: ['Cuban hip motion', 'Slow, sensual tempo', 'Box-step foundation', 'Strong connection'],
    bronzeFigures: ['Basic Movement', 'New Yorker', 'Underarm Turn', 'Fan', 'Hockey Stick'],
    officialSyllabus: [danceVisionRhythm, ndcaApproved],
    funFact: 'Rumba shares its basic box-step pattern with Cha Cha and Salsa, so learning one makes the others much easier.',
    videoId: 'HF03lxtDiHA',
    videoTitle: 'Hey Sailaa — Abhaya & The Steam Engines (Rumba)',
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 2, holdCloseness: 4, pace: 2, playfulness: 2, elegance: 4 },
    moodTags: ['Romantic', 'Sensual', 'Calm'],
  },
  {
    id: 'samba',
    name: 'Samba',
    internationalCategory: 'Latin',
    social: true,
    difficulty: 'Challenging',
    origin: 'Brazil',
    era: 'c. 1920s-1930s',
    timeSignature: '2/4',
    tempo: '50-52 bars/min',
    description:
      "Rooted in Brazilian Carnival, Samba is bouncy and rhythmic, driven by a distinctive 'samba bounce' knee action. It's high-energy and infectious, though the bounce timing takes real practice to feel natural.",
    characteristics: ['Samba bounce action', 'Rhythmic hip rolls', 'Fast, syncopated timing'],
    bronzeFigures: ['Basic Movement', 'Whisks', 'Samba Locks', 'Botafogos', 'Voltas'],
    officialSyllabus: [ndcaApproved],
    funFact: 'Ballroom Samba is inspired by the street Carnival dances of Rio de Janeiro, adapted into a partnered form for competition in the 1950s.',
    videoId: '0GQny2TxNvg',
    videoTitle: "Hips Don't Lie — Shakira (Samba)",
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 5, holdCloseness: 2, pace: 4, playfulness: 5, elegance: 2 },
    moodTags: ['Festive', 'High-energy', 'Fun'],
  },
  {
    id: 'jive',
    name: 'Jive',
    internationalCategory: 'Latin',
    social: false,
    difficulty: 'Challenging',
    origin: 'United States (adapted in the UK)',
    era: 'c. 1940s',
    timeSignature: '4/4',
    tempo: '42-44 bars/min',
    description:
      "A fast, bouncy swing dance built from kicks, flicks, and triple steps. Jive is technically classed as a Latin dance in competition but feels like rock-and-roll — it's energetic, upbeat, and a great cardio workout.",
    characteristics: ['Kicks and flicks', 'Triple-step swing rhythm', 'Fast tempo', 'High energy'],
    bronzeFigures: ['Basic Step', 'Fallaway Rock', 'Change of Places', 'American Spin', 'Link'],
    officialSyllabus: [ndcaApproved],
    funFact: "Jive evolved from Lindy Hop and Jitterbug brought to Europe by American soldiers in World War II.",
    videoId: '2NWMYQhewU0',
    videoTitle: 'Part Time Lover — Stevie Wonder (Jive)',
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 5, holdCloseness: 2, pace: 5, playfulness: 5, elegance: 2 },
    moodTags: ['High-energy', 'Fun', 'Upbeat'],
  },
  {
    id: 'paso-doble',
    name: 'Paso Doble',
    internationalCategory: 'Latin',
    social: false,
    difficulty: 'Challenging',
    origin: 'Spain/Southern France, inspired by the bullfight',
    era: 'c. 1930s (ballroom form)',
    timeSignature: '2/4',
    tempo: '60-62 bars/min',
    description:
      "Paso Doble is danced as theater: the lead plays a matador while the follow variously represents the cape, the bull, or the matador's shadow. Sharp, proud posture and strong, marching steps make it the most dramatic and stylized dance in the Latin syllabus.",
    characteristics: ['Matador/cape role-play', 'Strong marching steps', 'Dramatic, proud posture', 'Staccato Spanish-march music'],
    bronzeFigures: ['Sur Place (Basic Movement)', 'Chasse', 'Separation', 'The Attack', 'Twist Turn'],
    officialSyllabus: [ndcaApproved],
    funFact: "Unlike other Latin dances, Paso Doble isn't built on hip action at all — its power comes from posture, chest position, and sharp, controlled marching steps.",
    videoId: 'nDFihjVBSYs',
    videoTitle: 'Paso Doble Basic Steps for Beginners',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 4, holdCloseness: 3, pace: 3, playfulness: 1, elegance: 5 },
    moodTags: ['Dramatic', 'Intense', 'Classic'],
  },
  {
    id: 'east-coast-swing',
    name: 'East Coast Swing',
    americanCategory: 'Rhythm',
    social: true,
    difficulty: 'Easy',
    origin: 'United States',
    era: 'c. 1940s',
    timeSignature: '4/4',
    tempo: '120-180 bpm (music)',
    description:
      "A simplified, beginner-friendly form of swing dancing built on a 6-count triple-step pattern. It's easygoing, forgiving of timing mistakes, and works with almost any upbeat pop, rock, or swing music — a great first social dance.",
    characteristics: ['6-count triple step', 'Rock step', 'Flexible open hold', 'Beginner-friendly'],
    bronzeFigures: ['Basic Step', 'Underarm Turn', 'Wrap', 'Push Spin', 'Sweetheart'],
    officialSyllabus: [danceVisionRhythm],
    funFact: "East Coast Swing was created in the 1940s as a simplified, teachable version of Lindy Hop for social dancers.",
    videoId: 'DkYEa8znf0s',
    videoTitle: 'Beat It — Michael Jackson (Swing)',
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 4, holdCloseness: 2, pace: 3, playfulness: 4, elegance: 2 },
    moodTags: ['Social', 'Fun', 'Upbeat'],
  },
  {
    id: 'bolero',
    name: 'Bolero',
    americanCategory: 'Rhythm',
    social: false,
    difficulty: 'Moderate',
    origin: 'Cuba, adapted into American Rhythm from Cuban Bolero-Son',
    era: 'c. 1950s (American ballroom form)',
    timeSignature: '4/4',
    tempo: '20-24 bars/min',
    description:
      "The slowest of the American Rhythm dances, Bolero blends the romantic phrasing of Rumba with the rise-and-fall of the Smooth dances. Its unhurried tempo makes it a gentle, romantic option for beginners and a favorite 'breather' dance for competitors.",
    characteristics: ['Slow, romantic tempo', 'Rise and fall blended with Cuban motion', 'Long, sustained movements'],
    bronzeFigures: ['Basic Step', 'Underarm Turn', 'New Yorker', 'Cross Body Lead', 'Fifth Position Break'],
    officialSyllabus: [danceVisionRhythm],
    funFact: 'Bolero is exclusive to the American Rhythm syllabus — its International Latin cousin, Rumba, is danced faster and without the rise and fall.',
    videoId: 'Dt2jtq2ggHk',
    videoTitle: 'Bolero Basics — Ballroom Dance Lesson',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 2, holdCloseness: 5, pace: 1, playfulness: 1, elegance: 4 },
    moodTags: ['Romantic', 'Sensual', 'Calm'],
  },
  {
    id: 'mambo',
    name: 'Mambo',
    americanCategory: 'Rhythm',
    social: true,
    difficulty: 'Moderate',
    origin: 'Cuba, popularized in New York City',
    era: 'c. 1940s-1950s',
    timeSignature: '4/4',
    tempo: '47-50 bars/min',
    description:
      "The dance that gave rise to Salsa, Mambo is built on a sharp break on the second beat rather than the first — the signature that makes it feel like it's always slightly ahead of the music. It's energetic, syncopated, and a direct ancestor of the social Latin dances.",
    characteristics: ['Break on count 2', 'Sharp hip action', 'Syncopated Latin rhythm'],
    bronzeFigures: ['Forward & Backward Basic', 'Side Basic', 'Cross Body Lead', 'New Yorker'],
    officialSyllabus: [danceVisionRhythm],
    funFact: "Mambo's break-on-2 timing is the direct ancestor of 'On2' Salsa — dancers who learn Mambo often pick up Salsa's more advanced timing quickly.",
    videoId: 'CcDcBN-jRWg',
    videoTitle: 'Learn to Dance Ballroom Mambo — The Basic Step',
    videoIsOwn: false,
    videoOrientation: 'horizontal',
    traits: { energy: 4, holdCloseness: 3, pace: 4, playfulness: 4, elegance: 2 },
    moodTags: ['Upbeat', 'Fun', 'Social'],
  },
  {
    id: 'salsa',
    name: 'Salsa',
    social: true,
    difficulty: 'Moderate',
    origin: 'Cuba/Puerto Rico, developed in New York City',
    era: 'c. 1970s',
    timeSignature: '4/4',
    tempo: '150-250 bpm (music)',
    description:
      "One of the most popular social dances worldwide, Salsa is danced on a quick-quick-slow break step with constant hip motion and frequent turns. It's a staple of social dance nights and a great entry point into partner dancing outside the formal competitive syllabi.",
    characteristics: ['Break-step timing', 'Spins and turns', 'Cuban hip motion', 'Social, improvisational'],
    bronzeFigures: [],
    officialSyllabus: [],
    funFact: "Salsa isn't one single dance — it has distinct 'On1' and 'On2' timing styles that developed in different cities (LA and New York, respectively).",
    videoId: 'Tq8oHfesmM0',
    videoTitle: "Hips Don't Lie — Shakira, Ed Sheeran, Beéle (Salsa)",
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 4, holdCloseness: 3, pace: 4, playfulness: 4, elegance: 3 },
    moodTags: ['Social', 'Upbeat', 'Fun'],
  },
  {
    id: 'hustle',
    name: 'Hustle',
    social: true,
    difficulty: 'Moderate',
    origin: 'United States (disco-era New York City)',
    era: 'c. 1970s',
    timeSignature: '4/4',
    tempo: '~120-128 bpm (disco/pop)',
    description:
      "Born on the disco floors of 1970s New York, Hustle is a slotted partner dance built around continuous turns and a springy, syncopated basic. It's less about fixed figures and more about a shared groove — which is why it adapts so easily to modern pop and dance music decades later.",
    characteristics: ['Slotted (back-and-forth) pattern', 'Continuous turns', 'Syncopated basic', 'Works with most pop/dance music'],
    bronzeFigures: [],
    officialSyllabus: [],
    funFact: "Hustle nearly went out with disco in the early 1980s, but it never left the ballroom scene — it's still a staple at studio socials and is often taught as an easy entry into partner dancing because it works with almost any modern pop song.",
    videoId: 'qIGiqUnPTic',
    videoTitle: 'Bad Dreams — Teddy Swims (Hustle)',
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 4, holdCloseness: 3, pace: 4, playfulness: 3, elegance: 3 },
    moodTags: ['Social', 'Upbeat', 'Fun'],
  },
  {
    id: 'bachata',
    name: 'Bachata',
    social: true,
    difficulty: 'Easy',
    origin: 'Dominican Republic',
    era: 'c. 1960s',
    timeSignature: '4/4',
    tempo: '~120-130 bpm (bachata music)',
    description:
      "A romantic, close-hold social dance built on a simple four-count basic with a signature hip tap on the last beat. Bachata's popularity has spread well beyond the Dominican Republic over the last two decades, and it's one of the easiest social Latin dances for a total beginner to pick up in a single night out.",
    characteristics: ['4-count basic with hip tap', 'Close hold', 'Romantic, mid tempo', 'Improvisational'],
    bronzeFigures: [],
    officialSyllabus: [],
    funFact: "Bachata started as music of the rural, working-class Dominican Republic and was looked down on by the country's elite for decades before becoming one of the most popular social dances worldwide.",
    videoId: 'tOOYyu4rPEg',
    videoTitle: 'La Bachata — Manuel Turizo (Bachata)',
    videoIsOwn: true,
    videoOrientation: 'vertical',
    traits: { energy: 3, holdCloseness: 5, pace: 2, playfulness: 3, elegance: 3 },
    moodTags: ['Romantic', 'Social', 'Sensual'],
  },
];

export const getDanceById = (id: string) => dances.find((d) => d.id === id);

export const americanDances = (category?: AmericanCategory) =>
  dances.filter((d) => d.americanCategory && (!category || d.americanCategory === category));

export const internationalDances = (category?: InternationalCategory) =>
  dances.filter((d) => d.internationalCategory && (!category || d.internationalCategory === category));
