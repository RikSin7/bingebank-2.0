/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { tmdbImage } from "@/services/tmdb";
import { Star, Film, ChevronDown } from "lucide-react";
import { PersonCredit } from "@/types/movie";

const ITEMS_PER_PAGE = 24;

export default function PersonContentSection({ credits }: { credits: PersonCredit[] }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  if (!credits || credits.length === 0) return null;

  // 1. Remove duplicates and sort by popularity (Best work first)
  const uniqueCredits = Array.from(new Map(credits.map(item => [item.id, item])).values())
    .sort((a, b) => b.popularity - a.popularity);

  // 2. Slice the array based on how many the user wants to see
  const visibleCredits = uniqueCredits.slice(0, visibleCount);
  const hasMore = visibleCount < uniqueCredits.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          Known For <span className="text-zinc-500 text-lg ml-2">({uniqueCredits.length})</span>
        </h2>
      </div>

      {/* Increased vertical gap (gap-y) because the text now sits below the poster */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-10">
        {visibleCredits.map((item, index) => {
          const isMovie = item.media_type === "movie";
          const href = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;
          const title = item.title || item.name;
          const date = item.release_date || item.first_air_date;

          return (
            <Link key={`credit-${item.id}`} href={href} className="group/card block cursor-pointer">
              
              {/* ─── Animated Card Container ─── */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                // Using modulo prevents massive delays when clicking "Load More"
                transition={{ delay: (index % ITEMS_PER_PAGE) * 0.05, duration: 0.4 }}
                className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#110b1c] border border-white/5 transition-all duration-500 group-hover/card:-translate-y-2"
              >
                {/* Dynamic Glowing Shadow (Purple) */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:shadow-[0_0_30px_rgba(168,85,247,0.3)]" />

                {/* Poster */}
                {item.poster_path ? (
                  <Image
                    src={tmdbImage(item.poster_path, "w500")}
                    alt={title || "Poster"}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center text-zinc-600 bg-[#0a0514]">
                    <Film className="w-8 h-8 mb-2 opacity-50" />
                  </div>
                )}
                
                {/* Glassy Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* ─── Meta Info (Slides Right on Hover) ─── */}
              <div className="mt-3 px-1 transition-transform duration-300 group-hover/card:translate-x-1">
                <p className="text-sm md:text-base font-bold text-white truncate drop-shadow-sm group-hover/card:text-gray-200">
                  {title}
                </p>
                
                <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-gray-400">
                  <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-md border border-yellow-500/20">
                    <Star className="w-3 h-3 fill-yellow-500" />
                    {item.vote_average?.toFixed(1) || "NR"}
                  </span>
                  {date && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-600" />
                      <span>{date.substring(0, 4)}</span>
                    </>
                  )}
                </div>

                {/* Role/Character Display */}
                {item.character && (
                  <p className="text-purple-400 text-xs mt-1.5 line-clamp-1 font-medium">
                    as {item.character}
                  </p>
                )}
              </div>

            </Link>
          );
        })}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12 mb-4">
          <button
            onClick={handleLoadMore}
            className="group flex cursor-pointer items-center gap-3 px-8 py-4 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 text-white font-bold rounded-2xl transition-all duration-300 backdrop-blur-md shadow-lg active:scale-95"
          >
            Load More
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}