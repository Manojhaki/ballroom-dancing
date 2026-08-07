export interface SongPick {
  title: string;
  artist: string;
}

export interface DanceSongs {
  /** Long-standing, widely-used picks for this style */
  popular: SongPick[];
  /** More recent additions that studios and social dancers have picked up */
  latest: SongPick[];
}

/**
 * Curated by hand, not pulled from any chart or API -- these are songs commonly used for
 * each style in ballroom/social dance practice. Real songs by their real artists, but
 * "danceable" always depends on the exact recording's tempo, which varies by version and
 * remix. Cross-check against the dance's tempo range (see the Beat Trainer) before
 * building a routine around one. Some songs appear under more than one dance -- that's
 * accurate, not a mistake: a lot of Latin/social hits genuinely cross over.
 */
export const songsByDance: Record<string, DanceSongs> = {
  waltz: {
    popular: [
      { title: 'Moon River', artist: 'Henry Mancini' },
      { title: "Can't Help Falling in Love", artist: 'Elvis Presley' },
    ],
    latest: [
      { title: 'A Thousand Years', artist: 'Christina Perri' },
      { title: 'Thinking Out Loud', artist: 'Ed Sheeran' },
    ],
  },
  tango: {
    popular: [
      { title: 'La Cumparsita', artist: 'Gerardo Matos Rodríguez' },
      { title: 'Por Una Cabeza', artist: 'Carlos Gardel' },
    ],
    latest: [
      { title: 'Toxic', artist: 'Britney Spears' },
      { title: 'Bad Romance', artist: 'Lady Gaga' },
    ],
  },
  'viennese-waltz': {
    popular: [
      { title: 'The Blue Danube', artist: 'Johann Strauss II' },
      { title: 'Tales from the Vienna Woods', artist: 'Johann Strauss II' },
    ],
    latest: [],
  },
  foxtrot: {
    popular: [
      { title: 'Fly Me to the Moon', artist: 'Frank Sinatra' },
      { title: 'The Way You Look Tonight', artist: 'Frank Sinatra' },
    ],
    latest: [
      { title: 'Marry You', artist: 'Bruno Mars' },
      { title: 'Lucky', artist: 'Jason Mraz & Colbie Caillat' },
    ],
  },
  quickstep: {
    popular: [
      { title: 'Sing, Sing, Sing', artist: 'Benny Goodman' },
      { title: "Puttin' On the Ritz", artist: 'Fred Astaire' },
    ],
    latest: [
      { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
      { title: "Can't Stop the Feeling!", artist: 'Justin Timberlake' },
    ],
  },
  'cha-cha': {
    popular: [
      { title: 'Sway', artist: 'Dean Martin' },
      { title: 'Oye Como Va', artist: 'Tito Puente' },
    ],
    latest: [
      { title: 'Havana', artist: 'Camila Cabello ft. Young Thug' },
      { title: 'Danza Kuduro', artist: 'Don Omar & Lucenzo' },
    ],
  },
  rumba: {
    popular: [
      { title: 'Quizás, Quizás, Quizás', artist: 'Osvaldo Farrés' },
      { title: 'Historia de un Amor', artist: 'Carlos Eleta Almarán' },
    ],
    latest: [
      { title: "Say You Won't Let Go", artist: 'James Arthur' },
      { title: 'Perfect', artist: 'Ed Sheeran' },
    ],
  },
  samba: {
    popular: [
      { title: 'Mas Que Nada', artist: 'Sérgio Mendes' },
      { title: 'Aquarela do Brasil', artist: 'Ary Barroso' },
    ],
    latest: [
      { title: "Hips Don't Lie", artist: 'Shakira ft. Wyclef Jean' },
      { title: 'Waka Waka (This Time for Africa)', artist: 'Shakira' },
    ],
  },
  jive: {
    popular: [
      { title: 'Jailhouse Rock', artist: 'Elvis Presley' },
      { title: 'Rock Around the Clock', artist: 'Bill Haley & His Comets' },
    ],
    latest: [
      { title: 'Shut Up and Dance', artist: 'Walk the Moon' },
      { title: 'Treasure', artist: 'Bruno Mars' },
    ],
  },
  'paso-doble': {
    popular: [
      { title: 'España Cañí', artist: 'Pascual Marquina Narro' },
      { title: 'Malagueña', artist: 'Ernesto Lecuona' },
    ],
    latest: [{ title: 'Live and Let Die', artist: 'Wings' }],
  },
  'east-coast-swing': {
    popular: [
      { title: 'In the Mood', artist: 'Glenn Miller' },
      { title: "Jump, Jive an' Wail", artist: 'Louis Prima' },
    ],
    latest: [
      { title: '24K Magic', artist: 'Bruno Mars' },
      { title: 'Best Day of My Life', artist: 'American Authors' },
    ],
  },
  bolero: {
    popular: [
      { title: 'Bésame Mucho', artist: 'Consuelo Velázquez' },
      { title: 'Sabor a Mí', artist: 'Álvaro Carrillo' },
    ],
    latest: [
      { title: "Say You Won't Let Go", artist: 'James Arthur' },
      { title: 'All of Me', artist: 'John Legend' },
    ],
  },
  mambo: {
    popular: [
      { title: 'Mambo No. 5', artist: 'Pérez Prado' },
      { title: 'Ran Kan Kan', artist: 'Tito Puente' },
    ],
    latest: [
      { title: 'Suavemente', artist: 'Elvis Crespo' },
      { title: 'Danza Kuduro', artist: 'Don Omar & Lucenzo' },
    ],
  },
  salsa: {
    popular: [
      { title: 'El Cantante', artist: 'Héctor Lavoe' },
      { title: 'Oye Como Va', artist: 'Tito Puente' },
    ],
    latest: [
      { title: 'Vivir Mi Vida', artist: 'Marc Anthony' },
      { title: 'Bailando', artist: 'Enrique Iglesias ft. Descemer Bueno & Gente de Zona' },
    ],
  },
  hustle: {
    popular: [
      { title: 'Stayin’ Alive', artist: 'Bee Gees' },
      { title: 'I Will Survive', artist: 'Gloria Gaynor' },
    ],
    latest: [
      { title: 'Levitating', artist: 'Dua Lipa' },
      { title: 'Bad Dreams', artist: 'Teddy Swims' },
    ],
  },
  bachata: {
    popular: [
      { title: 'Obsesión', artist: 'Aventura' },
      { title: 'Bachata Rosa', artist: 'Juan Luis Guerra' },
    ],
    latest: [
      { title: 'Propuesta Indecente', artist: 'Romeo Santos' },
      { title: 'La Bachata', artist: 'Manuel Turizo' },
    ],
  },
};

export function spotifySearchUrl(song: SongPick): string {
  return `https://open.spotify.com/search/${encodeURIComponent(`${song.title} ${song.artist}`)}`;
}

export function youtubeSearchUrl(song: SongPick): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.title} ${song.artist}`)}`;
}
