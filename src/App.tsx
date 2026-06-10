import { useState, useEffect } from 'react';
import { ARTWORKS_DATA } from './data/artworks';
import { Artwork, Inquiry } from './types';

// Components
import Header from './components/Header';
import ArtworkGrid from './components/ArtworkGrid';
import InSituView from './components/InSituView';
import Biography from './components/Biography';
import Guestbook from './components/Guestbook';
import MyInquiries from './components/MyInquiries';
import ArtworkDetailModal from './components/ArtworkDetailModal';

// Icons for general decorative layout
import { Heart, Compass, Info, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('gallery');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  
  // Virtual Wall simulation artwork state
  const [visualizerArtwork, setVisualizerArtwork] = useState<Artwork | null>(null);

  // Favorites list state
  const [favorites, setFavorites] = useState<Artwork[]>([]);
  // Submitted inquiries log state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // On mount, pull saved favorites & inquiries from localStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem('oquendo_favorites');
    if (savedFavs) {
      try {
        const parsedIds = JSON.parse(savedFavs) as string[];
        const loadedFavs = ARTWORKS_DATA.filter(art => parsedIds.includes(art.id));
        setFavorites(loadedFavs);
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    }

    const savedInqs = localStorage.getItem('oquendo_inquiries');
    if (savedInqs) {
      try {
        setInquiries(JSON.parse(savedInqs));
      } catch (err) {
        console.error('Error loading inquiries:', err);
      }
    }
  }, []);

  // Sync favorites helper
  const handleToggleFavorite = (artwork: Artwork) => {
    let updated: Artwork[];
    const exists = favorites.some((f) => f.id === artwork.id);
    if (exists) {
      updated = favorites.filter((f) => f.id !== artwork.id);
    } else {
      updated = [...favorites, artwork];
    }
    setFavorites(updated);
    localStorage.setItem('oquendo_favorites', JSON.stringify(updated.map((f) => f.id)));
  };

  const handleRemoveFavorite = (artwork: Artwork) => {
    const updated = favorites.filter((f) => f.id !== artwork.id);
    setFavorites(updated);
    localStorage.setItem('oquendo_favorites', JSON.stringify(updated.map((f) => f.id)));
  };

  // Submit acquisition inquiry helper
  const handleSubmitInquiry = (inqData: Omit<Inquiry, 'id' | 'timestamp'>) => {
    const newInq: Inquiry = {
      ...inqData,
      id: `inq-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    };

    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('oquendo_inquiries', JSON.stringify(updated));

    // Also auto-heart when inquiring! Feels clean.
    const alreadyFaved = favorites.some((f) => f.id === inqData.artworkId);
    if (!alreadyFaved) {
      const artObj = ARTWORKS_DATA.find((a) => a.id === inqData.artworkId);
      if (artObj) {
        const newFavs = [...favorites, artObj];
        setFavorites(newFavs);
        localStorage.setItem('oquendo_favorites', JSON.stringify(newFavs.map((f) => f.id)));
      }
    }
  };

  const handleRemoveInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem('oquendo_inquiries', JSON.stringify(updated));
  };

  // Bridge navigation triggers: directly hang in Virtual Wall
  const handleHangInVisualizer = (artwork: Artwork) => {
    setVisualizerArtwork(artwork);
    setActiveSection('visualizer');
    // Scroll window smoothly to simulated wall top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic component switch renderer
  const renderContent = () => {
    switch (activeSection) {
      case 'gallery':
        return (
          <ArtworkGrid
            artworks={ARTWORKS_DATA}
            onSelectArtwork={setSelectedArtwork}
            onSelectVisualizer={handleHangInVisualizer}
          />
        );
      case 'visualizer':
        return (
          <InSituView
            artworks={ARTWORKS_DATA}
            initialArtwork={visualizerArtwork}
          />
        );
      case 'biography':
        return <Biography />;
      case 'guestbook':
        return <Guestbook />;
      case 'inquiries':
        return (
          <MyInquiries
            favorites={favorites}
            inquiries={inquiries}
            onRemoveFavorite={handleRemoveFavorite}
            onSelectArtwork={setSelectedArtwork}
            onSelectVisualizer={handleHangInVisualizer}
            onRemoveInquiry={handleRemoveInquiry}
            setActiveSection={setActiveSection}
          />
        );
      default:
        return (
          <ArtworkGrid
            artworks={ARTWORKS_DATA}
            onSelectArtwork={setSelectedArtwork}
            onSelectVisualizer={handleHangInVisualizer}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1C1C] flex flex-col selection:bg-amber-100 selection:text-amber-900 transition-colors duration-500">
      
      {/* Editorial top micro-ribbon */}
      <div className="bg-neutral-900 text-neutral-400 py-2 px-4 text-center border-b border-black">
        <p className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.3em]">
          Archival Online Folio &bull; Oquendo Studio &bull; NYC Soho Legacy
        </p>
      </div>

      {/* Main Sticky Header */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        inquiryCount={favorites.length + inquiries.length}
      />

      {/* Dynamic Content Panel Section */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Elegant Layout Lightbox details Modal */}
      <ArtworkDetailModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        isFavorited={favorites.some((f) => f.id === selectedArtwork?.id)}
        onToggleFavorite={handleToggleFavorite}
        onSubmitInquiry={handleSubmitInquiry}
      />

      {/* Fine-art Editorial Museum Footer */}
      <footer className="bg-[#FAF9F6] border-t border-[#1C1C1C]/10 py-12 md:py-16 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Copyright details */}
          <div className="md:col-span-6 space-y-4">
            <h4 className="font-serif text-md tracking-wider text-[#1C1C1C]">
              JOHN OQUENDO STUDIO
            </h4>
            <p className="font-sans text-xs text-neutral-500 leading-relaxed max-w-sm">
              All displayed abstract artworks, mixed media panels, and silver gelatin negatives are copyrighted material of John Oquendo. Digital adaptations created in cooperation with the Oquendo family.
            </p>
            <p className="font-mono text-[9px] tracking-widest text-neutral-400">
              EST. 1978 &bull; NEW YORK CITY &bull; ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Location & Gallery directions */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-neutral-400 block">
              Historic Studio Location
            </span>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed">
              142 Mercer Street, Loft 4B<br />
              Soho, New York 10012
            </p>
          </div>

          {/* Quick catalog links */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-neutral-400 block">
              Direct Inquiries
            </span>
            <p className="font-sans text-xs text-neutral-600 leading-relaxed">
              For collection valuations, historical press archives, or high-fidelity reproduction licensing requests, kindly select artworks of interest or sign our visitor guestbook ledger.
            </p>
          </div>
          
        </div>

        {/* Bottom copyright line */}
        <div className="max-w-7xl mx-auto border-t border-dashed border-neutral-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[11px] text-neutral-400">
            &copy; {new Date().getFullYear()} John Oquendo. Photographic Prints curated in partnership with Oquendo Studio NY.
          </p>
          <div className="flex gap-4 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400">
            <span className="hover:text-neutral-800 cursor-pointer" onClick={() => setActiveSection('gallery')}>Catalog</span>
            <span className="hover:text-neutral-800 cursor-pointer" onClick={() => setActiveSection('visualizer')}>Exhibition Wall</span>
            <span className="hover:text-neutral-800 cursor-pointer" onClick={() => setActiveSection('biography')}>Biography</span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
