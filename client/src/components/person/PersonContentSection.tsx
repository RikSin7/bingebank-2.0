/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PersonCreditsGrid from "./PersonCreditsGrid";
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
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-wide">
          Known For <span className="text-[var(--text-muted)] text-lg ml-2">({uniqueCredits.length})</span>
        </h2>
      </div>

      {/* Standardized Grid using PersonCreditsGrid */}
      <PersonCreditsGrid credits={visibleCredits} />

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12 mb-4">
          <button
            onClick={handleLoadMore}
            className="group flex cursor-pointer items-center gap-3 px-8 py-4 bg-[var(--bg-glass)] hover:bg-purple-500/10 border border-[var(--border-medium)] hover:border-purple-500/50 text-[var(--text-primary)] font-bold rounded-2xl transition-all duration-300 backdrop-blur-md shadow-lg active:scale-95"
          >
            Load More
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}