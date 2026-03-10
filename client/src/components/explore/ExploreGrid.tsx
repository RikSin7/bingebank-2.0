/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { fetchExploreData, fetchCustomExploreData } from "@/actions/explore";
import {  Loader2, ArrowDown, Filter, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleGenre, setSortBy, setCategory, clearFilters } from "@/store/slices/exploreSlice";
import { MOVIE_GENRES, TV_GENRES } from "@/lib/genres";
import MediaCard from "../common/MediaCard";

interface ExploreGridProps {
  initialData: any;
  category: string;
}

function filterValidItems(results: any[]): any[] {
  if (!Array.isArray(results)) return [];
  return results.filter((item) => {
    if (item.media_type === "person") return false;
    if (!item.title && !item.name) return false;
    return true;
  });
}

// Staggered animation variants for the grid
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function ExploreGrid({ initialData, category }: ExploreGridProps) {
  const [items, setItems] = useState<any[]>(filterValidItems(initialData?.results));
  const [page, setPage] = useState(initialData?.page || 1);
  const [totalPages, setTotalPages] = useState(initialData?.total_pages || 1);
  const [loading, setLoading] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const fetchIdRef = useRef(0);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const { category: reduxCat, sortBy, selectedGenres } = useSelector((state: RootState) => state.explore);
  const dispatch = useDispatch();
  // Sync prop category to Redux on mount or when prop changes
  useEffect(() => {
    if (category && category !== reduxCat) {
      dispatch(setCategory(category as any));
    }
  }, [category, dispatch]);

  // Update URL search parameters when Redux state changes (for discover mode)
  useEffect(() => {
    if (reduxCat === "movies" || reduxCat === "tv") {
      const params = new URLSearchParams();
      params.set("category", reduxCat);
      if (sortBy !== "popularity.desc") params.set("sort", sortBy);
      if (selectedGenres.length > 0) params.set("genres", selectedGenres.join(","));
      
      const newUrl = `/explore?${params.toString()}`;
      // Use replace to avoid polluting depth history with every filter click,
      if (window.location.search !== `?${params.toString()}`) {
         window.history.replaceState(null, "", newUrl);
      }
    } else if (reduxCat.includes("trending") || reduxCat.includes("popular") || reduxCat.includes("top-rated") || reduxCat.includes("upcoming")) {
       // For fixed categories, just update the main category param if needed
       if (window.location.href.includes("/explore") && !window.location.search.includes(`category=${reduxCat}`)) {
          window.history.replaceState(null, "", `/explore?category=${reduxCat}`);
       }
    }
  }, [reduxCat, sortBy, selectedGenres]);

  const hasMore = page < totalPages;

  const isCustomFetch = selectedGenres.length > 0 || sortBy !== "popularity.desc" || reduxCat === "movies" || reduxCat === "tv";

  const fetchItems = async (targetPage: number) => {
    if (isCustomFetch) {
       const mediaType = reduxCat.includes("tv") ? "tv" : "movie";
       return await fetchCustomExploreData(mediaType, targetPage, sortBy, selectedGenres);
    } else {
       // use the route param category as fallback if not custom
       return await fetchExploreData(category, targetPage);
    }
  };

  useEffect(() => {
    const currentFetchId = ++fetchIdRef.current;
    const fetchFresh = async () => {
      setLoading(true);
      try {
        const res = await fetchItems(1);
        if (currentFetchId !== fetchIdRef.current) return;
        setItems(filterValidItems(res.results));
        setPage(res.page || 1);
        setTotalPages(res.total_pages || 1);
      } catch (e) {
        if (currentFetchId === fetchIdRef.current) setItems([]);
      } finally {
        if (currentFetchId === fetchIdRef.current) setLoading(false);
      }
    };
    fetchFresh();
  }, [category, reduxCat, sortBy, selectedGenres]);

  const getTitle = () => {
    if (category.startsWith("similar-movie-")) return "Similar Movies";
    if (category.startsWith("recommended-movie-")) return "Recommended Movies";
    if (category.startsWith("similar-tv-")) return "Similar TV Shows";
    if (category.startsWith("recommended-tv-")) return "Recommended TV Shows";
    switch (category) {
      case "trending-movies": return "Trending Movies";
      case "popular-movies": return "Popular Movies";
      case "top-rated-movies": return "Top Rated Movies";
      case "bollywood-movies": return "Bollywood Hits";
      case "hollywood-movies": return "Hollywood Blockbusters";
      case "upcoming-movies": return "Upcoming Movies";
      case "trending-tv": return "Trending TV Shows";
      case "popular-tv": return "Popular TV Shows";
      case "top-rated-tv": return "Top Rated TV Shows";
      case "on-the-air-tv": return "Upcoming TV Shows";
      default: return "Explore";
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const currentFetchId = fetchIdRef.current;
    try {
      const nextPage = page + 1;
      const res = await fetchItems(nextPage);
      if (currentFetchId !== fetchIdRef.current) return;
      setItems((prev) => [...prev, ...filterValidItems(res.results)]);
      setPage(nextPage);    } catch (e) {
      console.error(e);
    } finally {
      if (currentFetchId === fetchIdRef.current) setLoading(false);
    }
  };

  return (
    <div className="w-full bg-transparent relative pt-12">
      {/* ─── HEADER SECTION ─── */}
      <div className="flex items-center gap-4 mb-10 px-4 md:px-8">
        <div className="h-10 w-1.5 bg-purple-400 rounded-full" />
        <h1 className="text-4xl md:text-5xl text-[var(--text-primary)] tracking-tight">
          {getTitle()}
        </h1>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />

      {/* ─── REDUX FILTER CONTROLS ─── */}
      <div className="flex flex-col gap-6 px-4 md:px-8 mb-10 relative z-20">
        
        {/* Top bar: Category & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Main Categories */}
          <div className="flex bg-[var(--bg-glass)] rounded-full p-1 border border-[var(--border-medium)] shadow-inner w-full md:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              onClick={() => dispatch(setCategory(category.includes("tv") || reduxCat === "tv" ? "trending-tv" : "trending-movies"))}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                reduxCat.includes("trending")
                  ? "bg-[var(--accent-primary)] text-[var(--text-primary)] shadow-lg"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Trending {category.includes("tv") || reduxCat === "tv" ? "TV" : "Movies"}
            </button>
            <button
              onClick={() => dispatch(setCategory(category.includes("tv") || reduxCat === "tv" ? "tv" : "movies"))}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                !reduxCat.includes("trending")
                  ? "bg-[var(--accent-primary)] text-[var(--text-primary)] shadow-lg"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              Discover {category.includes("tv") || reduxCat === "tv" ? "TV Shows" : "Movies"}
            </button>
          </div>

          {/* Sort Dropdown & Clear Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto relative">
            {(!reduxCat.includes("trending") && (selectedGenres.length > 0 || sortBy !== "popularity.desc")) && (
              <button
                onClick={() => dispatch(clearFilters())}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors border border-red-500/20"
                title="Clear Filters"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            
            {!reduxCat.includes("trending") && (
              <div className="relative" ref={sortDropdownRef}>
                {/* Trigger button */}
                <button
                  onClick={() => setSortDropdownOpen((o) => !o)}
                  className="flex cursor-pointer items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-[var(--bg-glass)] border border-[var(--border-medium)] text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)] transition-all duration-300 shadow-sm whitespace-nowrap"
                >
                  {{
                    "popularity.desc": "Most Popular",
                    "vote_average.desc": "Highest Rated",
                    "primary_release_date.desc": "Newest Releases",
                    "revenue.desc": "Top Revenue",
                  }[sortBy] ?? "Sort By"}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${sortDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown panel */}
                <AnimatePresence>
                  {sortDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-3 w-52 bg-[var(--bg-elevated)]/95 backdrop-blur-xl border border-[var(--border-medium)] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden z-50"
                    >
                      {([
                        { value: "popularity.desc", label: "Most Popular" },
                        { value: "vote_average.desc", label: "Highest Rated" },
                        { value: "primary_release_date.desc", label: "Newest Releases" },
                        { value: "revenue.desc", label: "Top Revenue" },
                      ] as const).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { dispatch(setSortBy(opt.value)); setSortDropdownOpen(false); }}
                          className={`w-full cursor-pointer text-left px-5 py-3 text-sm font-medium transition-colors border-l-2 ${
                            sortBy === opt.value
                              ? "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)] border-transparent"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Genres (Only shown in Discover mode) */}
        <AnimatePresence>
          {!reduxCat.includes("trending") && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--bg-glass)] border border-[var(--border-medium)] rounded-full mr-2 shrink-0">
                  <Filter className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Genres</span>
                </div>
                {(category.includes("tv") || reduxCat === "tv" ? TV_GENRES : MOVIE_GENRES).map((genre) => {
                  const isSelected = selectedGenres.includes(genre.id);
                  return (
                    <button
                      key={genre.id}
                      onClick={() => dispatch(toggleGenre(genre.id))}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                        isSelected 
                          ? "bg-[var(--accent-primary)]/20 border-[var(--accent-primary)] text-[var(--accent-primary)] shadow-[0_0_10px_var(--accent-primary-transparent)]" 
                          : "bg-[var(--bg-glass)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)]"
                      }`}
                    >
                      {genre.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── GRID SECTION ─── */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => {
            const inferredType = item.media_type || (category.includes("tv") ? "tv" : "movie");

            return (
              <motion.div key={`${item.id}-${index}`} variants={itemVariants} className="group">
                <MediaCard item={item as any} fallbackMediaType={inferredType} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ─── ACTIONS ─── */}
      {loading && (
        <div className="flex justify-center mt-12">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        </div>
      )}

      {hasMore && !loading && items.length > 0 && (
        <div className="flex justify-center mt-16">
          <button
            onClick={loadMore}
            className="group cursor-pointer flex items-center gap-3 px-8 py-4 bg-[var(--bg-glass)] hover:bg-emerald-500/10 border border-[var(--border-medium)] hover:border-emerald-500/50 text-[var(--text-primary)] font-bold rounded-2xl transition-all duration-300 backdrop-blur-md"
          >
            Load More
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}

      {!hasMore && items.length > 0 && !loading && (
        <p className="text-center text-gray-500 mt-16 font-medium">You've reached the end of the collection.</p>
      )}
    </div>
  );
}