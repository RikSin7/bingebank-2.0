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

// Simplified since HeroSection only formats movie runtimes now
function formatRuntime(minutes: number): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
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
  const year = date ? date.substring(0, 4) : "";
  
  const runtime = isMovie ? item.runtime : item.episode_run_time?.[0] || 0;
  
  const crew = item.credits?.crew || [];
  const director = crew.find((c: any) => c.job === "Director");
  const writers = crew.filter((c: any) => c.department === "Writing").slice(0, 3);
  const creators = item.created_by || [];

  return (
    <section className="relative bg-[#303030] mt-24 md:mt-0 w-full min-h-[70vh] lg:min-h-[90vh] flex flex-col items-center justify-end overflow-hidden">
      {/* ─── Backdrop Image ─── */}
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
            className="object-contain object-top md:object-cover md:object-center"
          />
        </motion.div>
      )}

      {/* ─── Dynamic Gradient Overlays ─── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent z-0 md:hidden block" />
       <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-0 hidden md:block" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent hidden md:block z-0" />

      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />

      {/* ─── Hero Content Wrapper ─── */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 pb-8 md:pb-16 pt-[15vh] md:pt-[35vh]">
        
        {/* ─── Responsive Grid Layout ─── */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={`grid gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-5 md:gap-y-2 items-end w-full md:grid-rows-[1fr_auto] ${
            item.poster_path 
              ? "grid-cols-[clamp(130px,50vw,180px)_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-[auto_1fr]" 
              : "grid-cols-1"
          }`}
        >
          
          {/* 1. Poster (Spans 2 rows on desktop, 1 row on mobile) */}
          {item.poster_path && (
            <motion.div 
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="col-span-1 row-span-1 md:row-span-2 relative shrink-0 aspect-[4/6] rounded-xl md:rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 group md:w-[260px] lg:w-[320px]"
            >
              <div className="absolute inset-0 bg-purple-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <Image
                src={tmdbImage(item.poster_path, "w500")}
                alt={title}
                fill
                unoptimized
                priority
                sizes="(max-width: 768px) 40vw, 320px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          )}

          {/* 2. Title & Tagline (Next to poster on mobile AND desktop) */}
          <div className={`${item.poster_path ? "col-start-2" : "col-start-1"} row-start-1 flex flex-col gap-2 md:gap-3 w-full pb-1 md:pb-0`}>
            
            {/* Genres */}
            {item.genres && item.genres.length > 0 && (
              <motion.div variants={fadeUpItem} className="flex flex-wrap gap-1.5 md:gap-2 justify-start">
                {item.genres.map((genre: any) => (
                  <Link
                    key={genre.id}
                    href={`/${type}/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                    className="px-3 py-1 md:px-4 md:py-1.5 text-[9px] md:text-xs font-bold uppercase tracking-wider rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:bg-[var(--bg-elevated)] hover:text-white hover:border-purple-500/40 transition-all duration-300 shadow-lg"
                  >
                    {genre.name}
                  </Link>
                ))}
              </motion.div>
            )}

            {/* Title */}
            <motion.h1 variants={fadeUpItem} className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl">
              {title}
              {year && (
                <span className="text-gray-400 font-light text-lg sm:text-2xl md:text-4xl lg:text-5xl ml-2 md:ml-4 inline-block align-baseline">
                  ({year})
                </span>
              )}
            </motion.h1>

            {/* Tagline */}
            {item.tagline && (
              <motion.p variants={fadeUpItem} className="text-sm sm:text-base md:text-xl lg:text-2xl text-purple-200/80 italic font-light drop-shadow-md">
                "{item.tagline}"
              </motion.p>
            )}
          </div>

          {/* 3. Metadata Capsules & Crew (Underneath on mobile, Right side on desktop) */}
          <div className={`col-span-2 md:col-span-1 ${item.poster_path ? "md:col-start-2" : "col-start-1"} md:row-start-2 flex flex-col gap-4 w-full`}>
            
            {/* Metadata Capsules */}
            <motion.div variants={fadeUpItem} className="flex flex-wrap items-center justify-start gap-2 md:gap-3 text-[11px] md:text-sm text-gray-300">
              
              {/* Rating */}
              {item.vote_average !== undefined && (
                <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10 shadow-inner">
                  <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-bold text-white text-xs md:text-base leading-none">{item.vote_average.toFixed(1)}</span>
                </span>
              )}

              {/* Views */}
              {item.vote_count > 0 && (
                <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                  <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
                  <span className="font-medium text-white">{item.vote_count.toLocaleString()} Views</span>
                </span>
              )}

              {/* Movie Runtime (Hidden for TV Shows) */}
              {isMovie && runtime > 0 && (
                <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                  <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
                  <span className="font-medium text-white">{formatRuntime(runtime)}</span>
                </span>
              )}

              {/* Date */}
              {date && (
                <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                  <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
                  <span className="font-medium text-white">
                    {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </span>
              )}

              {/* Language */}
              {item.original_language && (
                <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md border border-white/10">
                  <Globe className="w-3.5 h-3.5 md:w-4 md:h-4 text-purple-400" />
                  <span className="font-medium uppercase text-white">{item.original_language}</span>
                </span>
              )}
            </motion.div>

            {/* Crew Info */}
            {(isMovie ? (director || writers.length > 0) : (creators && creators.length > 0)) && (
              <motion.div variants={fadeUpItem} className="flex flex-wrap justify-start items-center gap-x-4 md:gap-x-6 gap-y-2 text-[11px] md:text-sm mt-1 px-4 md:px-6 py-3 md:py-4 rounded-2xl md:rounded-full bg-white/5 backdrop-blur-xl border border-white/5 shadow-lg w-fit max-w-full">
                {isMovie ? (
                  <>
                    {director && (
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-semibold">Director</span>
                        <Link href={`/person/${director.id}`} className="text-white font-medium tracking-wide hover:text-purple-400 transition-colors">
                          {director.name}
                        </Link>
                      </div>
                    )}
                    {director && writers.length > 0 && (
                      <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />
                    )}
                    {writers.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-semibold">Writers</span>
                        <span className="text-white font-medium tracking-wide line-clamp-1">
                          {writers.map((w: any, index: number) => (
                            <span key={w.id}>
                              <Link href={`/person/${w.id}`} className="hover:text-purple-400 transition-colors">{w.name}</Link>
                              {index < writers.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {creators && creators.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-purple-400 font-semibold">Created by</span>
                        <span className="text-white font-medium tracking-wide">
                          {creators.map((c: any, index: number) => (
                            <span key={c.id}>
                              <Link href={`/person/${c.id}`} className="hover:text-purple-400 transition-colors">{c.name}</Link>
                              {index < creators.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            )}

          </div>
        </motion.div>

      </div>
    </section>
  );
}