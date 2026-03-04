"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/services/tmdb";
import { Movie } from "@/types/movie";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";

interface MovieRowProps {
  title: string;
  movies: any[]; // Using any because trending endpoint returns a mixed type that has been cast
  exploreLink?: string;
}

export default function MovieRow({ title, movies, exploreLink }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="relative group/row">
      <div className="flex items-center justify-between mb-4 pr-4">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          {title}
        </h2>
        {exploreLink && (
          <Link
            href={exploreLink}
            className="group flex flex-row items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Explore All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/row:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 rounded-2xl"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies
            .filter((m) => m.poster_path)
            .map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="flex-shrink-0 w-[160px] group/card"
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
