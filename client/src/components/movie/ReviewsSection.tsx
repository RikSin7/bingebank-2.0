import Image from "next/image";
import { Review } from "@/types/movie";
import { Star } from "lucide-react";
import { tmdbImage } from "@/services/tmdb";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto aspect-vide text-center rounded-xl">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Reviews</h2>
      <div className="max-h-[500px] text-left overflow-y-auto pr-2 space-y-4 custom-scrollbar">
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
              className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={author.name || author.username}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-white/50">
                      {(author.name || author.username || "A")[0].toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Author Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-semibold truncate">
                      {author.name || author.username}
                    </h3>
                    {author.rating && (
                      <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md text-xs font-medium text-white">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {author.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      Written on {new Date(review.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="text-gray-300 text-sm leading-relaxed prose prose-invert max-w-none">
                {/* We render paragraphs simply by splitting on newlines for safety instead of dangerouslySetInnerHTML if possible, 
                    but TMDB reviews often contain markdown/HTML. Since we want to keep it simple, we can just split newlines or allow basic rendering. */}
                <p className="whitespace-pre-wrap">{review.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
