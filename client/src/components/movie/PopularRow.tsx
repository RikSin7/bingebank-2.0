"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/services/tmdb";
import { ChevronLeft, ChevronRight, Star, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PopularRowProps {
  popularMovies: any[];
  popularTV: any[];
}

type MediaType = "movie" | "tv";

// Dynamic Theme Configurations - Using Amber/Orange for "Popular"
const THEME = {
  movie: {
    primary: "text-amber-400",
    hover: "hover:text-amber-300",
    bgLight: "bg-amber-500/10",
    bgHover: "hover:bg-amber-500/20",
    border: "border-amber-500/30",
    glow: "group-hover/card:shadow-[0_0_30px_rgba(251,191,36,0.3)]",
    label: "Movies",
  },
  tv: {
    primary: "text-orange-400",
    hover: "hover:text-orange-300",
    bgLight: "bg-orange-500/10",
    bgHover: "hover:bg-orange-500/20",
    border: "border-orange-500/30",
    glow: "group-hover/card:shadow-[0_0_30px_rgba(251,146,60,0.3)]",
    label: "TV Shows",
  },
};

export default function PopularRow({ popularMovies, popularTV }: PopularRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<MediaType>("movie");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeTheme = THEME[selectedType];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = window.innerWidth > 768 ? 600 : 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const currentItems = selectedType === "movie" ? popularMovies : popularTV;
  if (!currentItems || currentItems.length === 0) return null;

  const exploreLink = selectedType === "movie" 
    ? "/explore?category=popular-movies" 
    : "/explore?category=popular-tv";

  return (
    <section className="relative group/row py-6 overflow-hidden">
      {/* ─── AMBIENT BACKGROUND GLOW ─── */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex items-center justify-between mb-4 px-4 md:px-8 relative z-20">
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
            Popular
          </h2>
          
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl backdrop-blur-md border transition-all duration-300 shadow-lg ${activeTheme.bgLight} ${activeTheme.border} ${activeTheme.primary} hover:bg-white/10`}
          >
            <span className="font-bold text-sm md:text-base tracking-wide">
              {activeTheme.label}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 mt-3 w-44 bg-[#0a0514]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-30"
              >
                {(["movie", "tv"] as MediaType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => { setSelectedType(type); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
                      selectedType === type 
                        ? `${THEME[type].bgLight} ${THEME[type].primary} border-l-2 ${THEME[type].border}` 
                        : "text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                    }`}
                  >
                    {THEME[type].label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href={exploreLink}
          className={`group flex items-center gap-2 text-sm md:text-base font-bold transition-all duration-300 ${activeTheme.primary} ${activeTheme.hover}`}
        >
          Explore All 
          <span className={`flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors`}>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <button
          onClick={() => scroll("left")}
          className="absolute left-4 md:top-[151px] lg:top-[166px] -translate-y-1/2 z-20 p-3 rounded-full bg-[#0a0514]/60 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-4 md:top-[151px] lg:top-[166px] -translate-y-1/2 z-20 p-3 rounded-full bg-[#0a0514]/60 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-8 pt-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {currentItems
              .filter((item) => item.poster_path)
              .map((item, index) => {
                const id = item.id;
                const title = item.title || item.name;
                const date = item.release_date || item.first_air_date;
                const linkUrl = selectedType === "movie" ? `/movie/${id}` : `/tv/${id}`;

                return (
                  <Link
                    key={`${selectedType}-${id}`}
                    href={linkUrl}
                    className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px] snap-start group/card block"
                  >
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#110b1c] border border-white/5 transition-all duration-500 group-hover/card:-translate-y-2"
                    >
                      <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${activeTheme.glow}`} />
                      <Image
                        src={tmdbImage(item.poster_path, "w342")}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 200px"
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                    </motion.div>

                    <div className="mt-3 px-1 transition-transform duration-300 group-hover/card:translate-x-1">
                      <p className="text-sm md:text-base font-bold text-white truncate drop-shadow-sm group-hover/card:text-gray-200">
                        {title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-gray-400">
                        <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-md border border-yellow-500/20">
                          <Star className="w-3 h-3 fill-yellow-500" />
                          {item.vote_average?.toFixed(1) ?? "NR"}
                        </span>
                        {date && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-600" />
                            <span>{date.substring(0, 4)}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}