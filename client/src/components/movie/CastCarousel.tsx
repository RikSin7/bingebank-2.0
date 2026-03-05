"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { tmdbImage } from "@/services/tmdb";
import { CastMember } from "@/types/movie";
import { ChevronLeft, ChevronRight, User, X } from "lucide-react";

interface CastCarouselProps {
  cast: CastMember[];
}

export default function CastCarousel({ cast }: CastCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (!cast || cast.length === 0) return null;

  return (
    <section className="relative group/cast">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Cast</h2>

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-12 md:top-16 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/cast:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-12 md:top-16 -translate-y-1/2 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/cast:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cast.map((member, index) => (
            <button
              key={`${member.id}-${member.character}`}
              onClick={() => setSelectedIndex(index)}
              className="flex-shrink-0 w-24 md:w-32 group/card flex flex-col items-center text-center cursor-pointer"
            >
              {/* Profile image (Circular) */}
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-800 mb-3 shadow-lg border-2 border-transparent group-hover/card:border-white/50 transition-colors duration-300">
                {member.profile_path ? (
                  <Image
                    src={tmdbImage(member.profile_path, "w185")}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-800">
                    <User className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                )}
              </div>

              {/* Info */}
              <p className="text-sm font-bold text-white w-full truncate px-1">
                {member.name}
              </p>
              <p className="text-xs text-gray-400 w-full truncate px-1 mt-0.5">
                {member.character}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal for Cast */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-60 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-60"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}
          {selectedIndex < cast.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-60"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Profile Focus */}
          <div
            className="relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-[250px] md:w-[350px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black">
              {cast[selectedIndex].profile_path ? (
                <Image
                  src={tmdbImage(cast[selectedIndex].profile_path, "h632")}
                  alt={cast[selectedIndex].name}
                  fill
                  sizes="(max-width: 768px) 250px, 350px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <User className="w-24 h-24" />
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                {cast[selectedIndex].name}
              </h3>
              <p className="text-lg md:text-xl text-emerald-400 font-medium mt-1">
                {cast[selectedIndex].character}
              </p>
            </div>
          </div>

          {/* Counter */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {selectedIndex + 1} / {cast.length}
          </span>
        </div>
      )}
    </section>
  );
}
