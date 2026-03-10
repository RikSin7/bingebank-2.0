import Link from "next/link";
import Image from "next/image";
import { tmdbImage } from "@/services/tmdb";
import { Star, Play, User, Film, ArrowRight } from "lucide-react";
import FavoriteButton from "@/components/common/FavoriteButton";

export interface MediaCardItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  profile_path?: string | null;
  media_type?: "movie" | "tv" | "person";
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
  character?: string;
}

interface MediaCardProps {
  item: MediaCardItem;
  fallbackMediaType?: "movie" | "tv" | "person";
}

export default function MediaCard({ item, fallbackMediaType }: MediaCardProps) {
  // Determine media type
  const mediaType = item.media_type || fallbackMediaType || "movie";
  
  const isPerson = mediaType === "person";
  const displayTitle = item.title || item.name || "Unknown";
  const imagePath = item.poster_path || item.profile_path;
  const date = item.release_date || item.first_air_date;

  return (
    <div className="group relative w-full h-full">
      <Link 
        href={`/${isPerson ? "person" : mediaType}/${item.id}`}
        className="block w-full aspect-[2/3] relative rounded-2xl overflow-hidden bg-zinc-900 border border-[var(--border-subtle)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] focus:outline-none focus:ring-2 focus:ring-pink-500/50"
      >
        {imagePath ? (
          <Image
            src={tmdbImage(imagePath, "w500")}
            alt={displayTitle}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center p-4 text-[var(--text-muted)] bg-zinc-900">
            {isPerson ? (   
              <User className="w-12 h-12 mb-2 opacity-50" />
            ) : (
              <Film className="w-12 h-12 mb-2 opacity-50" />
            )}
            <span className="text-sm font-semibold text-center">No Image</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Hover Content */}
        <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {!isPerson && (
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center text-xs font-bold text-yellow-500 bg-yellow-500/20 px-2 py-1 rounded-md border border-yellow-500/30 backdrop-blur-md">
                  <Star className="w-3 h-3 fill-yellow-500 mr-1" />
                  {item.vote_average?.toFixed(1) || "NR"}
                </span>
                {date && (
                  <span className="text-xs font-semibold text-white/80 bg-black/40 px-2 py-1 rounded-md backdrop-blur-md">
                    {date.substring(0, 4)}
                  </span>
                )}
              </div>
            )}
            <h3 className="text-white font-bold text-sm md:text-base leading-snug line-clamp-2 drop-shadow-md">
              {displayTitle}
            </h3>
            {item.character && (
              <p className="text-white/70 text-[10px] md:text-xs mt-1 line-clamp-1 italic border-t border-white/10 pt-1">
                as {item.character}
              </p>
            )}
            <div className="mt-2 flex items-center text-xs font-semibold text-pink-400 capitalize">
              {mediaType === "movie" ? "Movie" : mediaType === "tv" ? "TV Show" : "Person"}
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </Link>
      
      {/* Floating Action Buttons */}
      <div className="absolute top-2 right-2">
        <FavoriteButton 
          item={{
            id: item.id,
            title: displayTitle,
            poster_path: imagePath || null,
            media_type: mediaType,
            vote_average: item.vote_average,
            release_date: date
          }} 
          className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 shadow-lg border border-white/10" 
        />
      </div>
      
      {/* Quick Watch Button (Movies/TV only) */}
      {!isPerson && (
        <Link 
          href={`/${mediaType}/${item.id}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-1/2 transition-all duration-300 hover:scale-110 hover:bg-white/30"
          aria-label={`Play ${displayTitle}`}
        >
          <Play className="w-5 h-5 text-white fill-white ml-0.5" />
        </Link>
      )}
    </div>
  );
}
