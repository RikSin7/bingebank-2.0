/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { tmdbImage } from "@/services/tmdb";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

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
    <section className="relative group/row overflow-hidden">
      {/* ─── AMBIENT GLOW ─── */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ─── HEADER ─── */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 relative z-20">
        <h2 className="text-xl md:text-3xl font-black text-white tracking-tight drop-shadow-md">
          {title}
        </h2>
        {exploreLink && (
          <Link
            href={exploreLink}
            className="group flex items-center gap-2 text-sm md:text-base font-bold transition-all duration-300 text-fuchsia-400 hover:text-fuchsia-300"
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
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#06020a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#06020a] to-transparent z-10 pointer-events-none" />

        {/* Premium Scroll Buttons */}
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
                <Link
                  key={show.id}
                  href={`/tv/${show.id}`}
                  className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px] snap-start group/card block"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#110b1c] border border-white/5 transition-all duration-500 group-hover/card:-translate-y-2"
                  >
                    {/* Fuchsia tinted shadow for TV shows */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:shadow-[0_0_30px_rgba(217,70,239,0.3)]" />
                    <Image
                      src={tmdbImage(show.poster_path, "w342")}
                      alt={show.name}
                      fill
                      sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 200px"
                      className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  </motion.div>

                  <div className="mt-3 px-1 transition-transform duration-300 group-hover/card:translate-x-1">
                    <p className="text-sm md:text-base font-bold text-white truncate drop-shadow-sm group-hover/card:text-gray-200">
                      {show.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-gray-400">
                      <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-md border border-yellow-500/20">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        {show.vote_average?.toFixed(1) ?? "NR"}
                      </span>
                      {show.first_air_date && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-600" />
                          <span>{show.first_air_date.substring(0, 4)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}