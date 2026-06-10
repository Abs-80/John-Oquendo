import { useState } from 'react';
import { Artwork } from '../types';
import { Search, SlidersHorizontal, Image, Eye, Compass, Calendar, MoveUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArtworkGridProps {
  artworks: Artwork[];
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectVisualizer: (artwork: Artwork) => void;
}

export default function ArtworkGrid({ artworks, onSelectArtwork, onSelectVisualizer }: ArtworkGridProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'abstract' | 'photography'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'abstract', label: 'Abstract Series' },
    { id: 'photography', label: 'NY Nocturnes & Photography' },
  ] as const;

  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.medium.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.year.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Editorial Hero Statement / Introduction */}
      <section className="border-b border-[#1C1C1C]/10 pb-12 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-500 block">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#1C1C1C] leading-[1.1] font-light max-w-4xl">
              Constructing silent rhythms through pigment & lens.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="font-sans text-xs tracking-widest uppercase text-neutral-500 mb-2">
              Viewing
            </p>
            <div className="font-serif text-xl italic text-neutral-800">
              {filteredArtworks.length} of {artworks.length} Works
            </div>
          </div>
        </div>
      </section>

      {/* Modern Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2 border-b border-[#1C1C1C]/5">
        {/* Category toggles */}
        <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors duration-300 font-sans whitespace-nowrap text-[11px] rounded-sm ${
                  isActive
                    ? 'bg-[#1C1C1C] text-[#FAF9F6] font-medium'
                    : 'text-neutral-500 hover:text-[#1C1C1C] hover:bg-neutral-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by title, medium, year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-neutral-300 bg-white/70 focus:bg-white text-xs text-[#1C1C1C] font-mono tracking-wider placeholder-neutral-400 focus:outline-none focus:border-[#1C1C1C] transition-all rounded-sm"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      {filteredArtworks.length === 0 ? (
        <div className="py-24 text-center border border-dashed border-neutral-200 rounded-sm">
          <p className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
            No works match this selection or filter criteria.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 font-sans text-xs underline uppercase tracking-widest text-[#1C1C1C]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Organic Editorial Style Columns Masonry layout */
        <div className="columns-1 md:columns-2 xl:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((art) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group bg-white border border-[#1C1C1C]/5 overflow-hidden flex flex-col p-4 shadow-sm hover:shadow-md transition-shadow duration-500 mb-8"
              >
                {/* Artwork Canvas/Frame Container */}
                <div 
                  className="relative overflow-hidden cursor-zoom-in bg-[#f4f2ee]"
                  onClick={() => onSelectArtwork(art)}
                >
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover grayscale-0 group-hover:grayscale-[25%] transition-all duration-700 ease-out transform group-hover:scale-[1.03]"
                  />
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-[#1C1C1C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="bg-white/94 backdrop-blur-md px-4 py-2.5 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-lg rounded-sm">
                      <Eye size={13} className="text-neutral-800" />
                      <span className="font-sans text-[10px] uppercase font-semibold text-neutral-800 tracking-widest">
                        Inspect Details
                      </span>
                    </div>
                  </div>
                  {/* Featured badge if applicable */}
                  {art.featured && (
                    <span className="absolute top-3 left-3 bg-[#FAF9F6]/90 backdrop-blur-sm border border-[#1C1C1C]/10 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-[#1C1C1C]">
                      Studio Featured
                    </span>
                  )}
                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 bg-neutral-900/80 text-white px-2 py-1 font-mono text-[8px] uppercase tracking-widest">
                    {art.category}
                  </span>
                </div>

                {/* Caption / Information Block */}
                <div className="pt-4 pb-2 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-lg text-[#1C1C1C] hover:text-amber-800 transition-colors cursor-pointer" onClick={() => onSelectArtwork(art)}>
                        {art.title}
                      </h3>
                      <span className="font-mono text-xs text-neutral-500 whitespace-nowrap">
                        {art.year}
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-neutral-500 tracking-wider mt-1 uppercase">
                      {art.medium}
                    </p>
                    <p className="font-sans text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                      {art.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-between border-t border-neutral-100 mt-4 pt-3">
                    <span className="font-mono text-[9px] tracking-widest text-neutral-400">
                      {art.dimensions}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onSelectVisualizer(art)}
                        className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 hover:bg-[#1C1C1C] hover:text-[#FAF9F6] text-[9.5px] uppercase tracking-wider font-sans text-neutral-700 transition-colors duration-300 rounded-sm"
                        title="Simulate this artwork on a virtual wall"
                      >
                        <Compass size={11} />
                        <span>Hang Work</span>
                      </button>
                      <button
                        onClick={() => onSelectArtwork(art)}
                        className="p-1 text-neutral-400 hover:text-neutral-800 transition-colors"
                        title="View Detailed Story"
                      >
                        <MoveUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
