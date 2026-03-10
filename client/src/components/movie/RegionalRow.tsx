/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MediaCard from "../common/MediaCard";

interface RegionalRowProps {
  bollywood: any[];
  hollywood: any[];
}

type RegionalType = "bollywood" | "hollywood";

// Dynamic Theme Configurations - Rose for Bollywood, Indigo for Hollywood
const THEME = {
  bollywood: {
    primary: "text-rose-400",
    hover: "hover:text-rose-300",
    bgLight: "bg-rose-500/10",
    bgHover: "hover:bg-rose-500/20",
    border: "border-rose-500/30",
    glow: "group-hover/card:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
    label: "Bollywood",
  },
  hollywood: {
    primary: "text-indigo-400",
    hover: "hover:text-indigo-300",
    bgLight: "bg-indigo-500/10",
    bgHover: "hover:bg-indigo-500/20",
    border: "border-indigo-500/30",
    glow: "group-hover/card:shadow-[0_0_30px_rgba(99,102,241,0.3)]",
    label: "Hollywood",
  },
};

export default function RegionalRow({ bollywood, hollywood }: RegionalRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<RegionalType>("bollywood");
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

  const currentItems = selectedType === "bollywood" ? bollywood : hollywood;
  if (!currentItems || currentItems.length === 0) return null;

  const exploreLink = selectedType === "bollywood" 
    ? "/explore?category=bollywood-movies" 
    : "/explore?category=hollywood-movies";

  return (
    <section className="relative group/row py-6">
      {/* ─── AMBIENT BACKGROUND GLOW ─── */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-rose-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex items-center justify-between mb-4 px-4 md:px-8 relative z-20">
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <h2 className="text-xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight drop-shadow-md">
            Blockbusters
          </h2>
          
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex cursor-pointer items-center gap-1.5 md:px-4 md:py-2 px-2 py-1 rounded-xl backdrop-blur-md border transition-all duration-300 shadow-lg ${activeTheme.bgLight} ${activeTheme.border} ${activeTheme.primary} hover:bg-white/10`}
          >
            <span className="font-bold text-sm md:text-base tracking-wide">
              {activeTheme.label}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 mt-3 w-44 bg-[var(--bg-elevated)]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden z-30"
              >
                {(["bollywood", "hollywood"] as RegionalType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => { setSelectedType(type); setIsDropdownOpen(false); }}
                    className={`w-full cursor-pointer text-left px-5 py-3 text-sm font-medium transition-colors ${
                      selectedType === type 
                        ? `${THEME[type].bgLight} ${THEME[type].primary} border-l-2 ${THEME[type].border}` 
                        : "text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--text-primary)] border-l-2 border-transparent"
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
          className={`group cursor-pointer flex items-center gap-2 text-sm md:text-base font-bold transition-all duration-300 ${activeTheme.primary} ${activeTheme.hover}`}
        >
          More 
          <span className={`flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors`}>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />

        <button
          onClick={() => scroll("left")}
          className="absolute cursor-pointer left-4 md:top-[151px] lg:top-[166px] -translate-y-1/2 z-20 p-3 rounded-full bg-[var(--bg-elevated)]/60 backdrop-blur-xl border border-white/10 text-[var(--text-primary)] opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute cursor-pointer right-4 md:top-[151px] lg:top-[166px] -translate-y-1/2 z-20 p-3 rounded-full bg-[var(--bg-elevated)]/60 backdrop-blur-xl border border-white/10 text-[var(--text-primary)] opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:flex"
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
              .filter((movie) => movie.poster_path)
              .map((movie, index) => (
                  <div key={`${selectedType}-${movie.id}`} className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px] snap-start">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <MediaCard item={movie as any} fallbackMediaType="movie" />
                    </motion.div>
                  </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}