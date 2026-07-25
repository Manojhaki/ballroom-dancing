import { Link } from 'react-router-dom';
import { americanDances, type AmericanCategory } from '../data/dances';

const sections: { category: AmericanCategory; blurb: string }[] = [
  {
    category: 'Smooth',
    blurb:
      'Waltz, Tango, Foxtrot, and Viennese Waltz — danced with more freedom than their International Standard counterparts, including open and separated figures.',
  },
  {
    category: 'Rhythm',
    blurb:
      'Cha Cha, Rumba, Swing, Bolero, and Mambo — the American take on Latin-rooted social dances, developed for US ballrooms and studios.',
  },
];

export default function American() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Style system</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        American Style
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        The style system most US studios teach first: split into Smooth (the four traveling
        dances) and Rhythm (the Latin-rooted dances), each with its own Bronze-through-Gold
        syllabus.
      </p>

      {sections.map((section) => {
        const list = americanDances(section.category);
        return (
          <section key={section.category} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-maroon-900">
              American {section.category}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-maroon-700/80">{section.blurb}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {list.map((d) => (
                <Link
                  key={d.id}
                  to={`/dance/${d.id}`}
                  className="flex flex-col rounded-2xl border border-maroon-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="font-display text-lg font-semibold text-maroon-900">{d.name}</span>
                  <span className="mt-1 text-xs font-medium text-gold-600">{d.difficulty}</span>
                  <p className="mt-2 text-sm text-maroon-700/80 line-clamp-3">{d.description}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
