"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { tmdbImage } from "@/services/tmdb";
import { Backdrop } from "@/types/movie";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface ScreenshotsSectionProps {
  backdrops: Backdrop[];
}

export default function ScreenshotsSection({ backdrops }: ScreenshotsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!backdrops || backdrops.length === 0) return null;

  // Show up to 50 backdrops
  const images = backdrops.slice(0, 50);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 500;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative group/shots">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
        Screenshots
      </h2>

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/shots:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover/shots:opacity-100 transition-all duration-300 hover:bg-black/80 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Carousel Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((backdrop, index) => (
            <button
              key={backdrop.file_path}
              onClick={() => setSelectedIndex(index)}
              className="flex-shrink-0 relative w-[280px] md:w-[400px] lg:w-[480px] aspect-video rounded-xl overflow-hidden bg-gray-800 group cursor-pointer shadow-lg"
            >
              <Image
                src={tmdbImage(backdrop.file_path, "w780")}
                alt={`Screenshot ${index + 1}`}
                fill
                sizes="(max-width: 768px) 280px, (max-width: 1024px) 400px, 480px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-2xl" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 md:p-8"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-60 p-2 md:p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            onClick={() => setSelectedIndex(null)}
            aria-label="Close"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Navigation */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-60"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
              aria-label="Previous"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          )}
          {selectedIndex < images.length - 1 && (
            <button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-60"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
              aria-label="Next"
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          )}

          {/* Image */}
          <div
            className="relative w-full max-w-[90vw] md:max-w-[80vw] aspect-video rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={tmdbImage(images[selectedIndex].file_path, "original")}
              alt={`Screenshot ${selectedIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Counter */}
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium tracking-widest bg-black/50 px-3 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
}
