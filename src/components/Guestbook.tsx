import React, { useState, useEffect } from 'react';
import { GuestbookEntry } from '../types';
import { Send, MapPin, Feather, CheckCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const STATIC_ENTRIES: GuestbookEntry[] = [
  {
    id: 'entry-1',
    name: 'Eleanor Vance',
    location: 'Soho, New York',
    message: 'I still remember walking into the Mercer Street Loft show in 1986. The gelatin prints of Manhattan rainy street corners had such deep blacks. It is wonderful to see these absolute masterpieces curated here so elegantly. True poetry of the New York streets.',
    timestamp: 'May 14, 2026'
  },
  {
    id: 'entry-2',
    name: 'Dr. Marcus Sterling',
    location: 'Berlin, Germany',
    message: 'The Silent Grid No. 5 is an incredibly architectural drawing. The subtle graphite lines on rough gesso render sunlight and shade in high fidelity. A rare gem showing Oquendo’s continuous evolution as an abstract master.',
    timestamp: 'April 02, 2026'
  },
  {
    id: 'entry-3',
    name: 'Julien & Clara',
    location: 'Paris, France',
    message: 'Stunning exhibition portfolio. "Symphony in Deep Blue" is incredibly hypnotic in person. It feels like standing at the harbor looking into depth. Thank you for making this beautiful website portfolio available.',
    timestamp: 'February 21, 2026'
  }
];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('oquendo_guestbook');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch (e) {
        setEntries(STATIC_ENTRIES);
      }
    } else {
      setEntries(STATIC_ENTRIES);
      localStorage.setItem('oquendo_guestbook', JSON.stringify(STATIC_ENTRIES));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `entry-${Date.now()}`,
      name: name.trim(),
      location: location.trim() || 'Co-traveller of Art',
      message: message.trim(),
      timestamp: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('oquendo_guestbook', JSON.stringify(updated));

    setName('');
    setLocation('');
    setMessage('');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-12 fade-in">
      {/* Intro Header */}
      <section className="border-b border-[#1C1C1C]/10 pb-8 pt-2">
        <span className="font-mono text-xs tracking-[0.25em] uppercase text-neutral-500 block">
          Gallery Register
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#1C1C1C] mt-2 font-light">
          Sign the Guestbook
        </h2>
        <p className="font-sans text-xs text-neutral-600 mt-2 max-w-2xl leading-relaxed">
          Leave a response, memory, or greeting for John. The Guestbook acts as a permanent ledger of appreciations, critiques, and comments from friends, collectors, and travellers of art worldwide.
        </p>
      </section>

      {/* Grid: Left sign form, right scrolling roll */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Sign form */}
        <div className="lg:col-span-5 bg-white border border-[#1C1C1C]/5 p-6 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="font-serif text-lg text-neutral-850 flex items-center gap-2">
              <Feather size={16} className="text-amber-800" />
              Sign Register Ledger
            </h3>
            <p className="font-mono text-[9px] text-neutral-400 mt-1 uppercase tracking-wider">
              Permanent Client-Side Register
            </p>
          </div>

          {success ? (
            <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-sm text-center space-y-2">
              <CheckCircle size={24} className="text-emerald-800 mx-auto" />
              <h4 className="font-serif text-sm font-semibold text-emerald-900">
                Register Signed Successfully
              </h4>
              <p className="font-sans text-[11px] text-neutral-600 leading-relaxed max-w-xs mx-auto">
                Thank you for taking part in the exhibition. Your appreciation has been successfully persistent on the ledger roll.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#1C1C1C]">
                  Your Name <span className="text-amber-800">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Adrian Oquendo"
                  className="w-full bg-neutral-50/60 border border-neutral-200 px-3 py-2 font-sans text-xs focus:outline-none focus:border-[#1C1C1C] focus:bg-white rounded-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#1C1C1C]">
                  Location / City
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. New York, NY"
                  className="w-full bg-neutral-50/60 border border-neutral-200 px-3 py-2 font-sans text-xs focus:outline-none focus:border-[#1C1C1C] focus:bg-white rounded-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#1C1C1C]">
                  Your Sentiment / Message <span className="text-amber-800">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a memory, thoughts on the abstract pieces, or light notes of appreciation..."
                  className="w-full bg-neutral-50/60 border border-neutral-200 px-3 py-2 font-sans text-xs focus:outline-none focus:border-[#1C1C1C] focus:bg-white rounded-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1C1C1C] hover:bg-neutral-800 text-white font-sans text-xs font-semibold py-2.5 px-4 transition-colors flex items-center justify-center gap-2 uppercase tracking-widest rounded-sm"
              >
                <Send size={11} />
                <span>Publish Entry</span>
              </button>
            </form>
          )}
        </div>

        {/* Ledger Roll list */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-neutral-400">
              Active Register Roll ({entries.length})
            </span>
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scroll-smooth">
            <AnimatePresence>
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#FAF9F6] border border-[#1C1C1C]/5 p-5 relative shadow-sm group hover:border-[#1C1C1C]/15 transition-all duration-300"
                >
                  <Quote size={24} className="absolute top-4 right-4 text-neutral-200/50 pointer-events-none" />
                  
                  {/* Meta */}
                  <div className="flex items-center justify-between gap-4 border-b border-dashed border-stone-100 pb-2.5 mb-3.5">
                    <div>
                      <h4 className="font-serif text-[14px] font-bold text-[#1C1C1C]">
                        {entry.name}
                      </h4>
                      <p className="font-sans text-[10.5px] text-neutral-500 flex items-center gap-1 mt-0.5">
                        <MapPin size={9} className="text-amber-700" />
                        {entry.location}
                      </p>
                    </div>
                    <span className="font-mono text-[9px] text-neutral-400">
                      {entry.timestamp}
                    </span>
                  </div>

                  {/* Message body */}
                  <p className="font-sans text-xs text-neutral-600 leading-relaxed italic pr-4">
                    "{entry.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
