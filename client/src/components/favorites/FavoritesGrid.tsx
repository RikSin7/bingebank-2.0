"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { hydrateFavorites } from "@/store/slices/favoritesSlice";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Film, Tv, Loader2, Sparkles, User, Filter } from "lucide-react";
import MediaCard from "@/components/common/MediaCard";

type FilterType = "all" | "movie" | "tv" | "person";

export default function FavoritesGrid() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.favorites);
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    // Hydrate state from localStorage strictly on the client
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(hydrateFavorites(parsed));
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e);
      }
    }
    setMounted(true);
  }, [dispatch]);

  if (!mounted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-[var(--bg-primary)] flex justify-center items-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  // Derived state for filtered items
  const filteredItems = filter === "all" ? items : items.filter((item) => item.media_type === filter);

  // Group items for quick stats
  const moviesCount = items.filter((i) => i.media_type === "movie").length;
  const tvCount = items.filter((i) => i.media_type === "tv").length;
  const peopleCount = items.filter((i) => i.media_type === "person").length;

  return (
    <div className="mx-auto relative z-10 pt-12">
      
      {/* HEADER ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
        <div className="flex flex-col gap-4 px-4 md:px-8">
          
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] shrink-0">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl text-[var(--text-primary)] tracking-tight">Your Favorites</h1>
              <p className="text-[var(--text-muted)] mt-1 font-medium">{items.length} items saved</p>
            </div>
          </div>
        </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />

      {/* Type Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--bg-glass)] border border-[var(--border-medium)] rounded-full mr-2">
            <Filter className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Filter</span>
          </div>
          
          {/* Filter Buttons */}
          {(["all", "movie", "tv", "person"] as FilterType[]).map((type) => {
            const labels: Record<FilterType, string> = { all: "All", movie: `Movies (${moviesCount})`, tv: `TV Shows (${tvCount})`, person: `People (${peopleCount})` };
            const icons = { 
              all: <Sparkles className="w-3.5 h-3.5" />, 
              movie: <Film className="w-3.5 h-3.5" />, 
              tv: <Tv className="w-3.5 h-3.5" />, 
              person: <User className="w-3.5 h-3.5" /> 
            };
            const isActive = filter === type;
            
            // Only show filter if there are items, except for 'all'
            if (type !== 'all' && (
              (type === 'movie' && moviesCount === 0) ||
              (type === 'tv' && tvCount === 0) ||
              (type === 'person' && peopleCount === 0)
            )) return null;

            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap border ${
                  isActive 
                    ? "bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-500/50 text-pink-400 dark:text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
                    : "bg-[var(--bg-glass)] border-[var(--border-medium)] text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]"
                }`}
              >
                {icons[type]}
                {labels[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── CONTENT GRID ─── */}
      {filteredItems.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={`${item.media_type}-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <MediaCard item={item as any} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* ─── EMPTY STATE ─── */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center min-h-[50vh] text-center border border-[var(--border-subtle)] rounded-3xl bg-[var(--bg-glass)] backdrop-blur-md px-4 py-16 shadow-xl"
        >
          <div className="w-24 h-24 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center mb-6 shadow-inner border border-[var(--border-subtle)]">
            <Heart className="w-10 h-10 text-[var(--text-muted)] opacity-50" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
            {filter === "all" ? "No favorites yet" : `No favorite ${filter === "person" ? "people" : filter === "tv" ? "TV shows" : "movies"} found`}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-md mx-auto mb-8 leading-relaxed">
            {filter === "all" 
              ? "Start building your personal collection by clicking the heart icon on any movie, TV show, or person you like." 
              : `You haven't added any ${filter === "person" ? "people" : filter === "tv" ? "TV shows" : "movies"} to your favorites yet.`}
          </p>
          <Link 
            href="/explore?category=trending-movies"
            className="px-8 py-3.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold transition-transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Discover Content
          </Link>
        </motion.div>
      )}
    </div>
  );
}
