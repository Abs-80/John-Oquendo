import { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { Sliders, Maximize2, RefreshCw, Compass, ArrowRight, Sofa, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface InSituViewProps {
  artworks: Artwork[];
  initialArtwork: Artwork | null;
}

interface WallColor {
  id: string;
  name: string;
  hex: string;
  textLight: boolean;
}

interface FrameStyle {
  id: string;
  name: string;
  classes: string;
  passepartout: boolean; // white mat border around photographic works
  matSize: string;
}

export default function InSituView({ artworks, initialArtwork }: InSituViewProps) {
  // Select active artwork
  const [selectedArt, setSelectedArt] = useState<Artwork>(artworks[0]);

  // Sync when initial selected artwork changes from main grid
  useEffect(() => {
    if (initialArtwork) {
      setSelectedArt(initialArtwork);
    }
  }, [initialArtwork]);

  // Wall color environmental setups
  const wallColors: WallColor[] = [
    { id: 'alabaster', name: 'Studio Cream', hex: '#F9F8F6', textLight: false },
    { id: 'slate', name: 'Gallery Charcoal', hex: '#1C1C1D', textLight: true },
    { id: 'sage', name: 'Contemporary Sage', hex: '#606C5D', textLight: true },
    { id: 'concrete', name: 'Brutalist Loft', hex: '#D2D2D2', textLight: false },
  ];
  const [activeWall, setActiveWall] = useState<WallColor>(wallColors[0]);

  // Frame Styles
  const frameStyles: FrameStyle[] = [
    { id: 'frameless', name: 'Frameless Canvas Wrap', classes: 'shadow-2xl border-0', passepartout: false, matSize: '' },
    { id: 'black', name: 'Obsidian Aluminum', classes: 'border-[16px] border-neutral-900 shadow-2xl shadow-black/30', passepartout: true, matSize: 'px-6 py-6 bg-[#FAF9F6] border border-neutral-200' },
    { id: 'oak', name: 'Natural White Oak', classes: 'border-[20px] border-[#D4C3A3] shadow-2xl shadow-black/20', passepartout: true, matSize: 'px-8 py-8 bg-[#FAF9F6] border border-neutral-150' },
    { id: 'silver', name: 'Brushed Platinum', classes: 'border-[12px] border-slate-300 shadow-2xl shadow-black/25', passepartout: false, matSize: '' },
  ];
  const [activeFrame, setActiveFrame] = useState<FrameStyle>(frameStyles[1]);

  // Mat Board toggler (for adding/removing passepartout white mat padding)
  const [useMatBorder, setUseMatBorder] = useState(true);

  // Height and scale settings
  const [artworkWidthScale, setArtworkWidthScale] = useState<number>(100); // percentage tweak
  
  // Quick scale calculation helper based on dimension strings
  const getApproximateAspectRating = (dimensions: string) => {
    // Standard size parse e.g. 24" x 36"
    const matches = dimensions.replace(/"/g, '').split(' x ');
    if (matches.length === 2 && !isNaN(Number(matches[0])) && !isNaN(Number(matches[1]))) {
      const w = Number(matches[0]);
      const h = Number(matches[1]);
      return w / h;
    }
    return 1;
  };

  const ratio = getApproximateAspectRating(selectedArt.dimensions);

  return (
    <div className="space-y-8 fade-in">
      {/* Intro Header */}
      <section className="border-b border-[#1C1C1C]/10 pb-8 pt-2">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-500 block">
          In Situ Simulation
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#1C1C1C] mt-2 font-light">
          Interactive Virtual Gallery
        </h2>
        <p className="font-sans text-xs text-neutral-600 mt-2 max-w-2xl leading-relaxed">
          Select an artwork to see it styled against different interior colors. Realistically preview physical scaling relative to an elegant gallery console/credenza and calibrate frame finishes.
        </p>
      </section>

      {/* Main split: left visual simulator, right controller */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* VIRTUAL WALL VISUALIZER COMPONENT */}
        <div className="xl:col-span-8 flex flex-col items-center">
          
          {/* Wall stage */}
          <div 
            className="w-full h-[320px] sm:h-[480px] lg:h-[520px] rounded-sm transition-colors duration-700 ease-in-out relative flex flex-col justify-end items-center overflow-hidden border border-neutral-200"
            style={{ backgroundColor: activeWall.hex }}
            id="simulated-wall-canvas"
          >
            {/* Gallery Track Lights Shadow */}
            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />
            
            {/* Artwork itself hanging on the wall */}
            <motion.div 
              key={`${selectedArt.id}-${activeFrame.id}-${useMatBorder}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute z-10 flex items-center justify-center pointer-events-none"
              style={{
                // Absolute placement scaled around center of wall
                bottom: '180px',
                width: ratio >= 1 ? 'min(44%, 320px)' : 'min(33%, 240px)',
                aspectRatio: `${ratio}`,
              }}
            >
              {/* Active frame style wrapper */}
              <div className={`w-full h-full flex flex-col ${activeFrame.classes} transition-all duration-300`}>
                
                {/* Mat box (passepartout) around image, typical for photography prints */}
                <div className={`w-full h-full flex items-center justify-center ${
                  (activeFrame.passepartout && useMatBorder) || (selectedArt.category === 'photography' && useMatBorder)
                    ? 'p-3 sm:p-5 bg-stone-50 border border-neutral-200 shadow-inner' 
                    : 'p-0'
                }`}>
                  <img
                    src={selectedArt.imageUrl}
                    alt={selectedArt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover shadow-sm bg-neutral-100"
                  />
                </div>
              </div>
            </motion.div>

            {/* Simulated Mid-Century Teak Credenza Under Artwork */}
            <div className="w-full max-w-lg h-36 flex flex-col justify-end relative z-20 pointer-events-none opacity-90 select-none pb-2">
              {/* Plant vase + floor accents standing on credenza */}
              <div className="flex justify-between px-16 w-full translate-y-1">
                {/* Visual ceramic vase and plant */}
                <div className="w-8 h-12 bg-stone-100 border border-neutral-300 rounded-b-lg relative flex flex-col justify-end items-center shadow-md">
                  {/* Plant leaves */}
                  <div className="absolute bottom-10 w-16 h-10 -left-4 flex gap-1">
                    <span className="w-3 h-8 bg-neutral-600 rounded-full rotate-[-45deg] origin-bottom opacity-70" />
                    <span className="w-2.5 h-10 bg-neutral-500 rounded-full rotate-[-10deg] origin-bottom opacity-60" />
                    <span className="w-3.5 h-9 bg-neutral-700 rounded-full rotate-[35deg] origin-bottom opacity-75" />
                  </div>
                </div>
                {/* Book stack */}
                <div className="flex flex-col justify-end items-end">
                  <div className="w-12 h-2.5 bg-neutral-800 border-b border-black rounded-sm shadow" />
                  <div className="w-14 h-3 bg-stone-200 border-b border-neutral-400 rounded-sm shadow" />
                </div>
              </div>

              {/* Main Credenza Wood box */}
              <div className="w-full h-16 bg-[#3d2a1c] border-t border-[#4a3424] rounded-t-sm shadow-xl flex items-center justify-between px-6 border-b border-[#2b1c12]">
                {/* Sliding doors lines */}
                <div className="w-1/3 h-12 border-r border-[#2b1c12] opacity-40 flex items-center justify-center">
                  <span className="w-1 h-6 bg-neutral-900/60 rounded-full" />
                </div>
                <div className="w-1/3 h-12 border-r border-[#2b1c12] opacity-40 flex items-center justify-center">
                  <span className="w-1 h-6 bg-neutral-900/60 rounded-full" />
                </div>
                <div className="w-1/3 h-12 opacity-40" />
              </div>

              {/* Credenza legs */}
              <div className="w-full flex justify-between px-16 h-10">
                <span className="w-2.5 h-full bg-[#2b1c12] skew-x-[-8deg] origin-top shadow-md" />
                <span className="w-2.5 h-full bg-[#2b1c12] skew-x-[8deg] origin-top shadow-md" />
              </div>
            </div>

            {/* Baseboard and Floor Line */}
            <div className="w-full h-8 bg-[#EAE8E4] border-t border-neutral-300 flex flex-col justify-end select-none pointer-events-none relative z-15">
              {/* Wood plank line markers */}
              <div className="w-full h-[3px] bg-neutral-200 opacity-60" />
            </div>

            {/* Active Art Title Badge on wall */}
            <div className={`absolute bottom-4 left-4 z-30 pointer-events-auto rounded-sm backdrop-blur-md px-3 py-1.5 border flex items-center gap-2 ${
              activeWall.textLight 
                ? 'bg-black/40 border-neutral-800 text-white' 
                : 'bg-white/70 border-neutral-200 text-neutral-800'
            }`}>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              <p className="font-mono text-[9px] tracking-wide">
                Virtual Hanging &bull; <span className="font-sans font-medium">{selectedArt.title}</span> ({selectedArt.dimensions})
              </p>
            </div>
          </div>

          {/* Horizontal Scroller of available Artworks */}
          <div className="w-full mt-4 bg-white border border-[#1C1C1C]/5 p-3 rounded-sm">
            <p className="font-mono text-[9.5px] uppercase tracking-wider text-neutral-400 mb-2">
              Select Piece for Wall Simulation:
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {artworks.map((art) => {
                const isSelected = selectedArt.id === art.id;
                return (
                  <button
                    key={art.id}
                    onClick={() => setSelectedArt(art)}
                    className={`flex-shrink-0 flex items-center gap-2 p-1.5 border transition-all rounded-sm ${
                      isSelected 
                        ? 'border-amber-800 bg-amber-50/40 shadow-sm' 
                        : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50'
                    }`}
                  >
                    <img 
                      src={art.imageUrl} 
                      alt="" 
                      className="w-10 h-10 object-cover rounded-sm gray-scale"
                    />
                    <div className="text-left max-w-[120px] overflow-hidden truncate">
                      <p className={`font-serif text-[11px] truncate ${isSelected ? 'text-amber-900 font-semibold' : 'text-neutral-700'}`}>
                        {art.title}
                      </p>
                      <p className="font-mono text-[8.5px] text-neutral-400 uppercase truncate">
                        {art.medium}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CONTROLLER SWITCHBOARD */}
        <div className="xl:col-span-4 bg-white border border-[#1C1C1C]/5 p-6 space-y-6 shadow-sm">
          
          <div className="border-b border-neutral-100 pb-4">
            <span className="font-mono text-[10px] tracking-widest text-[#1C1C1C] uppercase font-bold">
              Simulation Control
            </span>
            <h3 className="font-serif text-lg text-neutral-800 mt-1">
              Curator Calibration
            </h3>
          </div>

          {/* Wall Backgrounds Selector */}
          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              Wall Painting / Finish
            </label>
            <div className="grid grid-cols-2 gap-2">
              {wallColors.map((color) => {
                const isActive = activeWall.id === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => setActiveWall(color)}
                    className={`flex items-center gap-2.5 px-3 py-2 border rounded-sm transition-all ${
                      isActive 
                        ? 'border-[#1C1C1C] bg-neutral-50 font-medium text-neutral-900' 
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-500'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0" 
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-sans text-[11px] truncate tracking-wide">
                      {color.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frame Style selector */}
          <div className="space-y-2">
            <label className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
              Frame Mold Selection
            </label>
            <div className="space-y-1.5">
              {frameStyles.map((frame) => {
                const isActive = activeFrame.id === frame.id;
                return (
                  <button
                    key={frame.id}
                    onClick={() => setActiveFrame(frame)}
                    className={`w-full flex items-center justify-between px-3 py-2 border rounded-sm text-left transition-all ${
                      isActive 
                        ? 'border-[#1C1C1C] bg-neutral-50 font-medium text-neutral-900 shadow-inner' 
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'
                    }`}
                  >
                    <span className="font-sans text-[11px] tracking-wide">
                      {frame.name}
                    </span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-800" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mat option toggle, highly classic for prints */}
          {activeFrame.passepartout && (
            <div className="flex items-center justify-between bg-neutral-50 p-2.5 rounded-sm border border-neutral-150">
              <div className="flex items-center gap-2">
                <Info size={12} className="text-amber-800" />
                <span className="font-sans text-[10.5px] text-neutral-600 tracking-wide">
                  Introduce Archival Mat (Passe-Partout)
                </span>
              </div>
              <input
                type="checkbox"
                checked={useMatBorder}
                onChange={(e) => setUseMatBorder(e.target.checked)}
                className="w-3.5 h-3.5 border-neutral-300 rounded text-amber-800 focus:ring-amber-500 cursor-pointer"
              />
            </div>
          )}

          {/* Selected Work Dimensions Card */}
          <div className="bg-neutral-50/80 p-4 border border-neutral-100 rounded-sm space-y-3.5">
            <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
              Original Piece Specifications
            </span>
            <div className="space-y-1">
              <h4 className="font-serif text-md text-[#1C1C1C]">
                {selectedArt.title}
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed italic">
                "{selectedArt.description}"
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200 font-mono text-[10px] text-neutral-500">
              <div>
                <span className="block text-neutral-400">MEDIUM</span>
                <span className="font-semibold text-neutral-700 uppercase leading-wide block">{selectedArt.medium}</span>
              </div>
              <div>
                <span className="block text-neutral-400">DIMENSIONS</span>
                <span className="font-semibold text-neutral-700 block">{selectedArt.dimensions}</span>
              </div>
            </div>
          </div>

          {/* Explanation banner */}
          <div className="p-3 bg-amber-50/60 border border-amber-800/10 rounded-sm text-[11px] text-amber-900 leading-relaxed">
            <span className="font-semibold">Curator Tip:</span> Vertical orientation photography is conventionally bordered with a broad 3-inch acid-free white matboard to preserve silver tones under reflection-free museum glass.
          </div>
        </div>
      </div>
    </div>
  );
}
