import { Artwork, Inquiry } from '../types';
import { Heart, Mail, Trash2, ArrowRight, Eye, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyInquiriesProps {
  favorites: Artwork[];
  inquiries: Inquiry[];
  onRemoveFavorite: (artwork: Artwork) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectVisualizer: (artwork: Artwork) => void;
  onRemoveInquiry: (id: string) => void;
  setActiveSection: (section: string) => void;
}

export default function MyInquiries({
  favorites,
  inquiries,
  onRemoveFavorite,
  onSelectArtwork,
  onSelectVisualizer,
  onRemoveInquiry,
  setActiveSection,
}: MyInquiriesProps) {
  return (
    <div className="space-y-12 fade-in">
      {/* Intro Header */}
      <section className="border-b border-[#1C1C1C]/10 pb-8 pt-2">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-500 block">
          Personal Studio Folio
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#1C1C1C] mt-2 font-light">
          My Saved & Inquiries
        </h2>
        <p className="font-sans text-xs text-neutral-600 mt-2 max-w-2xl leading-relaxed">
          Manage your saved abstract canvases and digital print editions. View a local rolling log of your submitted acquisition requests.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* SAVED ARTWORKS PANEL (HEARTS) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Heart size={16} className="text-amber-800 fill-amber-800" />
            <h3 className="font-serif text-md font-semibold text-neutral-800 uppercase tracking-wide">
              Saved Collection ({favorites.length})
            </h3>
          </div>

          {favorites.length === 0 ? (
            <div className="bg-[#FAF9F6] border border-dashed border-neutral-200 p-8 text-center rounded-sm space-y-4">
              <p className="font-sans text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                You haven't bookmarked any works yet. Browse the collection gallery and click 'Save to Inquiry' to keep them in your curation ledger.
              </p>
              <button
                onClick={() => setActiveSection('gallery')}
                className="inline-flex items-center gap-1 font-sans text-xs font-semibold tracking-wider text-amber-800 uppercase hover:underline"
              >
                <span>Browse Gallery</span>
                <ArrowRight size={11} />
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {favorites.map((art) => (
                  <motion.div
                    key={art.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-4 p-4.5 bg-white border border-[#1C1C1C]/5 shadow-sm hover:shadow-md transition-shadow rounded-sm items-center justify-between"
                  >
                    <div className="flex gap-4 items-center overflow-hidden">
                      <img
                        src={art.imageUrl}
                        alt=""
                        className="w-14 h-14 object-cover border border-neutral-150 rounded-sm"
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-serif text-sm font-semibold text-[#1C1C1C] truncate">
                          {art.title}
                        </h4>
                        <p className="font-mono text-[9px] text-neutral-400 uppercase truncate">
                          {art.medium}
                        </p>
                        <p className="font-sans text-[10px] text-neutral-500 mt-1">
                          {art.dimensions} &bull; {art.year}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => onSelectArtwork(art)}
                        className="p-1 px-2.5 text-[9px] uppercase tracking-wider font-mono bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors flex items-center gap-1 rounded-sm"
                        title="View Details"
                      >
                        <Eye size={10} />
                        <span>Inspect</span>
                      </button>
                      <button
                        onClick={() => onSelectVisualizer(art)}
                        className="p-1 px-2.5 text-[9px] uppercase tracking-wider font-mono bg-amber-50 hover:bg-amber-100 text-amber-900 transition-colors flex items-center gap-1 rounded-sm"
                        title="View on Wall"
                      >
                        <Sparkles size={10} />
                        <span>Hang</span>
                      </button>
                      <button
                        onClick={() => onRemoveFavorite(art)}
                        className="p-1 text-neutral-400 hover:text-red-700 transition-colors ml-1"
                        title="Remove Bookmark"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* SUBMITTED INQUIRIES LIST PANEL */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <Mail size={16} className="text-[#1C1C1C]" />
            <h3 className="font-serif text-md font-semibold text-neutral-800 uppercase tracking-wide">
              Submissions Ledger ({inquiries.length})
            </h3>
          </div>

          {inquiries.length === 0 ? (
            <div className="bg-[#FAF9F6] border border-dashed border-neutral-200 p-8 text-center rounded-sm">
              <p className="font-sans text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                No active buy or detail inquiries submitted. Check out any artwork detail card and hit 'Submit Inquiry' to ask Charles for acquisition rates.
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <AnimatePresence>
                {inquiries.map((inq) => (
                  <motion.div
                    key={inq.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4.5 bg-white border border-[#1C1C1C]/5 shadow-sm rounded-sm space-y-3.5 relative"
                  >
                    <button
                      onClick={() => onRemoveInquiry(inq.id)}
                      className="absolute top-4 right-4 text-neutral-400 hover:text-red-700 transition-colors"
                      title="Clear Record Log"
                    >
                      <Trash2 size={13} />
                    </button>

                    {/* Header */}
                    <div>
                      <span className="font-mono text-[8.5px] uppercase text-neutral-400 block">
                        Acquisition Inquiry Sent
                      </span>
                      <h4 className="font-serif text-[13px] font-bold text-[#1C1C1C] pr-6 mt-0.5">
                        {inq.artworkTitle}
                      </h4>
                    </div>

                    {/* Sender metadata & Message */}
                    <div className="space-y-1.5 text-[11px] bg-[#FAF9F6] p-3 rounded-sm border border-neutral-100">
                      <div className="grid grid-cols-2 gap-1 pb-1.5 border-b border-neutral-250/50 font-mono text-[9px] text-neutral-400">
                        <span>SENDER: {inq.name}</span>
                        <span className="text-right">{inq.timestamp}</span>
                      </div>
                      <p className="font-sans text-xs text-neutral-600 italic leading-relaxed pt-0.5">
                        "{inq.message || 'No additional commentary entered.'}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
