/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/services/tmdb";
import { CastMember } from "@/types/movie";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

interface CastCarouselProps {
  cast: CastMember[];
}

export default function CastCarousel({ cast }: CastCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = window.innerWidth > 768 ? 500 : 300;
    scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (!cast || cast.length === 0) return null;

  return (
    <section className="relative group/cast w-full overflow-hidden">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2 px-4 md:px-0">
        <Users className="w-5 h-5 text-purple-400" /> Cast
      </h2>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[#06020a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[#06020a] to-transparent z-10 pointer-events-none" />

        <div className="absolute top-2 left-0 right-0 h-[100px] md:h-[130px] pointer-events-none z-20 hidden md:flex items-center justify-between px-4">
          <button onClick={() => scroll("left")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/cast:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-500/20 shadow-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="cursor-pointer pointer-events-auto p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white opacity-0 group-hover/cast:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-purple-500/20 shadow-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex py-2 gap-4 md:gap-8 overflow-x-auto px-4 md:px-8 pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {cast.map((member, index) => (
            <Link 
              href={`/person/${member.id}`} 
              key={`${member.id}-${index}`} 
              className="flex-shrink-0 w-[100px] md:w-[130px] group/card flex flex-col items-center text-center cursor-pointer snap-start"
            >
              <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full overflow-hidden bg-[#0a0514] mb-4 shadow-lg border-2 border-white/5 group-hover/card:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500">
                {member.profile_path ? (
                  <Image src={tmdbImage(member.profile_path, "w185")} alt={member.name} fill sizes="130px" className="object-cover group-hover/card:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20 bg-white/5"><Users className="w-10 h-10" /></div>
                )}
              </div>
              <p className="text-sm font-bold text-white w-full truncate group-hover/card:text-purple-400 transition-colors">{member.name}</p>
              <p className="text-xs text-purple-300 w-full truncate mt-1">{member.character}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}