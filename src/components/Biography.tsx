import { ARTIST_BIOGRAPHY } from '../data/artworks';
import { Calendar, Compass, Milestone, Library, BookOpen } from 'lucide-react';

export default function Biography() {
  const exhibitions = [
    { year: '1981', venue: 'Soho Loft Collective', city: 'Group Exhibition, NYC' },
    { year: '1986', venue: 'Mercer Street Galleries', city: 'New York Nocturnes (Solo), NYC' },
    { year: '1992', venue: 'Brooklyn Heights Alliance', city: 'Silver Gelatin Retrospective, NY' },
    { year: '2004', venue: 'Chelsea Fine Art Center', city: 'Abstract Geometries (Solo), NYC' },
    { year: '2015', venue: 'Metropolitan Art Foundry', city: 'Dialogue of Pigments (Group), NYC' },
    { year: '2022', venue: 'DUMBO Waterfront Gallery', city: 'Retrospective: Grid & Breath, Brooklyn' },
  ];

  return (
    <div className="space-y-12 fade-in">
      {/* Short intro banner */}
      <section className="border-b border-[#1C1C1C]/10 pb-8 pt-2">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-500 block">
          The Artist's Journey
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#1C1C1C] mt-2 font-light">
          John Oquendo
        </h2>
      </section>

      {/* Main Grid: Portrait and Words */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Elegant Studio Portrait */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative border-4 border-white shadow-xl bg-white p-2">
            <img 
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800" 
              alt="John Oquendo" 
              referrerPolicy="no-referrer"
              className="w-full h-auto grayscale filter contrast-125 object-cover"
            />
            <div className="mt-3 text-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 block">
                John Oquendo
              </span>
              <span className="font-sans text-[10.5px] italic text-neutral-600 block">
                Studio Portrait, DUMBO Workspace, 1998
              </span>
            </div>
          </div>

          {/* Core Philosophy Quote Block */}
          <div className="bg-amber-50/40 p-5 rounded-sm border border-amber-800/5 mt-6 text-center">
            <span className="text-3xl font-serif text-amber-800/30 font-bold block leading-none -mb-2">“</span>
            <p className="font-serif text-xs italic text-amber-900 leading-relaxed max-w-xs mx-auto">
              "{ARTIST_BIOGRAPHY.philosophy}"
            </p>
            <span className="text-3xl font-serif text-amber-800/30 font-bold block leading-none -mt-3.5">&bull;&bull;&bull;</span>
          </div>
        </div>

        {/* Right Side: Narrative Biography */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Biography texts */}
          <div className="space-y-6 font-sans text-xs text-neutral-700 leading-relaxed text-justify">
            {ARTIST_BIOGRAPHY.bioParagraphs.map((para, i) => (
              <p key={i} className="first-letter:font-serif first-letter:text-2xl first-letter:float-left first-letter:mr-2 first-letter:font-semibold first-letter:text-[#1C1C1C]">
                {para}
              </p>
            ))}
          </div>

          {/* Two Columns: Timeline & Quick Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-200">
            
            {/* Quick Data */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#1C1C1C] flex items-center gap-1.5 border-b border-neutral-100 pb-2">
                <Library size={12} className="text-amber-800" />
                Dossier Specs & Information
              </h4>
              <table className="w-full text-xs text-neutral-600">
                <tbody>
                  <tr className="border-b border-stone-100 py-2 block">
                    <td className="font-mono text-[10px] text-neutral-400 w-32">BORN</td>
                    <td className="font-sans font-medium text-neutral-800">1952, Brooklyn, New York</td>
                  </tr>
                  <tr className="border-b border-stone-100 py-2 block">
                    <td className="font-mono text-[10px] text-neutral-400 w-32">PRIMARY MEDIA</td>
                    <td className="font-sans font-medium text-neutral-800">Oil Painting, Gelatin Silver Prints</td>
                  </tr>
                  <tr className="border-b border-stone-100 py-2 block">
                    <td className="font-mono text-[10px] text-neutral-400 w-32">STATIONS OF WORK</td>
                    <td className="font-sans font-medium text-neutral-800">Soho (78-95), DUMBO (95-18)</td>
                  </tr>
                  <tr className="border-b border-stone-100 py-2 block">
                    <td className="font-mono text-[10px] text-neutral-400 w-32">THEORETICAL MODEL</td>
                    <td className="font-sans font-medium text-neutral-800">Abstract Expressionism, Minimalist Grid Grid</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Select CV Exhibitions list */}
            <div className="space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#1C1C1C] flex items-center gap-1.5 border-b border-neutral-100 pb-2">
                <BookOpen size={12} className="text-amber-850" />
                Exhibition Record (Select)
              </h4>
              <div className="space-y-3">
                {exhibitions.map((ex, i) => (
                  <div key={i} className="flex gap-4 items-start text-xs">
                    <span className="font-mono text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-sm">
                      {ex.year}
                    </span>
                    <div>
                      <p className="font-serif text-[12.5px] font-medium text-[#1C1C1C]">
                        {ex.venue}
                      </p>
                      <p className="font-sans text-[11px] text-neutral-500">
                        {ex.city}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
