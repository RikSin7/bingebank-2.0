import { notFound } from "next/navigation";
import { getMovieDetails, getMovieImages } from "@/services/movieService";
import { getMovieWatchProviders, getMovieReviews } from "@/services/movieService";
import HeroSection from "@/components/movie/HeroSection";
import ContentSection from "@/components/movie/ContentSection";

interface MoviePageProps {
  params: Promise<{ id: string }>;
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
  const videos = movie.videos?.results || [];
  const recommendations = movie.recommendations?.results || [];
  const similar = movie.similar?.results || [];
  const backdrops = images?.backdrops || [];

  return (
    <div className="min-h-screen bg-purple-900/5 text-white">
      <HeroSection item={movie} type="movie" />
      <ContentSection 
        item={movie} 
        type="movie" 
        providers={providers} 
        backdrops={backdrops} 
        cast={cast} 
        videos={videos} 
        reviews={reviews} 
        recommendations={recommendations} 
        similar={similar} 
      />
    </div>
  );
}
