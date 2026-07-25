import { Link } from 'react-router-dom';
import { internationalDances, type InternationalCategory } from '../data/dances';
import { RevealGrid, RevealItem } from '../components/RevealGrid';

const sections: { category: InternationalCategory; blurb: string }[] = [
  {
    category: 'Standard',
    blurb:
      'Waltz, Tango, Foxtrot, Quickstep, and Viennese Waltz — always danced in closed hold, with more rigid technique than American Smooth. The system used worldwide in DanceSport competition.',
  },
  {
    category: 'Latin',
    blurb:
      'Cha Cha, Samba, Rumba, Paso Doble, and Jive — sharper and more codified than American Rhythm, with distinct technique for each dance.',
  },
];

export default function International() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-gold-600">Style system</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-maroon-900 sm:text-4xl">
        International Style
      </h1>
      <p className="mt-3 max-w-2xl text-maroon-700/85">
        The style system used in competitive DanceSport worldwide: split into Standard (always
        closed hold) and Latin, each with its own Bronze-through-Gold syllabus.
      </p>

      {sections.map((section) => {
        const list = internationalDances(section.category);
        return (
          <section key={section.category} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-maroon-900">
              International {section.category}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-maroon-700/80">{section.blurb}</p>
            <RevealGrid className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {list.map((d) => (
                <RevealItem key={d.id}>
                  <Link
                    to={`/dance/${d.id}`}
                    className="flex h-full flex-col rounded-2xl border border-maroon-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <span className="font-display text-lg font-semibold text-maroon-900">{d.name}</span>
                    <span className="mt-1 text-xs font-medium text-gold-600">{d.difficulty}</span>
                    <p className="mt-2 text-sm text-maroon-700/80 line-clamp-3">{d.description}</p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGrid>
          </section>
        );
      })}
    </div>
  );
}
