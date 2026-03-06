"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { tmdbImage } from "@/services/tmdb";
import { CastMember } from "@/types/movie";
import { ChevronLeft, ChevronRight, Users, X } from "lucide-react";

interface CastCarouselProps {
  cast: CastMember[];
}

export default function CastCarousel({ cast }: CastCarouselProps) {
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

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = window.innerWidth > 768 ? 500 : 300;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!cast || cast.length === 0) return null;

  return (
    <section className="relative group/cast w-full overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2 px-4 md:px-0">
        <Users className="w-5 h-5 text-purple-400" /> Cast
      </h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#06020a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#06020a] to-transparent z-10 pointer-events-none" />

        <div className="absolute top-2 left-0 right-0 h-[100px] md:h-[130px] pointer-events-none z-20 hidden md:flex items-center justify-between px-4">
          <button onClick={() => scroll("left")} className="pointer-events-auto p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/cast:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-500/20 shadow-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="pointer-events-auto p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/cast:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-500/20 shadow-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex py-2 gap-4 md:gap-8 overflow-x-auto px-4 md:px-8 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {cast.map((member, index) => (
            <button key={`${member.id}-${index}`} onClick={() => setSelectedIndex(index)} className="flex-shrink-0 w-[100px] md:w-[130px] group/card flex flex-col items-center text-center cursor-pointer snap-start">
              <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden bg-[#0a0514] mb-4 shadow-lg border-2 border-white/5 group-hover/card:border-purple-400 group-hover/card:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500">
                {member.profile_path ? (
                  <Image src={tmdbImage(member.profile_path, "w185")} alt={member.name} fill sizes="130px" className="object-cover group-hover/card:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 bg-white/5"><Users className="w-10 h-10" /></div>
                )}
              </div>
              <p className="text-sm font-bold text-white w-full truncate">{member.name}</p>
              <p className="text-xs text-purple-300 w-full truncate mt-1">{member.character}</p>
            </button>
          ))}
        </div>
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-[#06020a]/95 backdrop-blur-2xl flex items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <button className="absolute top-6 right-6 z-[110] p-3 rounded-full bg-white/5 hover:bg-white/10 hover:scale-110 transition border border-white/10" onClick={() => setSelectedIndex(null)}>
                <X className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </button>

              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }} 
                animate={{ scale: 1, y: 0, opacity: 1 }} 
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative flex flex-col items-center justify-center w-full pointer-events-none" 
              >
                <div className="relative flex flex-col md:flex-row items-center justify-center w-full">
                  
                  {/* Desktop Prev Button */}
                  {selectedIndex > 0 && (
                    <button className="hidden md:block absolute left-4 md:left-28 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 transition z-[110] pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex - 1); }}>
                      <ChevronLeft className="w-4 h-4 md:w-8 md:h-8 text-white" />
                    </button>
                  )}

                  <div 
                    className="relative h-[55vh] md:h-[65vh] lg:h-[70vh] aspect-[2/3] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(168,85,247,0.2)] border border-white/10 bg-[#c3bcd0] pointer-events-auto cursor-default"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {cast[selectedIndex].profile_path ? (
                      <Image src={tmdbImage(cast[selectedIndex].profile_path, "h632")} alt={cast[selectedIndex].name} fill sizes="(max-width: 768px) 80vw, 50vw" className="object-cover" priority />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10"><Users className="w-32 h-32" /></div>
                    )}
                  </div>

                  {/* Desktop Next Button */}
                  {selectedIndex < cast.length - 1 && (
                    <button className="hidden md:block absolute right-4 md:right-28 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 transition z-[110] pointer-events-auto" onClick={(e) => { e.stopPropagation(); setSelectedIndex(selectedIndex + 1); }}>
                      <ChevronRight className="w-4 h-4 md:w-8 md:h-8 text-white" />
                    </button>
                  )}
                </div>
                
                <div className="mt-4 md:mt-6 text-center px-4 max-w-2xl pointer-events-auto cursor-default" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">{cast[selectedIndex].name}</h3>
                  <p className="text-lg md:text-2xl text-purple-400 font-medium mt-1 md:mt-2 drop-shadow-md">{cast[selectedIndex].character}</p>
                </div>

                {/* Mobile Navigation (Under the text) */}
                <div className="flex items-center gap-6 mt-4 md:hidden pointer-events-auto">
                  <button 
                    disabled={selectedIndex === 0}
                    className={`p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition ${selectedIndex === 0 ? 'opacity-30' : 'active:scale-95'}`} 
                    onClick={(e) => { e.stopPropagation(); if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1); }}
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button 
                    disabled={selectedIndex === cast.length - 1}
                    className={`p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 transition ${selectedIndex === cast.length - 1 ? 'opacity-30' : 'active:scale-95'}`} 
                    onClick={(e) => { e.stopPropagation(); if (selectedIndex < cast.length - 1) setSelectedIndex(selectedIndex + 1); }}
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}