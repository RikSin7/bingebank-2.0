"use client";

import { useState } from "react";
import { Video } from "@/types/movie";
import { Play, Youtube } from "lucide-react";
import Image from "next/image";

interface TrailerSectionProps {
  videos: Video[];
}

export default function TrailerSection({ videos }: TrailerSectionProps) {
  const youtubeVideos = videos
    .filter((v) => v.site === "YouTube")
    .sort((a, b) => {
      if (a.type === "Trailer" && b.type !== "Trailer") return -1;
      if (b.type === "Trailer" && a.type !== "Trailer") return 1;
      if (a.official && !b.official) return -1;
      if (b.official && !a.official) return 1;
      return 0;
    });

  const [activeVideo, setActiveVideo] = useState(youtubeVideos[0] || null);

  if (youtubeVideos.length === 0) return null;

  return (
    <section className="w-full mx-auto">
      <h2 className="text-xl justify-center md:text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Youtube className="w-6 h-6 text-red-500" /> Videos & Trailers
      </h2>

      {/* Main player with premium glow */}
      {activeVideo && (
        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-[2rem] overflow-hidden bg-black mb-8 shadow-[0_5px_100px_rgba(168,85,247,0.15)] border border-white/10 group">
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.key}?rel=0&modestbranding=1&autoplay=0`}
            title={activeVideo.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      )}

      {/* Thumbnails list */}
      {youtubeVideos.length > 1 && (
        <div className="flex gap-4 overflow-x-auto mx-auto py-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
          {youtubeVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setActiveVideo(video)}
              className={`flex cursor-pointer shrink-0 relative w-[240px] md:w-[280px] aspect-video rounded-2xl overflow-hidden group transition-all duration-300 snap-start outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border [-webkit-tap-highlight-color:transparent] ${
                activeVideo?.id === video.id
                  ? "border-purple-500/60 scale-[1.02] shadow-[0_4px_12px_rgba(168,85,247,0.15)]"
                  : "border-purple-500/10 hover:border-purple-500/30 hover:scale-[1.01] hover:shadow-[0_4px_12px_rgba(168,85,247,0.08)]"
              }`}
            >
              <Image 
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} 
                alt={video.name} 
                fill 
                className="object-cover" 
                sizes="(max-width: 768px) 240px, 280px"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors backdrop-blur-[2px] group-hover:backdrop-blur-0">
                <div className="bg-purple-600/80 p-3 rounded-full shadow-[0_2px_8px_rgba(168,85,247,0.4)] scale-90 group-hover:scale-105 transition-transform">
                   <Play className="w-5 h-5 text-white fill-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#06020a] to-transparent pt-8 pb-3 px-3">
                <span className="text-xs text-white font-bold line-clamp-2 leading-snug drop-shadow-md">
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