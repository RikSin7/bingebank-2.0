"use client";

import { useState } from "react";
import { Video } from "@/types/movie";
import { Play } from "lucide-react";

interface TrailerSectionProps {
  videos: Video[];
}

export default function TrailerSection({ videos }: TrailerSectionProps) {
  // Filter for YouTube trailers/teasers, prefer official
  const youtubeVideos = videos
    .filter((v) => v.site === "YouTube")
    .sort((a, b) => {
      // Prioritize official trailers
      if (a.type === "Trailer" && b.type !== "Trailer") return -1;
      if (b.type === "Trailer" && a.type !== "Trailer") return 1;
      if (a.official && !b.official) return -1;
      if (b.official && !a.official) return 1;
      return 0;
    });

  const [activeVideo, setActiveVideo] = useState(youtubeVideos[0] || null);

  if (youtubeVideos.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-xl text-center md:text-2xl font-bold text-white mb-4">
        Videos & Trailers
      </h2>

      {/* Main player */}
      {activeVideo && (
        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden bg-black mb-6 shadow-2xl border border-white/5">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.key}?rel=0&modestbranding=1`}
            title={activeVideo.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* Thumbnails list */}
      {youtubeVideos.length > 1 && (
        <div className="flex gap-4 overflow-x-auto mx-auto rounded-xl" style={{ scrollbarWidth: "none" }}>
          {youtubeVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className={`flex-shrink-0 relative w-[220px] md:w-[260px] aspect-video rounded-xl overflow-hidden group border-2 transition-all duration-300 ${
                activeVideo?.id === video.id
                  ? "border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] scale-[1.02]"
                  : "border-transparent hover:border-white/30"
              }`}
            >
              {/* YouTube thumbnail */}
              <img
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt={video.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <Play className="w-8 h-8 text-white fill-white/80 drop-shadow-lg" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent pt-6 pb-2 px-2">
                <span className="text-[11px] text-white font-medium line-clamp-2 leading-tight">
                  {video.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
