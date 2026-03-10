/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchExploreData } from "@/actions/explore";
import { tmdbImage } from "@/services/tmdb";
import { Star, Loader2, ArrowDown } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
  const fetchIdRef = useRef(0);

  const isSidebarOpen = useSelector((state: RootState) => state.state.isSidebarOpen);

  const hasMore = page < totalPages;

  useEffect(() => {
    const currentFetchId = ++fetchIdRef.current;
    const fetchFresh = async () => {
      setLoading(true);
      try {
        const res = await fetchExploreData(category, 1);
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
  }, [category]);

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
      const res = await fetchExploreData(category, nextPage);
      if (currentFetchId !== fetchIdRef.current) return;
      setItems((prev) => [...prev, ...filterValidItems(res.results)]);
      setPage(nextPage);
    } catch (e) {
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
            const href = inferredType === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;
            const displayTitle = item.title || item.name;
            const date = item.release_date || item.first_air_date;

            return (
              <motion.div key={`${item.id}-${index}`} variants={itemVariants} className="group">
                <Link href={href} className="block w-full aspect-[2/3] relative rounded-2xl overflow-hidden bg-zinc-900/80 border border-[var(--border-subtle)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                  {item.poster_path ? (
                    <Image
                      src={tmdbImage(item.poster_path, "w500")}
                      alt={displayTitle}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center p-4 text-[var(--text-muted)]">
                      <span className="text-sm font-semibold">No Image</span>
                    </div>
                  )}
                  
                  {/* Glass Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-5 flex flex-col justify-end">
                    <p className="text-[var(--text-primary)] font-bold text-lg leading-snug">{displayTitle}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs">
                      <span className="flex items-center text-yellow-500 font-bold bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
                        <Star className="w-3 h-3 fill-yellow-500 mr-1" />
                        {item.vote_average?.toFixed(1) || "NR"}
                      </span>
                      {date && <span className="text-[var(--text-muted)] font-medium">{date.substring(0, 4)}</span>}
                    </div>
                  </div>
                </Link>
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