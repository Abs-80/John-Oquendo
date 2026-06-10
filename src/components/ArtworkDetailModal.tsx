import React, { useState, useEffect } from 'react';
import { Artwork, Inquiry } from '../types';
import { X, Calendar, Sparkles, Send, Mail, Heart, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  isFavorited: boolean;
  onToggleFavorite: (artwork: Artwork) => void;
  onSubmitInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp'>) => void;
}

export default function ArtworkDetailModal({
  artwork,
  onClose,
  isFavorited,
  onToggleFavorite,
  onSubmitInquiry,
}: ArtworkDetailModalProps) {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Reset form status when artwork changes
  useEffect(() => {
    setInquiryName('');
    setInquiryEmail('');
    setInquiryMsg('');
    setSubmitted(false);
  }, [artwork]);

  if (!artwork) return null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim()) return;

    onSubmitInquiry({
      artworkId: artwork.id,
      artworkTitle: artwork.title,
      name: inquiryName,
      email: inquiryEmail,
      message: inquiryMsg,
    });

    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#1C1C1D]/85 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-[#FAF9F6] w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-neutral-800 transition-colors shadow-sm"
          >
            <X size={16} />
          </button>

          {/* Left: High Resolution Image view */}
          <div className="lg:col-span-7 bg-[#EDECDF] flex items-center justify-center p-6 sm:p-12 border-r border-neutral-200 overflow-y-auto max-h-[45vh] lg:max-h-none">
            <div className="relative shadow-xl border-8 border-white bg-white p-2">
              <img
                src={artwork.imageUrl}
                alt={artwork.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] object-contain w-full"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest text-[#1C1C1C] border border-neutral-100">
                {artwork.dimensions} &bull; {artwork.year}
              </div>
            </div>
          </div>

          {/* Right: Academic details & Inquiry */}
          <div className="lg:col-span-5 p-6 sm:p-8 overflow-y-auto max-h-[45vh] lg:max-h-none space-y-6">
            
            {/* Header Title Information */}
            <div className="space-y-2 border-b border-neutral-200 pb-5">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                  {artwork.series} Series
                </span>
                <button
                  onClick={() => onToggleFavorite(artwork)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono rounded-full border transition-all ${
                    isFavorited
                      ? 'bg-amber-50 border-amber-800 text-amber-900 font-semibold'
                      : 'border-neutral-200 text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Heart size={10} className={isFavorited ? 'fill-amber-800' : ''} />
                  <span>{isFavorited ? 'Saved in Inquiries' : 'Save to Inquiry'}</span>
                </button>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1C1C1C]">
                {artwork.title}
              </h2>
              <p className="font-mono text-xs text-neutral-500 uppercase">
                {artwork.medium}
              </p>
            </div>

            {/* Academic Specifications List */}
            <div className="grid grid-cols-2 gap-4 text-[11px] border-b border-neutral-150 pb-5">
              <div>
                <span className="font-mono text-neutral-400 block uppercase">Creation Year</span>
                <span className="font-sans font-medium text-neutral-800">{artwork.year}</span>
              </div>
              <div>
                <span className="font-mono text-neutral-400 block uppercase">Original Scale</span>
                <span className="font-sans font-medium text-neutral-800">{artwork.dimensions}</span>
              </div>
              <div>
                <span className="font-mono text-neutral-400 block uppercase">Collection Classification</span>
                <span className="font-sans font-medium text-neutral-800 capitalize">{artwork.category} Portfolio</span>
              </div>
              <div>
                <span className="font-mono text-neutral-400 block uppercase">Acquisition Status</span>
                <span className="font-sans font-semibold text-amber-800">Available via Studio</span>
              </div>
            </div>

            {/* Narrative Story block */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                <Sparkles size={11} className="text-amber-700" />
                The Artist's Story
              </h4>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed italic bg-[#FAF9F6]">
                "{artwork.description}"
              </p>
              <p className="font-sans text-xs text-neutral-600 leading-relaxed">
                {artwork.story}
              </p>
            </div>

            {/* Inquiry Form */}
            <div className="bg-neutral-50 p-5 rounded-sm border border-neutral-150 space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 flex items-center gap-1.5 border-b border-neutral-200 pb-2">
                <Mail size={11} />
                Acquisition & Studio Inquiry
              </h4>

              {submitted ? (
                <div className="py-4 text-center space-y-2.5">
                  <div className="inline-flex items-center justify-center p-2 rounded-full bg-emerald-50 text-emerald-800 mb-1 border border-emerald-200">
                    <CheckCircle size={18} />
                  </div>
                  <p className="font-serif text-sm font-semibold text-emerald-900">
                    Inquiry Safely Queued!
                  </p>
                  <p className="font-sans text-[11px] text-neutral-600 leading-relaxed max-w-sm mx-auto">
                    A copy of your interest has been stored in your personal "My Inquiries" records dashboard (viewable in the upper right folder). In a live deployment, this notifies standard SMTP mailboxes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white border border-neutral-200 px-2.5 py-1.5 font-sans text-xs focus:outline-none focus:border-[#1C1C1C] rounded-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-neutral-400 uppercase">Your Email</label>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="johndoe@example.com"
                        className="w-full bg-white border border-neutral-200 px-2.5 py-1.5 font-sans text-xs focus:outline-none focus:border-[#1C1C1C] rounded-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[9px] text-neutral-400 uppercase">Message</label>
                    <textarea
                      rows={2}
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      placeholder="Specify shipping interest, custom size questions or framing inquiries..."
                      className="w-full bg-white border border-neutral-200 px-2.5 py-1.5 font-sans text-xs focus:outline-none focus:border-[#1C1C1C] rounded-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-sans text-xs font-semibold py-2 px-4 transition-colors flex items-center justify-center gap-2 tracking-wider uppercase rounded-sm"
                  >
                    <Send size={11} />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
