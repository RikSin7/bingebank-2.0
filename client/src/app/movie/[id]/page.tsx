import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getMovieImages } from "@/services/movieService";
import { tmdbImage } from "@/services/tmdb";
import CastCarousel from "@/components/movie/CastCarousel";
import TrailerSection from "@/components/movie/TrailerSection";
import MovieRow from "@/components/movie/MovieRow";
import ScreenshotsSection from "@/components/movie/ScreenshotsSection";
import WhereToWatch from "@/components/movie/WhereToWatch";
import ReviewsSection from "@/components/movie/ReviewsSection";
import { Star, Clock, Calendar, Globe, DollarSign } from "lucide-react";
import { getMovieWatchProviders, getMovieReviews } from "@/services/movieService";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function formatCurrency(amount: number): string {
  if (!amount) return "—";
  return `$${(amount / 1_000_000).toFixed(1)}M`;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  let movie;
  let images;

  try {
    movie = await getMovieDetails(id);
  } catch {
    notFound();
  }

  try {
    images = await getMovieImages(id);
  } catch {
    images = { backdrops: [] };
  }

  let providers = null;
  let reviews: any[] = [];

  try {
    const [providersRes, reviewsRes] = await Promise.all([
      getMovieWatchProviders(id),
      getMovieReviews(id)
    ]);
    providers = providersRes;
    reviews = reviewsRes.results || [];
  } catch (error) {
    console.error("Default providers and reviews empty", error);
  }

  const cast = movie.credits?.cast || [];
  const crew = movie.credits?.crew || [];
  const director = crew.find((c) => c.job === "Director");
  const writers = crew
    .filter((c) => c.department === "Writing")
    .slice(0, 3);
  const videos = movie.videos?.results || [];
  const trailer = videos.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const recommendations = movie.recommendations?.results || [];
  const similar = movie.similar?.results || [];
  const backdrops = images?.backdrops || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* previous parts remain identical */}
      <section className="relative w-full h-[70vh] md:h-[80vh]">
        {/* Backdrop */}
        {movie.backdrop_path && (
          <Image
            src={tmdbImage(movie.backdrop_path, "original")}
            alt={movie.title}
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
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 pb-12 z-10">
          <div className="flex flex-col md:flex-row gap-8 items-end md:items-end mx-auto">
            {/* Poster */}
            {movie.poster_path && (
              <div className="hidden md:block relative w-[220px] lg:w-[260px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 shrink-0">
                <Image
                  src={tmdbImage(movie.poster_path, "w500")}
                  alt={movie.title}
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
                {movie.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/movie/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                    className="px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                {movie.title}
                {movie.release_date && (
                  <span className="text-white/40 font-light ml-3 text-2xl md:text-3xl">
                    ({movie.release_date.substring(0, 4)})
                  </span>
                )}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-lg text-gray-300 italic">{movie.tagline}</p>
              )}

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1.5 text-yellow-400 font-bold text-base">
                  <Star className="w-5 h-5 fill-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                  <span className="text-gray-500 font-normal text-xs ml-1">
                    ({movie.vote_count.toLocaleString()})
                  </span>
                </span>

                {movie.runtime > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {formatRuntime(movie.runtime)}
                  </span>
                )}

                {movie.release_date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}

                {movie.original_language && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-gray-400" />
                    {movie.original_language.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Director/Writer */}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                {director && (
                  <p>
                    <span className="text-gray-500">Director: </span>
                    <span className="text-white font-medium">{director.name}</span>
                  </p>
                )}
                {writers.length > 0 && (
                  <p>
                    <span className="text-gray-500">Writers: </span>
                    <span className="text-white font-medium">
                      {writers.map((w) => w.name).join(", ")}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT SECTIONS ─── */}
      <div className="mx-auto px-4 md:px-12 space-y-12 pb-12">
        {/* Overview */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Overview</h2>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-4xl">
            {movie.overview || "No overview available."}
          </p>
        </section>

        {/* Stats row */}
        {(movie.budget > 0 || movie.revenue > 0) && (
          <section className="flex flex-wrap gap-6">
            {movie.budget > 0 && (
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Budget</p>
                  <p className="text-white font-semibold">{formatCurrency(movie.budget)}</p>
                </div>
              </div>
            )}
            {movie.revenue > 0 && (
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Revenue</p>
                  <p className="text-white font-semibold">{formatCurrency(movie.revenue)}</p>
                </div>
              </div>
            )}
            {movie.status && (
              <div className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                  <p className="text-white font-semibold">{movie.status}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Where to Watch */}
        {providers && <WhereToWatch providersData={providers} />}

        {/* Screenshots */}
        <ScreenshotsSection backdrops={backdrops} />

        {/* Cast */}
        <CastCarousel cast={cast} />

        {/* Trailers */}
        <TrailerSection videos={videos} />

        {/* Reviews */}
        <ReviewsSection reviews={reviews} />

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <MovieRow
            title="Recommended"
            movies={recommendations}
            exploreLink={`/explore?category=recommended-movie-${id}`}
          />
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <MovieRow
            title="Similar Movies"
            movies={similar}
            exploreLink={`/explore?category=similar-movie-${id}`}
          />
        )}
      </div>
    </div>
  );
}
