/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */

"use client";

import { motion } from "motion/react";
import { DollarSign, Layers, Tv } from "lucide-react";
import CastCarousel from "@/components/movie/CastCarousel";
import TrailerSection from "@/components/movie/TrailerSection";
import MovieRow from "@/components/movie/MovieRow";
import TVShowRow from "@/components/movie/TVShowRow";
import ScreenshotsSection from "@/components/movie/ScreenshotsSection";
import WhereToWatch from "@/components/movie/WhereToWatch";
import ReviewsSection from "@/components/movie/ReviewsSection";

interface ContentSectionProps {
  item: any;
  type: "movie" | "tv";
  providers: any;
  backdrops: any[];
  cast: any[];
  videos: any[];
  reviews: any[];
  recommendations: any[];
  similar: any[];
}

function formatCurrency(amount: number): string {
  if (!amount) return "—";
  return `$${(amount / 1_000_000).toFixed(1)}M`;
}

// Runtime Formatter for Stats Column
function formatRuntime(minutes: number, isTVShow: boolean = false): string {
  if (!minutes) return "";
  if (isTVShow) return `${minutes}m`;
  
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export default function ContentSection({
  item, type, providers, backdrops, cast, videos, reviews, recommendations, similar,
}: ContentSectionProps) {
  const isMovie = type === "movie";

  // Extract TV calculations
  const runtime = isMovie ? item.runtime : item.episode_run_time?.[0] || 0;
  let totalTVRuntime = 0;
  if (!isMovie && item.number_of_episodes && runtime) {
    totalTVRuntime = item.number_of_episodes * runtime;
  }

  return (
    <div className="mx-auto px-4 md:px-12 relative z-20 space-y-16 pb-20 pt-8 md:pt-16">
      
      {/* Overview & Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Storyline */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1.5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-wide">Storyline</h2>
          </div>
          <div className="bg-[var(--bg-glass)] backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-[var(--border-subtle)] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <p className="relative z-10 text-[var(--text-secondary)] leading-relaxed text-lg font-medium">
              {item.overview || "No overview available."}
            </p>
          </div>
        </motion.section>

        {/* Stats Column */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 lg:mt-[68px]"
        >
          {isMovie ? (
            <>
              {/* MOVIE STATS: Budget & Revenue */}
              {item.budget > 0 && (
                <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/[0.05] to-transparent rounded-[2rem] border border-white/5 shadow-md group hover:border-emerald-500/30 transition-colors">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-0.5">Budget</p>
                    <p className="text-[var(--text-primary)] font-bold text-lg">{formatCurrency(item.budget)}</p>
                  </div>
                </div>
              )}
              {item.revenue > 0 && (
                <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/[0.05] to-transparent rounded-[2rem] border border-white/5 shadow-md group hover:border-purple-500/30 transition-colors">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-0.5">Revenue</p>
                    <p className="text-[var(--text-primary)] font-bold text-lg">{formatCurrency(item.revenue)}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* TV SHOW STATS: Combined Series Info */}
              {(item.number_of_seasons > 0) && (
                <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/[0.05] to-transparent rounded-[2rem] border border-white/5 shadow-md group hover:border-purple-500/30 transition-colors">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-0.5">Series Info</p>
                    <p className="text-[var(--text-primary)] font-bold text-sm sm:text-base xl:text-lg leading-snug">
                      {item.number_of_seasons} Seasons • {item.number_of_episodes} Eps
                      {runtime > 0 && ` • ${formatRuntime(runtime, true)}/ep`}
                      {totalTVRuntime > 0 && ` • Total: ${formatRuntime(totalTVRuntime, false)}`}
                    </p>
                  </div>
                </div>
              )}

              {/* TV SHOW STATS: Network */}
              {item.networks?.[0] && (
                <div className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-white/[0.05] to-transparent rounded-[2rem] border border-white/5 shadow-md group hover:border-sky-500/30 transition-colors">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform">
                    <Tv className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-0.5">Network</p>
                    <p className="text-[var(--text-primary)] font-bold text-lg">{item.networks[0].name}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.section>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-16">
        {providers && <WhereToWatch providersData={providers} />}
        <ScreenshotsSection backdrops={backdrops} />
        <CastCarousel cast={cast} />
        <TrailerSection videos={videos} />
        <ReviewsSection reviews={reviews} />

        <div className="pt-10 border-t border-[var(--border-subtle)] space-y-12">
          {recommendations.length > 0 && (
            isMovie ? (
              <MovieRow title="Recommended" movies={recommendations} exploreLink={`/explore?category=recommended-movie-${item.id}`} />
            ) : (
              <TVShowRow title="Recommended" shows={recommendations} exploreLink={`/explore?category=recommended-tv-${item.id}`} />
            )
          )}
          {similar.length > 0 && (
            isMovie ? (
              <MovieRow title="Similar Movies" movies={similar} exploreLink={`/explore?category=similar-movie-${item.id}`} />
            ) : (
              <TVShowRow title="Similar TV Shows" shows={similar} exploreLink={`/explore?category=similar-tv-${item.id}`} />
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}