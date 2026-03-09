/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { tmdbImage } from "@/services/tmdb";
import { PersonDetail } from "@/types/movie";
import { User } from "lucide-react";

export default function PersonHeroSection({ person }: { person: PersonDetail }) {
  return (
    <section className="w-full bg-gradient-to-b from-zinc-900/50 to-[#030303] pt-24 md:pt-32 pb-12 px-4 md:px-12 border-b border-white/5">
      <div className="mx-auto flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
        
        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="relative shrink-0 group w-[180px] md:w-[280px] aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10"
        >
            {person?.profile_path ? (
                <Image
                    src={tmdbImage(person.profile_path, "w500")}
                    alt={person.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"
                />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center p-4 text-gray-400 bg-zinc-900">
                    {person.profile_path ? <User className="w-12 h-12 mb-2 opacity-50" /> : null}
                    <span className="text-sm font-semibold text-center">No Image</span>
                  </div>
                )}
        </motion.div>

        {/* Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 text-center md:text-left w-full max-w-4xl"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg">
            {person.name}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="px-3 py-1 bg-white/10 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full border border-white/5">
              {person.known_for_department}
            </span>
            {person.birthday && (
              <span className="text-zinc-400 text-xs md:text-sm">
                Born: {new Date(person.birthday).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            )}
            {person.place_of_birth && (
              <span className="text-zinc-400 text-xs md:text-sm">
                • {person.place_of_birth}
              </span>
            )}
          </div>

          {person.biography && (
            <div className="mt-2">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-[10] md:line-clamp-none font-medium">
                {person.biography}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}