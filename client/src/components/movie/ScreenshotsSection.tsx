/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { tmdbImage } from "@/services/tmdb";
import { Backdrop } from "@/types/movie";
import { X, ZoomIn, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ScreenshotsSectionProps {
  backdrops: Backdrop[];
}

export default function ScreenshotsSection({ backdrops }: ScreenshotsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  if (!backdrops || backdrops.length === 0) return null;
  const images = backdrops.slice(0, 50);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = window.innerWidth > 768 ? 600 : 300;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="relative group/shots">
      <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-purple-400" /> Screenshots
      </h2>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />

        <button onClick={() => scroll("left")} className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/shots:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-500/20 shadow-lg hidden md:block">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => scroll("right")} className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/shots:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-500/20 shadow-lg hidden md:block">
          <ChevronRight className="w-6 h-6" />
        </button>

        <div ref={scrollRef} className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {images.map((backdrop, index) => (
            <button key={backdrop.file_path} onClick={() => setSelectedIndex(index)} className="flex-shrink-0 relative w-[280px] md:w-[400px] lg:w-[480px] aspect-video rounded-3xl overflow-hidden bg-zinc-900/80 group cursor-pointer shadow-lg border border-white/5 snap-start">
              <Image src={tmdbImage(backdrop.file_path, "w780")} alt={`Screenshot ${index + 1}`} fill sizes="(max-width: 768px) 280px, (max-width: 1024px) 400px, 480px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                <div className="bg-black/50 p-4 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-[var(--bg-overlay)]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <button className="absolute cursor-pointer top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition border border-white/10" onClick={() => setSelectedIndex(null)}>
                <X className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>

              <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
                
                {/* Desktop Prev Button */}
                {selectedIndex > 0 && (
                  <button className="hidden xl:block cursor-pointer absolute left-4 md:-left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 transition z-[110]" onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex - 1); }}>
                    <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </button>
                )}

                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image src={tmdbImage(images[selectedIndex].file_path, "w1280")} alt="Full Screenshot" fill sizes="100vw" className="object-contain bg-black/50" priority />
                </motion.div>

                {/* Desktop Next Button */}
                {selectedIndex < images.length - 1 && (
                  <button className="hidden xl:block cursor-pointer absolute right-4 md:-right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 transition z-[110]" onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex + 1); }}>
                    <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white" />
                  </button>
                )}
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col items-center gap-4 mt-6 xl:hidden w-full">
                
                <div 
                  className="text-white/60 font-bold tracking-widest text-sm bg-white/5 px-4 py-1.5 rounded-full border border-white/5 cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedIndex + 1} / {images.length}
                </div>

                <div className="flex items-center gap-6">
                  <button 
                    disabled={selectedIndex === 0}
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 transition ${selectedIndex === 0 ? 'opacity-30' : 'active:scale-95'}`} 
                    onClick={(e) => { e.stopPropagation(); if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1); }}
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button 
                    disabled={selectedIndex === images.length - 1}
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 transition ${selectedIndex === images.length - 1 ? 'opacity-30' : 'active:scale-95'}`} 
                    onClick={(e) => { e.stopPropagation(); if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1); }}
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Desktop Counter */}
              <div className="hidden xl:block absolute bottom-3 left-1/2 -translate-x-1/2 text-white font-bold tracking-widest bg-white/10 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full shadow-lg pointer-events-none">
                {selectedIndex + 1} / {images.length}
              </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}