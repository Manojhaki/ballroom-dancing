export type Category = 'Standard' | 'Latin' | 'Social';
export type Difficulty = 'Easy' | 'Moderate' | 'Challenging';

export interface Dance {
  id: string;
  name: string;
  category: Category;
  difficulty: Difficulty;
  origin: string;
  era: string;
  timeSignature: string;
  tempo: string;
  description: string;
  characteristics: string[];
  funFact: string;
  videoId: string;
  videoTitle: string;
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

export const dances: Dance[] = [
  {
    id: 'waltz',
    name: 'Waltz',
    category: 'Standard',
    difficulty: 'Easy',
    origin: 'Austria/Germany, late 18th century',
    era: 'c. 1780s',
    timeSignature: '3/4',
    tempo: '84-90 bpm',
    description:
      "The Waltz is the dance most people picture when they hear 'ballroom.' Smooth, rising-and-falling box steps carry couples around the floor in gentle turns. Its slow, steady 3/4 rhythm makes it one of the most forgiving dances for absolute beginners to pick up.",
    characteristics: ['Rise and fall', 'Smooth continuous motion', 'Closed hold', 'Box step foundation'],
    funFact: 'The Waltz was considered scandalous in the 1800s because it was the first dance where couples held each other in a closed embrace.',
    videoId: 'HCch-zPc_BY',
    videoTitle: 'How to Waltz Dance for Beginners — The Box Step',
    traits: { energy: 2, holdCloseness: 4, pace: 2, playfulness: 1, elegance: 5 },
    moodTags: ['Romantic', 'Classic', 'Calm'],
  },
  {
    id: 'tango',
    name: 'Tango',
    category: 'Standard',
    difficulty: 'Moderate',
    origin: 'Argentina/Uruguay, adapted for ballroom in Europe',
    era: 'c. 1880s (ballroom form c. 1920s)',
    timeSignature: '2/4',
    tempo: '30-33 bars/min',
    description:
      'Sharp, staccato movements and dramatic pauses define the ballroom Tango. Unlike the smooth glide of Waltz, Tango is danced with a proud, deliberate walk and quick head snaps, giving it an intense, theatrical character.',
    characteristics: ['Staccato action', 'No rise and fall', 'Dramatic pauses', 'Close, contained hold'],
    funFact: "Ballroom (International) Tango is a distinct style from Argentine Tango — it was formalized in England in the 1920s with its own technique.",
    videoId: 'PvTkG-Xjc9U',
    videoTitle: 'Basic Tango for Beginners — Ballroom Dance Workshop',
    traits: { energy: 4, holdCloseness: 5, pace: 3, playfulness: 1, elegance: 4 },
    moodTags: ['Dramatic', 'Intense', 'Sultry'],
  },
  {
    id: 'viennese-waltz',
    name: 'Viennese Waltz',
    category: 'Standard',
    difficulty: 'Challenging',
    origin: 'Austria, late 18th century',
    era: 'c. 1780s',
    timeSignature: '3/4',
    tempo: '174-180 bpm',
    description:
      "The faster, older cousin of the Waltz. Couples rotate continuously around the floor at high speed with very few figures beyond turns, so most of the challenge is building the stamina and spatial awareness to keep spinning smoothly.",
    characteristics: ['Continuous rotation', 'Fast tempo', 'Minimal figures', 'Outward spotting'],
    funFact: 'It predates the slower "English" Waltz by decades and was the original ballroom waltz — the slower version was created later to make waltzing more accessible.',
    videoId: 'n4E5eggBwUg',
    videoTitle: 'Crash Course: Viennese Waltz Basics for Beginners',
    traits: { energy: 4, holdCloseness: 4, pace: 5, playfulness: 1, elegance: 5 },
    moodTags: ['Fast-paced', 'Elegant', 'Classic'],
  },
  {
    id: 'foxtrot',
    name: 'Foxtrot',
    category: 'Standard',
    difficulty: 'Moderate',
    origin: 'United States',
    era: 'c. 1914',
    timeSignature: '4/4',
    tempo: '28-30 bars/min',
    description:
      "Smooth, walking steps blended with slow-quick-quick timing make Foxtrot the dance most directly descended from social ballroom walking. It's prized for how naturally it fits big-band and modern pop music alike.",
    characteristics: ['Slow-quick-quick rhythm', 'Smooth walking action', 'Long, gliding steps'],
    funFact: "Foxtrot is named after its creator, vaudeville performer Harry Fox, not the animal.",
    videoId: 'bi006WcCsaQ',
    videoTitle: 'Beginner Social Foxtrot — Basic Step Ballroom Dance Lesson',
    traits: { energy: 3, holdCloseness: 4, pace: 3, playfulness: 2, elegance: 4 },
    moodTags: ['Smooth', 'Versatile', 'Classic'],
  },
  {
    id: 'cha-cha',
    name: 'Cha Cha',
    category: 'Latin',
    difficulty: 'Moderate',
    origin: 'Cuba',
    era: 'c. 1950s',
    timeSignature: '4/4',
    tempo: '30-32 bars/min',
    description:
      "Playful hip action and the signature 'cha-cha-cha' triple step make this one of the most fun Latin dances to learn. Sharp, staccato movement stays low to the ground with lots of energetic hip motion.",
    characteristics: ['Triple step (cha-cha-cha)', 'Sharp hip action', 'Staccato timing', 'Playful styling'],
    funFact: "The name comes from the shuffling sound dancers' feet made on the floor during the triple step at Havana dance halls.",
    videoId: 'LynE6RZhLkA',
    videoTitle: 'Learn the Cha Cha Cha Basic Steps',
    traits: { energy: 4, holdCloseness: 2, pace: 3, playfulness: 5, elegance: 2 },
    moodTags: ['Fun', 'Flirty', 'Upbeat'],
  },
  {
    id: 'rumba',
    name: 'Rumba',
    category: 'Latin',
    difficulty: 'Moderate',
    origin: 'Cuba',
    era: 'c. 1930s',
    timeSignature: '4/4',
    tempo: '25-27 bars/min',
    description:
      "Known as the 'dance of love,' Rumba is slow and sensual, built around deliberate hip movement (Cuban motion) rather than fast footwork. It's a favorite first Latin dance because the tempo gives beginners time to think.",
    characteristics: ['Cuban hip motion', 'Slow, sensual tempo', 'Box-step foundation', 'Strong connection'],
    funFact: 'Rumba shares its basic box-step pattern with Cha Cha and Salsa, so learning one makes the others much easier.',
    videoId: 'c85YThZEW6Y',
    videoTitle: 'How to Do a Rumba Box Step',
    traits: { energy: 2, holdCloseness: 4, pace: 2, playfulness: 2, elegance: 4 },
    moodTags: ['Romantic', 'Sensual', 'Calm'],
  },
  {
    id: 'samba',
    name: 'Samba',
    category: 'Latin',
    difficulty: 'Challenging',
    origin: 'Brazil',
    era: 'c. 1920s-1930s',
    timeSignature: '2/4',
    tempo: '50-52 bars/min',
    description:
      "Rooted in Brazilian Carnival, Samba is bouncy and rhythmic, driven by a distinctive 'samba bounce' knee action. It's high-energy and infectious, though the bounce timing takes real practice to feel natural.",
    characteristics: ['Samba bounce action', 'Rhythmic hip rolls', 'Fast, syncopated timing'],
    funFact: 'Ballroom Samba is inspired by the street Carnival dances of Rio de Janeiro, adapted into a partnered form for competition in the 1950s.',
    videoId: 'xTNu0Iyazbs',
    videoTitle: 'Learn Basic Samba Steps',
    traits: { energy: 5, holdCloseness: 2, pace: 4, playfulness: 5, elegance: 2 },
    moodTags: ['Festive', 'High-energy', 'Fun'],
  },
  {
    id: 'jive',
    name: 'Jive',
    category: 'Latin',
    difficulty: 'Challenging',
    origin: 'United States (adapted in the UK)',
    era: 'c. 1940s',
    timeSignature: '4/4',
    tempo: '42-44 bars/min',
    description:
      "A fast, bouncy swing dance built from kicks, flicks, and triple steps. Jive is technically classed as a Latin dance in competition but feels like rock-and-roll — it's energetic, upbeat, and a great cardio workout.",
    characteristics: ['Kicks and flicks', 'Triple-step swing rhythm', 'Fast tempo', 'High energy'],
    funFact: "Jive evolved from Lindy Hop and Jitterbug brought to Europe by American soldiers in World War II.",
    videoId: 'LMilE769YY8',
    videoTitle: 'How to Do Basic Jive Steps',
    traits: { energy: 5, holdCloseness: 2, pace: 5, playfulness: 5, elegance: 2 },
    moodTags: ['High-energy', 'Fun', 'Upbeat'],
  },
  {
    id: 'salsa',
    name: 'Salsa',
    category: 'Social',
    difficulty: 'Moderate',
    origin: 'Cuba/Puerto Rico, developed in New York City',
    era: 'c. 1970s',
    timeSignature: '4/4',
    tempo: '150-250 bpm (music)',
    description:
      "One of the most popular social dances worldwide, Salsa is danced on a quick-quick-slow break step with constant hip motion and frequent turns. It's a staple of social dance nights and a great entry point into partner dancing outside formal ballroom.",
    characteristics: ['Break-step timing', 'Spins and turns', 'Cuban hip motion', 'Social, improvisational'],
    funFact: "Salsa isn't one single dance — it has distinct 'On1' and 'On2' timing styles that developed in different cities (LA and New York, respectively).",
    videoId: '7XgmAPCX85A',
    videoTitle: 'Salsa Dancing: Basic Steps for Beginners',
    traits: { energy: 4, holdCloseness: 3, pace: 4, playfulness: 4, elegance: 3 },
    moodTags: ['Social', 'Upbeat', 'Fun'],
  },
  {
    id: 'east-coast-swing',
    name: 'East Coast Swing',
    category: 'Social',
    difficulty: 'Easy',
    origin: 'United States',
    era: 'c. 1940s',
    timeSignature: '4/4',
    tempo: '120-180 bpm (music)',
    description:
      "A simplified, beginner-friendly form of swing dancing built on a 6-count triple-step pattern. It's easygoing, forgiving of timing mistakes, and works with almost any upbeat pop, rock, or swing music — a great first social dance.",
    characteristics: ['6-count triple step', 'Rock step', 'Flexible open hold', 'Beginner-friendly'],
    funFact: "East Coast Swing was created in the 1940s as a simplified, teachable version of Lindy Hop for social dancers.",
    videoId: 'jkI-b5qrgis',
    videoTitle: 'East Coast Swing Basic Steps for Beginners',
    traits: { energy: 4, holdCloseness: 2, pace: 3, playfulness: 4, elegance: 2 },
    moodTags: ['Social', 'Fun', 'Upbeat'],
  },
];

export const getDanceById = (id: string) => dances.find((d) => d.id === id);

export const categories: Category[] = ['Standard', 'Latin', 'Social'];
