/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { searchMulti } from "@/services/searchService";
import { tmdbImage } from "@/services/tmdb";
import { Star, Loader2, User, ChevronDown, Filter, ArrowDownUp, Tv, Film, Sparkles, Clock } from "lucide-react";

interface SearchGridProps {
  initialData: any;
  query: string;
}

type FilterType = "all" | "movie" | "tv" | "person";
type SortType = "relevance" | "popularity" | "newest" | "oldest";

function filterValidItems(results: any[]): any[] {
  if (!Array.isArray(results)) return [];
  return results.filter((item) => {
    if (!item.title && !item.name) return false;
    return true;
  });
}

export default function SearchGrid({ initialData, query }: SearchGridProps) {
  const [items, setItems] = useState<any[]>(filterValidItems(initialData?.results));
  const [page, setPage] = useState(initialData?.page || 1);
  const [totalPages, setTotalPages] = useState(initialData?.total_pages || 1);
  const [loading, setLoading] = useState(false);

  // ─── Filter & Sort State ───
  const [filter, setFilter] = useState<FilterType>("all");
  const [sort, setSort] = useState<SortType>("relevance");

  const safeTotalPages = Math.min(totalPages, 1000);
  const hasMore = page < safeTotalPages;

  const loadMore = async () => {
    if (loading || !hasMore || !query) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await searchMulti(query, nextPage);
      setItems((prev) => {
        const existingIds = new Set(prev.map((i) => i.id));
        const newItems = filterValidItems(res.results).filter((i: any) => !existingIds.has(i.id));
        return [...prev, ...newItems];
      });
      setPage(nextPage);
      setTotalPages(res.total_pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ─── Client-Side Processing Engine ───
  const processedItems = useMemo(() => {
    let result = [...items];

    // 1. Apply Media Type Filter
    if (filter !== "all") {
      result = result.filter(item => item.media_type === filter);
    }

    // 2. Apply Sorting
    if (sort === "popularity") {
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sort === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || "1900-01-01").getTime();
        const dateB = new Date(b.release_date || b.first_air_date || "1900-01-01").getTime();
        return dateB - dateA;
      });
    } else if (sort === "oldest") {
      result.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || "9999-12-31").getTime();
        const dateB = new Date(b.release_date || b.first_air_date || "9999-12-31").getTime();
        return dateA - dateB;
      });
    }
    // "relevance" keeps the original array order returned by TMDB

    return result;
  }, [items, filter, sort]);

  if (!query) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">Type something to search for movies, TV shows, and people.</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-12">
      <div className="flex items-center gap-4 mb-8 px-4 md:px-8">
        <div className="h-8 md:h-10 w-1.5 bg-purple-400 rounded-full" />
        <h1 className="text-xl md:text-4xl font-bold text-white tracking-tight">
          Search Results for "{query}"
        </h1>
      </div>

      {/* ─── Premium Filter & Sort Bar ─── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 px-4 md:px-8 mb-10">
        
        {/* Type Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mr-2">
            <Filter className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter</span>
          </div>
          
          {(["all", "movie", "tv", "person"] as FilterType[]).map((type) => {
            const labels: Record<FilterType, string> = { all: "All", movie: "Movies", tv: "TV Shows", person: "People" };
            const icons = { 
              all: <Sparkles className="w-4 h-4" />, 
              movie: <Film className="w-4 h-4" />, 
              tv: <Tv className="w-4 h-4" />, 
              person: <User className="w-4 h-4" /> 
            };
            const isActive = filter === type;

            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border ${
                  isActive 
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                    : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {icons[type]} {labels[type]}
              </button>
            );
          })}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mr-2">
            <ArrowDownUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sort</span>
          </div>

          {(["relevance", "popularity", "newest", "oldest"] as SortType[]).map((sortType) => {
            const labels: Record<SortType, string> = { relevance: "Relevance", popularity: "Popularity", newest: "Newest", oldest: "Oldest" };
            const isActive = sort === sortType;

            return (
              <button
                key={sortType}
                onClick={() => setSort(sortType)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border ${
                  isActive 
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                    : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {labels[sortType]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Grid ─── */}
      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-10">
          {processedItems.map((item, index) => {
            const isPerson = item.media_type === "person";
            const isMovie = item.media_type === "movie";
            
            const href = isPerson ? `/person/${item.id}` : isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;
            const displayTitle = item.title || item.name;
            
            const imagePath = isPerson ? item.profile_path : item.poster_path;
            const date = item.release_date || item.first_air_date;

            if (!displayTitle) return null;

            return (
              <motion.div
                key={`search-${item.media_type}-${item.id}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={href} className="flex flex-col gap-2 group/card cursor-pointer">
                  {/* Animated Card Container */}
                  <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#110b1c] border border-white/5 transition-all duration-500 group-hover/card:-translate-y-2">
                    {/* Dynamic Glowing Shadow (Purple) */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:shadow-[0_0_30px_rgba(168,85,247,0.3)]" />

                    {/* Image */}
                    {imagePath ? (
                      <Image
                        src={tmdbImage(imagePath, "w500")}
                        alt={displayTitle}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center p-4 text-gray-400 bg-[#0a0514]">
                        {isPerson ? <User className="w-12 h-12 mb-2 opacity-50" /> : null}
                        <span className="text-sm font-semibold text-center">No Image</span>
                      </div>
                    )}
                    
                    {/* Glassy Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Meta Info */}
                  <div className="mt-3 px-1 transition-transform duration-300 group-hover/card:translate-x-1">
                    <p className="text-sm md:text-base font-bold text-white truncate drop-shadow-sm group-hover/card:text-gray-200">
                      {displayTitle}
                    </p>
                    
                    {isPerson ? (
                      <span className="text-purple-400 text-[11px] font-bold uppercase tracking-wider mt-1 block">Person</span>
                    ) : (
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
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* State Feedback */}
      {processedItems.length === 0 && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 text-gray-400">
          <Filter className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-lg">No results match your current filters.</p>
        </motion.div>
      )}

      {/* Loading & Load More */}
      {loading && (
        <div className="flex justify-center mt-12 mb-4">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      )}
      {hasMore && items.length > 0 && !loading && (
        <div className="flex justify-center mt-12 mb-8">
          <button 
            onClick={loadMore} 
            className="group cursor-pointer flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/50 text-white font-bold rounded-2xl transition-all duration-300 backdrop-blur-md shadow-lg active:scale-95"
          >
            Load More
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}
      {!hasMore && items.length > 0 && !loading && (
        <p className="text-center text-gray-500 mt-12 mb-8">You've reached the end.</p>
      )}
    </div>
  );
}