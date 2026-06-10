import { Menu, X, Heart, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  inquiryCount: number;
}

export default function Header({ activeSection, setActiveSection, inquiryCount }: HeaderProps) {
  const navItems = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'visualizer', label: 'Virtual Wall' },
    { id: 'biography', label: 'Biography' },
    { id: 'guestbook', label: 'Guestbook' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#1C1C1C]/5 py-4 md:py-6 px-4 sm:px-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo / Artist Typography */}
        <div 
          className="cursor-pointer group select-none text-center md:text-left"
          onClick={() => setActiveSection('gallery')}
        >
          <h1 className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#1C1C1C] transition-colors duration-300 group-hover:text-amber-800">
            JOHN OQUENDO
          </h1>
        </div>

        {/* Minimalist Navigation */}
        <nav className="flex items-center justify-center md:justify-end gap-x-2 sm:gap-x-4">
          <ul className="flex items-center gap-x-1 sm:gap-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`relative px-3 py-1.5 font-sans text-xs tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? 'text-[#1C1C1C] font-semibold' : 'text-neutral-500 hover:text-[#1C1C1C]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3 right-3 h-[1px] bg-[#1C1C1C]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="h-4 w-[1px] bg-neutral-200 mx-1 hidden sm:block" />

          {/* Inquiry / Saved Action */}
          <button
            onClick={() => setActiveSection('inquiries')}
            className={`relative p-2 rounded-full transition-colors ${
              activeSection === 'inquiries' ? 'bg-amber-50 text-amber-900' : 'text-neutral-600 hover:bg-neutral-100 hover:text-[#1C1C1C]'
            }`}
            title="My Saved Inquiries"
          >
            <Heart size={16} className={inquiryCount > 0 ? "fill-amber-750 text-amber-800" : ""} />
            {inquiryCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 bg-amber-800 text-white rounded-full text-[9px] font-mono flex items-center justify-center px-1 font-bold animate-pulse">
                {inquiryCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
