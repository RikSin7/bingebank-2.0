"use client";

import { useState } from "react";
import Image from "next/image";
import { Review } from "@/types/movie";
import { Star, MessageSquareQuote, ChevronDown } from "lucide-react";
import { tmdbImage } from "@/services/tmdb";
import { motion, AnimatePresence } from "motion/react";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="w-full max-w-4xl mx-auto">
      
      {/* Header & Toggle Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <MessageSquareQuote className="w-5 h-5 text-purple-400" /> 
            Reviews 
          <span className="text-zinc-500 text-lg font-medium ml-1">({reviews.length})</span>
        </h2>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-purple-500/30 text-[var(--text-primary)] text-sm font-semibold transition-all duration-300 shadow-lg active:scale-95"
        >
          <span className="md:block hidden">
            {isExpanded ? "Hide Reviews" : "Read Reviews"}
          </span>
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-500 ${isExpanded ? "rotate-180 text-purple-400" : "group-hover:translate-y-0.5"}`} 
          />
        </button>
      </div>

      {/* Smooth Expand/Collapse Container */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* Custom Scrollbar for premium feel */}
            <div className="max-h-[600px] mt-6 overflow-y-auto pr-2 md:pr-4 space-y-6 pt-2 pb-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500/50 [&::-webkit-scrollbar-thumb]:rounded-full">
              {reviews.map((review) => {
                const author = review.author_details;
                let avatarUrl = author.avatar_path;
                
                if (avatarUrl) {
                  if (avatarUrl.startsWith('/http')) {
                    avatarUrl = avatarUrl.slice(1);
                  } else if (!avatarUrl.startsWith('http')) {
                    avatarUrl = tmdbImage(avatarUrl, "w185");
                  }
                }

                return (
                  <div 
                    key={review.id} 
                    className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-[2rem] p-6 md:p-8 hover:bg-white/[0.04] hover:border-purple-500/20 transition-all duration-300 shadow-lg group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                      
                      {/* Circular Avatar */}
                      <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[var(--bg-surface)] shrink-0 border-2 border-white/10 group-hover:border-purple-500/50 transition-colors">
                        {avatarUrl ? (
                          <Image src={avatarUrl} alt={author.name || author.username} fill sizes="56px" className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-purple-300">
                            {(author.name || author.username || "A")[0].toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Author Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-3">
                          <h3 className="text-[var(--text-primary)] font-bold text-lg truncate">
                            {author.name || author.username}
                          </h3>
                          {author.rating && (
                            <span className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold text-[var(--text-primary)]">
                              <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                              {author.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-[var(--text-muted)] mt-1 font-medium">
                          {new Date(review.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed font-medium">
                      <p className="whitespace-pre-wrap break-words">{review.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}