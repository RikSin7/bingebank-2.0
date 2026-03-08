/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { tmdbImage } from "@/services/tmdb";
import { Star, Clock, Calendar, Globe, Eye } from "lucide-react";

interface HeroSectionProps {
  item: any;
  type: "movie" | "tv";
}

function formatRuntime(minutes: number): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection({ item, type }: HeroSectionProps) {
  const isMovie = type === "movie";
  
  const title = isMovie ? item.title : item.name;
  const date = isMovie ? item.release_date : item.first_air_date;
  const runtime = isMovie ? item.runtime : item.episode_run_time?.[0] || 0;
  const crew = item.credits?.crew || [];
  const director = crew.find((c: any) => c.job === "Director");
  const writers = crew.filter((c: any) => c.department === "Writing").slice(0, 3);
  const creators = item.created_by || [];

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-screen flex flex-col items-center justify-end overflow-hidden">
      {/* ─── Cinematic Backdrop Image ─── */}
      {item.backdrop_path && (
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image
            src={tmdbImage(item.backdrop_path, "w1280")}
            alt={title}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover opacity-60 md:opacity-80"
          />
        </motion.div>
      )}

      {/* ─── Dynamic Gradient Overlays ─── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06020a] via-[#06020a]/80 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#06020a]/90 via-[#06020a]/50 to-transparent hidden md:block z-0" />
      <div className="absolute top-[10%] right-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-900/0 blur-[120px] rounded-full pointer-events-none mix-blend-screen z-0" />

      {/* ─── Hero Content Wrapper ─── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 mt-44 md:mt-0 flex flex-col md:flex-row items-end gap-8 lg:gap-12 pb-8 md:pb-16">
        
        {/* ─── Poster (Left side) ─── */}
        {item.poster_path && (
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="relative shrink-0 md:min-h-[400px] aspect-[2/3] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 group"
            style={{ width: "clamp(120px, 30vw, 320px)" }} 
          >
            <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <Image
              src={tmdbImage(item.poster_path, "w500")}
              alt={title}
              fill
              unoptimized
              priority
              sizes="(max-width: 768px) 150px, 320px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        )}

        {/* ─── Info Block (Right side) ─── */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 text-left items-start pb-2 w-full"
        >
          {/* Genres */}
          {item.genres && item.genres.length > 0 && (
            <motion.div variants={fadeUpItem} className="flex flex-wrap gap-2 justify-start">
              {item.genres.map((genre: any) => (
                <Link
                  key={genre.id}
                  href={`/${type}/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                  className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-200 hover:bg-black hover:text-white hover:border-purple-500/40 transition-all duration-300 shadow-lg"
                >
                  {genre.name}
                </Link>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1 variants={fadeUpItem} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight drop-shadow-2xl">
            {title}
          </motion.h1>

          {/* Tagline */}
          {item.tagline && (
            <motion.p variants={fadeUpItem} className="text-lg md:text-2xl text-purple-200/80 italic font-light drop-shadow-md">
              "{item.tagline}"
            </motion.p>
          )}

          {/* ─── METADATA CAPSULES (The Screenshot Style) ─── */}
          <motion.div variants={fadeUpItem} className="flex flex-wrap items-center justify-start gap-3 text-sm text-gray-200 mt-2">
            
            {/* Rating */}
            {item.vote_average !== undefined && (
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10 shadow-inner">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-white text-base leading-none">{item.vote_average.toFixed(1)}</span>
              </span>
            )}

            {/* Views (Vote Count) */}
            {item.vote_count > 0 && (
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="font-medium text-white">{item.vote_count.toLocaleString()} Views</span>
              </span>
            )}

            {/* Runtime / Episodes */}
            {runtime > 0 && (
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="font-medium text-white">
                  {isMovie ? formatRuntime(runtime) : `${item.number_of_seasons} Seasons • ${item.number_of_episodes} Eps`}
                </span>
              </span>
            )}

            {/* Release Date */}
            {date && (
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="font-medium text-white">
                  {new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </span>
            )}

            {/* Language */}
            {item.original_language && (
              <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="font-medium uppercase text-white">{item.original_language}</span>
              </span>
            )}
          </motion.div>

          {/* ─── Creators / Directors / Writers (Capsule Style) ─── */}
          {(isMovie ? (director || writers.length > 0) : (creators && creators.length > 0)) && (
            <motion.div variants={fadeUpItem} className="flex flex-wrap justify-start items-center gap-x-6 gap-y-2 text-sm mt-2 px-6 py-4 rounded-full bg-white/5 backdrop-blur-xl border border-white/5 shadow-lg w-fit max-w-full">
              {isMovie ? (
                <>
                  {director && (
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-semibold">Director</span>
                      <span className="text-white font-medium tracking-wide">{director.name}</span>
                    </div>
                  )}
                  {director && writers.length > 0 && (
                    <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                  )}
                  {writers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-semibold">Writers</span>
                      <span className="text-white font-medium tracking-wide line-clamp-1">{writers.map((w: any) => w.name).join(", ")}</span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {creators && creators.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400 font-semibold">Created by</span>
                      <span className="text-white font-medium tracking-wide">{creators.map((c: any) => c.name).join(", ")}</span>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
}