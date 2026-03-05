"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/services/tmdb";
import { ChevronLeft, ChevronRight, Star, ArrowRight, ChevronDown } from "lucide-react";

interface RegionalRowProps {
  bollywood: any[];
  hollywood: any[];
}

type RegionalType = "bollywood" | "hollywood";

export default function RegionalRow({ bollywood, hollywood }: RegionalRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<RegionalType>("bollywood");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const currentItems = selectedType === "bollywood" ? bollywood : hollywood;
  if (!currentItems || currentItems.length === 0) return null;

  const exploreLink = selectedType === "bollywood" 
    ? "/explore?category=bollywood-movies" 
    : "/explore?category=hollywood-movies";

  return (
    <section className="relative group/row">
      <div className="flex items-center justify-between mb-4 pr-4">
        {/* Animated Custom minimal Dropdown */}
        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            Blockbusters
          </h2>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-emerald-400 font-semibold text-sm md:text-base transition-colors"
          >
            {selectedType === "bollywood" ? "Bollywood" : "Hollywood"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-gray-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                onClick={() => { setSelectedType("bollywood"); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selectedType === "bollywood" 
                    ? "bg-emerald-500/10 text-emerald-400 font-semibold" 
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Bollywood
              </button>
              <button
                onClick={() => { setSelectedType("hollywood"); setIsDropdownOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  selectedType === "hollywood" 
                    ? "bg-emerald-500/10 text-emerald-400 font-semibold" 
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                Hollywood
              </button>
            </div>
          )}
        </div>

        <Link
          href={exploreLink}
          className="group flex flex-row items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Explore All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-[120px] -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-[120px] -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 rounded-xl"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {currentItems
            .filter((item) => item.poster_path)
            .map((movie) => (
              <Link
                key={`${selectedType}-${movie.id}`}
                href={`/movie/${movie.id}`}
                className="flex-shrink-0 w-[160px] group/card animate-in fade-in duration-500"
              >
                {/* Poster */}
                <div className="relative w-[160px] h-[240px] rounded-xl overflow-hidden bg-gray-800 mb-2">
                  <Image
                    src={tmdbImage(movie.poster_path, "w342")}
                    alt={movie.title}
                    fill
                    sizes="160px"
                    className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Info */}
                <p className="text-sm font-semibold text-white truncate group-hover/card:text-gray-300 transition-colors">
                  {movie.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{movie.vote_average?.toFixed(1) ?? "NR"}</span>
                  {movie.release_date && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{movie.release_date.substring(0, 4)}</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
