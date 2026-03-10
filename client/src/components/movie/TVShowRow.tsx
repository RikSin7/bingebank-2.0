/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import MediaCard from "../common/MediaCard";

interface TVShowRowProps {
  title: string;
  shows: any[];
  exploreLink?: string;
}

export default function TVShowRow({ title, shows, exploreLink }: TVShowRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = window.innerWidth > 768 ? 600 : 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!shows || shows.length === 0) return null;

  return (
    <section className="relative group/row">
      {/* ─── HEADER ─── */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 relative z-20">
        <h2 className="text-xl md:text-3xl font-black text-[var(--text-primary)] tracking-tight drop-shadow-md">
          {title}
        </h2>
        {exploreLink && (
          <Link
            href={exploreLink}
            className="group cursor-pointer flex items-center gap-2 text-sm md:text-base font-bold transition-all duration-300 text-fuchsia-400 hover:text-fuchsia-300"
          >
            More 
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        )}
      </div>

      {/* ─── SCROLLABLE CAROUSEL ─── */}
      <div className="relative w-full">
        {/* Edge Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />

        {/* Premium Scroll Buttons */}
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

        {/* Scrollable Container */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-8 pt-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {shows
              .filter((show) => show.poster_path)
              .map((show, index) => (
                  <div key={show.id} className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px] snap-start">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <MediaCard item={show as any} fallbackMediaType="tv" />
                    </motion.div>
                  </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}