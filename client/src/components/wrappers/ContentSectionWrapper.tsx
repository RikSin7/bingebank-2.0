/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
import { getMovieImages, getMovieWatchProviders, getMovieReviews } from "@/services/movieService";
import ContentSection from "../movie/ContentSection";

export default async function ContentSectionWrapper({ id, movie }: { id: string, movie: any }) {
  // Fire all the heavy requests in parallel
  const [imagesRes, providersRes, reviewsRes] = await Promise.allSettled([
    getMovieImages(id),
    getMovieWatchProviders(id),
    getMovieReviews(id)
  ]);

  // extract data
  const images = imagesRes.status === "fulfilled" ? imagesRes.value : { backdrops: [] };
  const providers = providersRes.status === "fulfilled" ? providersRes.value : null;
  const reviews = reviewsRes.status === "fulfilled" ? reviewsRes.value.results || [] : [];

  const cast = movie.credits?.cast || [];
  const videos = movie.videos?.results || [];
  const recommendations = movie.recommendations?.results || [];
  const similar = movie.similar?.results || [];
  const backdrops = images?.backdrops || [];

  return (
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
  );
}