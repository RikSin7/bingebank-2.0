"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { searchMulti } from "@/services/searchService";
import { Loader2, User, ChevronDown, Filter, ArrowDownUp, Tv, Film, Sparkles } from "lucide-react";
import MediaCard from "../common/MediaCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSearchFilter, setSearchSort, SearchFilterType, SearchSortType } from "@/store/slices/searchSlice";

interface SearchGridProps {
  initialData: any;
  query: string;
}

function filterValidItems(results: any[]): any[] {
  if (!Array.isArray(results)) return [];
  return results.filter((item) => {
    if (!item.title && !item.name) return false;
    return true;
  });
}

export default function SearchGrid({ initialData, query }: SearchGridProps) {
  const dispatch = useDispatch();
  const { filter, sort } = useSelector((state: RootState) => state.search);
  
  const [items, setItems] = useState<any[]>(filterValidItems(initialData?.results));
  const [page, setPage] = useState(initialData?.page || 1);
  const [totalPages, setTotalPages] = useState(initialData?.total_pages || 1);
  const [loading, setLoading] = useState(false);

  const safeTotalPages = Math.min(totalPages, 1000);
  const hasMore = page < safeTotalPages;

  const loadMore = async () => {
    if (loading || !hasMore || !query) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await searchMulti(query, nextPage);
      if (!res) return;
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
        <p className="text-[var(--text-muted)] text-lg">Type something to search for movies, TV shows, and people.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative pt-12">
      <div className="flex items-center gap-4 mb-8 px-4 md:px-8">
        <div className="h-8 md:h-10 w-1.5 bg-purple-400 rounded-full" />
        <h1 className="text-xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
          Search Results for "{query}"
        </h1>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />

      {/* ─── Premium Filter & Sort Bar ─── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 px-4 md:px-8 mb-10">
        
        {/* Type Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-glass)] border border-[var(--border-medium)] rounded-full mr-2">
            <Filter className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Filter</span>
          </div>
          
          {(["all", "movie", "tv", "person"] as SearchFilterType[]).map((type) => {
            const labels: Record<SearchFilterType, string> = { all: "All", movie: "Movies", tv: "TV Shows", person: "People" };
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
                onClick={() => dispatch(setSearchFilter(type))}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border ${
                  isActive 
                    ? "bg-purple-200 dark:bg-purple-500/20 text-purple-900 dark:text-purple-300 border-purple-400 dark:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                    : "bg-[var(--bg-glass)] text-[var(--text-secondary)] border-[var(--border-medium)] hover:bg-[var(--bg-glass-hover)] hover:border-[var(--border-medium)]"
                }`}
              >
                {icons[type]} {labels[type]}
              </button>
            );
          })}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-glass)] border border-[var(--border-medium)] rounded-full mr-2">
            <ArrowDownUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Sort</span>
          </div>

          {(["relevance", "popularity", "newest", "oldest"] as SearchSortType[]).map((sortType) => {
            const labels: Record<SearchSortType, string> = { relevance: "Relevance", popularity: "Popularity", newest: "Newest", oldest: "Oldest" };
            const isActive = sort === sortType;

            return (
              <button
                key={sortType}
                onClick={() => dispatch(setSearchSort(sortType))}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border ${
                  isActive 
                    ? "bg-emerald-200 dark:bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 border-emerald-400 dark:border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                    : "bg-[var(--bg-glass)] text-[var(--text-secondary)] border-[var(--border-medium)] hover:bg-[var(--bg-glass-hover)] hover:border-[var(--border-medium)]"
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
            if (!item.title && !item.name) return null;

            return (
              <motion.div
                key={`search-${item.media_type}-${item.id}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <MediaCard 
                  item={{
                    id: item.id,
                    title: item.title,
                    name: item.name,
                    poster_path: item.poster_path,
                    profile_path: item.profile_path,
                    media_type: item.media_type,
                    vote_average: item.vote_average,
                    release_date: item.release_date,
                    first_air_date: item.first_air_date
                  }} 
                />
              </motion.div>
            );
          })}
        </div>
      </AnimatePresence>

      {/* State Feedback */}
      {processedItems.length === 0 && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-48 text-[var(--text-muted)]">
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
            className="group cursor-pointer flex items-center gap-3 px-8 py-4 bg-[var(--bg-glass)] hover:bg-purple-500/10 border border-[var(--border-medium)] hover:border-purple-500/50 text-[var(--text-primary)] font-bold rounded-2xl transition-all duration-300 backdrop-blur-md shadow-lg active:scale-95"
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