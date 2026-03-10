/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

"use client";

import Link from "next/link";
import Image from "next/image";
import { tmdbImage } from "@/services/tmdb";
import { Star, Film } from "lucide-react";

interface PersonCreditsGridProps {
  credits: any[];
}

export default function PersonCreditsGrid({ credits }: PersonCreditsGridProps) {
  if (!credits || credits.length === 0) return <p className="text-zinc-500">No credits found.</p>;

  const uniqueCredits = Array.from(new Map(credits.map(item => [item.id, item])).values())
    .sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mt-8">
      {uniqueCredits.map((item: any) => {
        const isMovie = item.media_type === "movie";
        const href = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;
        const title = item.title || item.name;
        const date = item.release_date || item.first_air_date;

        return (
          <Link key={`credit-${item.id}`} href={href} className="flex flex-col gap-2 group cursor-pointer">
            <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-zinc-900 border border-white/5 shadow-lg">
              {item.poster_path ? (
                <Image
                  src={tmdbImage(item.poster_path, "w500")}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center text-zinc-600">
                  <Film className="w-8 h-8 mb-2 opacity-50" />
                </div>
              )}
              
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--bg-elevated)] via-[var(--bg-elevated)]/80 dark:from-black dark:via-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[var(--text-primary)] font-bold text-xs md:text-sm line-clamp-2">{title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="flex items-center text-yellow-500 text-[10px] md:text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-500 mr-1" />
                    {item.vote_average?.toFixed(1) || "NR"}
                  </span>
                  <span className="text-zinc-400 text-[10px]">{date?.substring(0, 4)}</span>
                </div>
                {item.character && (
                  <p className="text-purple-400 text-[10px] mt-1 line-clamp-1 border-t border-white/10 pt-1">
                    as {item.character}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}