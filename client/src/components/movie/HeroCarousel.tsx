"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TrendingItem } from "@/types/movie";
import { tmdbImage } from "@/services/tmdb";
import Link from "next/link";
import Image from "next/image";
import { Film, Tv, Star, Play, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  items: TrendingItem[];
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    timerRef.current = setInterval(goNext, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext]);

  if (!items || items.length === 0) return null;

  return (
    <section className="group relative w-full h-[100dvh] min-h-[500px] overflow-hidden select-none bg-black">

      {/* SLIDE TRACK */}
      <div
        className="flex flex-row w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: mounted
            ? `translateX(-${currentIndex * 100}%)`
            : "translateX(0%)",
        }}
      >
        {items.map((item, index) => {
          const title = item.title || item.name || "Untitled";
          const date = item.release_date || item.first_air_date || "TBA";
          const rating =
            typeof item.vote_average === "number"
              ? item.vote_average.toFixed(1)
              : "NR";
          const isMovie = item.media_type === "movie";
          const detailUrl = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;

          return (
            <div
              key={`${item.id}-${index}`}
              className="relative min-w-full h-full shrink-0"
            >
              {/* Backdrop image */}
              <Image
                src={tmdbImage(item.backdrop_path, "original")}
                alt={title}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
                draggable={false}
              />

              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 md:via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 md:via-black/40 to-transparent" />

              {/* CONTENT WRAPPER */}
              {/* Anchored to bottom-0, but padded upward. 
                  pb-20 (80px) on mobile, pb-24 (96px) on desktop. */}
              <div className="absolute bottom-0 left-4 right-4 md:left-12 lg:left-20 pb-20 md:pb-24 max-w-2xl flex flex-col gap-3 md:gap-4 z-10">

                {/* Badge */}
                <span className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                  {isMovie ? <><Film className="w-3 md:w-3.5" /> Movie</> : <><Tv className="w-3 md:w-3.5" /> TV Show</>}
                </span>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white drop-shadow-2xl leading-tight tracking-tight">
                  {title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs md:text-sm text-gray-300 font-medium">
                  <span className="flex items-center gap-1 text-yellow-400 drop-shadow-md">
                    <Star className="w-3.5 md:w-4 fill-yellow-400" /> {rating}
                  </span>
                  <span>•</span>
                  <span>{date ? date.substring(0, 4) : "TBA"}</span>
                </div>

                {/* Overview */}
                <p className="text-sm md:text-base text-gray-200 line-clamp-2 md:line-clamp-3 max-w-xl drop-shadow-md leading-relaxed">
                  {item.overview || "No overview available."}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 md:pt-4">
                  <Link
                    href={detailUrl}
                    className="flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-3 md:py-3.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                  >
                    <Play className="w-4 fill-black" /> Play Now
                  </Link>
                  <button className="flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-3 md:py-3.5 bg-white/10 text-white font-semibold rounded-lg backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl">
                    <Plus className="w-4" /> Watchlist
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ARROWS */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 lg:w-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 lg:w-6" />
      </button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {items.map((_, i) => (
          <button
            key={`dot-${i}`}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
              i === currentIndex
                ? "w-6 md:w-8 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                : "w-2 md:w-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}