"use client";

import { useState, useEffect, useCallback } from "react";
import { TrendingItem } from "@/types/movie";
import { tmdbImage } from "@/services/tmdb";
import Link from "next/link";
import Image from "next/image";
import { Film, Tv, Star, Play, Plus, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "motion/react";

interface HeroCarouselProps {
  items: TrendingItem[];
}

const SLIDE_DURATION = 5000; 

function ProgressiveBackground({ 
  item, 
  priority = false 
}: { 
  item: TrendingItem; 
  priority?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const title = item.title || item.name || "Untitled";

  const highQualitySrc = tmdbImage(item.backdrop_path || item.poster_path, "w1280");
  const lowQualitySrc = tmdbImage(item.backdrop_path || item.poster_path, "w92");

  return (
    <div className="absolute inset-0 w-full h-full bg-[#030303]">
      {/* Low Quality Placeholder (Loads instantly) */}
      <img
        src={lowQualitySrc}
        alt={title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          imageLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* High Quality Image (Fades in once loaded) */}
      <Image
        src={highQualitySrc}
        alt={title}
        fill
        sizes="100vw"
        priority={priority}
        className={`object-cover transition-opacity duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(handleNext, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentIndex, handleNext]);

  if (!items || items.length === 0) return null;

  const currentItem = items[currentIndex];
  const nextItem = items[(currentIndex + 1) % items.length];
  
  const title = currentItem.title || currentItem.name || "Untitled";
  const isMovie = currentItem.media_type === "movie";
  const detailUrl = isMovie ? `/movie/${currentItem.id}` : `/tv/${currentItem.id}`;
  const rating = typeof currentItem.vote_average === "number" ? currentItem.vote_average.toFixed(1) : "NR";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: { opacity: 0, transition: { duration: 0.4 } }
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-transparent select-none font-sans">
      
      {/* ─── 0. SILENT PREFETCHER FOR THE NEXT SLIDE ─── */}
      {/* This invisible image forces the browser to download the next high-res backdrop in the background */}
      <div className="hidden">
        <Image
          src={tmdbImage(nextItem.backdrop_path || nextItem.poster_path, "w1280")}
          alt="prefetch"
          width={1}
          height={1}
          style={{ display: "none" }}
        />
      </div>

      {/* ─── 1. THE "PUSH-THROUGH" BACKGROUNDS ─── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-${currentIndex}`}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Priority is true ONLY for the very first slide on initial page load */}
          <ProgressiveBackground item={currentItem} priority={currentIndex === 0} />
        </motion.div>
      </AnimatePresence>

      {/* ─── 2. THE EDITORIAL GRADIENT MESH ─── */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030303] via-[#030303]/40 md:via-transparent to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030303]/95 via-[#030303]/70 md:via-[#030303]/40 to-transparent" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.4)_100%)]" />

      {/* ─── 3. THE CASCADING CONTENT ─── */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center px-4 md:px-12 pb-28 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-3xl flex flex-col gap-5 md:gap-6 perspective-[1000px]"
          >
            {/* Badge & Rating Row */}
            <motion.div variants={childVariants} className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm bg-white text-black shadow-lg">
                {isMovie ? <><Film className="w-3.5" /> Film</> : <><Tv className="w-3.5" /> Series</>}
              </span>
              <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-sm tracking-wide">
                <Star className="w-4 h-4 fill-yellow-500" /> {rating}
                <span className="text-gray-400 font-medium ml-1">
                  | {currentItem.release_date?.substring(0, 4) || currentItem.first_air_date?.substring(0, 4) || "TBA"}
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div variants={childVariants}>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tighter drop-shadow-2xl">
                {title}
              </h1>
            </motion.div>

            {/* Overview */}
            <motion.p variants={childVariants} className="text-base md:text-lg text-gray-300 line-clamp-2 md:line-clamp-3 max-w-2xl font-light leading-relaxed drop-shadow-lg border-l-2 border-white/20 pl-4 ml-1">
              {currentItem.overview || "No overview available."}
            </motion.p>

            {/* Premium Buttons */}
            <motion.div variants={childVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href={detailUrl}
                className="group relative overflow-hidden flex justify-center items-center gap-2 w-full sm:w-auto px-10 py-4 bg-white text-black font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Play className="w-4 h-4 fill-black" /> Watch Now
              </Link>
              <button className="flex justify-center items-center gap-2 w-full sm:w-auto px-10 py-4 bg-white/5 text-white font-semibold rounded-full backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95">
                <Plus className="w-4 h-4" /> Watchlist
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── 4. THE "UP NEXT" WIDGET & PAGINATION (Desktop Only) ─── */}
      <div className="absolute right-12 bottom-24 z-30 hidden lg:flex flex-col items-end gap-3 cursor-pointer group" onClick={handleNext}>
        <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mr-2 flex items-center gap-2">
          Up Next <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="relative w-64 aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gray-900">
          <Image
            src={tmdbImage(nextItem.backdrop_path, "w500")}
            alt="Next item"
            fill
            sizes="256px"
            className="object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-3 left-4 pr-4">
            <p className="text-white font-bold text-sm truncate">{nextItem.title || nextItem.name}</p>
          </div>
        </div>
        
        {/* ─── 5. THE EDITORIAL PAGINATION ─── */}
        <div className="flex items-center gap-3 font-mono text-sm tracking-widest mt-2 mr-2">
          <span className="text-white font-bold">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ─── 6. THE CAPSULE PROGRESS INDICATORS ─── */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/20 backdrop-blur-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {items.map((_, i) => {
          const isActive = i === currentIndex;
          return (
            <button
              key={`nav-${i}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`relative overflow-hidden rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? "w-12 md:w-16 h-1.5 md:h-2 bg-white/10 shadow-inner"
                  : "w-1.5 md:w-2 h-1.5 md:h-2 bg-white/30 hover:bg-white/60"
              }`}
            >
              {isActive && mounted && (
                <motion.div
                  key={`progress-${currentIndex}`}
                  className="absolute inset-y-0 left-0 bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.4)] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tailwind Custom Animation Injection for the Shimmer Button */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}