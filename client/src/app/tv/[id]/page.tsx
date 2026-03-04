import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTVShowDetails, getTVShowImages } from "@/services/tvService";
import { tmdbImage } from "@/services/tmdb";
import CastCarousel from "@/components/movie/CastCarousel";
import TrailerSection from "@/components/movie/TrailerSection";
import TVShowRow from "@/components/movie/TVShowRow";
import ScreenshotsSection from "@/components/movie/ScreenshotsSection";
import { Star, Clock, Calendar, Globe, Layers } from "lucide-react";

interface TVShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const { id } = await params;

  let show;
  let images;

  try {
    show = await getTVShowDetails(id);
  } catch {
    notFound();
  }

  try {
    images = await getTVShowImages(id);
  } catch {
    images = { backdrops: [] };
  }

  const creators = show.created_by || [];
  const cast = show.credits?.cast || [];
  const videos = show.videos?.results || [];
  const recommendations = show.recommendations?.results || [];
  const similar = show.similar?.results || [];
  const backdrops = images?.backdrops || [];

  const runtime = show.episode_run_time?.[0] || 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full h-[70vh] md:h-[80vh]">
        {/* Backdrop */}
        {show.backdrop_path && (
          <Image
            src={tmdbImage(show.backdrop_path, "original")}
            alt={show.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-12 z-10">
          <div className="flex flex-col md:flex-row gap-8 items-end md:items-end mx-auto">
            {/* Poster */}
            {show.poster_path && (
              <div className="hidden md:block relative w-[220px] lg:w-[260px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 shrink-0">
                <Image
                  src={tmdbImage(show.poster_path, "w500")}
                  alt={show.name}
                  fill
                  sizes="260px"
                  className="object-cover"
                />
              </div>
            )}

            {/* Info */}
            <div className="flex flex-col gap-3 pb-2">
              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {show.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/tv/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                    className="px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                {show.name}
                {show.first_air_date && (
                  <span className="text-white/40 font-light ml-3 text-2xl md:text-3xl">
                    ({show.first_air_date.substring(0, 4)})
                  </span>
                )}
              </h1>

              {/* Tagline */}
              {show.tagline && (
                <p className="text-lg text-gray-300 italic">{show.tagline}</p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5 text-yellow-400 font-bold text-base">
                  <Star className="w-5 h-5 fill-yellow-400" />
                  {show.vote_average?.toFixed(1) || "NR"}
                  <span className="text-gray-500 font-normal text-xs ml-1">
                    ({show.vote_count?.toLocaleString() || 0})
                  </span>
                </span>

                {runtime > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {runtime}m / ep
                  </span>
                )}

                {show.first_air_date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(show.first_air_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {show.status === "Ended" && show.last_air_date
                      ? ` - ${show.last_air_date.substring(0, 4)}`
                      : " - Present"}
                  </span>
                )}

                {show.original_language && (
                  <span className="flex items-center gap-1.5 uppercase">
                    <Globe className="w-4 h-4 text-gray-400" />
                    {show.original_language}
                  </span>
                )}
              </div>

              {/* Creator */}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mt-1">
                {creators && creators.length > 0 && (
                  <p>
                    <span className="text-gray-500">Created by: </span>
                    <span className="text-white font-medium">
                      {creators.map((c) => c.name).join(", ")}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTIONS ─── */}
      <div className="mx-auto px-4 space-y-12 pb-12">
        {/* Overview */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-4xl">
            {show.overview || "No overview available."}
          </p>
        </section>

        {/* Stats row (Seasons/Episodes) */}
        <section className="flex flex-wrap gap-6">
          {(show.number_of_seasons > 0 || show.number_of_episodes > 0) && (
            <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10">
              <Layers className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Seasons / Episodes</p>
                <p className="text-white font-semibold">
                  {show.number_of_seasons > 0 ? `${show.number_of_seasons} ${show.number_of_seasons === 1 ? 'Season' : 'Seasons'}` : ""}
                  {show.number_of_seasons > 0 && show.number_of_episodes > 0 ? " • " : ""}
                  {show.number_of_episodes > 0 ? `${show.number_of_episodes} ${show.number_of_episodes === 1 ? 'Episode' : 'Episodes'}` : ""}
                </p>
              </div>
            </div>
          )}
          {show.status && (
            <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                <p className="text-white font-semibold">{show.status}</p>
              </div>
            </div>
          )}
        </section>

        {/* Screenshots */}
        <ScreenshotsSection backdrops={backdrops} />

        {/* Cast */}
        <CastCarousel cast={cast} />

        {/* Trailers */}
        <TrailerSection videos={videos} />

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <TVShowRow
            title="Recommended"
            shows={recommendations}
            exploreLink={`/explore?category=recommended-tv-${id}`}
          />
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <TVShowRow
            title="Similar TV Shows"
            shows={similar}
            exploreLink={`/explore?category=similar-tv-${id}`}
          />
        )}
      </div>
    </div>
  );
}
