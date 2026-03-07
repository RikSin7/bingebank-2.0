import { getTVShowImages, getTVShowWatchProviders, getTVShowReviews } from "@/services/tvService";
import ContentSection from "../movie/ContentSection";

export default async function TVContentSectionWrapper({ id, show }: { id: string, show: any }) {
  // Fire all the heavy requests in parallel
  const [imagesRes, providersRes, reviewsRes] = await Promise.allSettled([
    getTVShowImages(id),
    getTVShowWatchProviders(id),
    getTVShowReviews(id)
  ]);

  // extract data
  const images = imagesRes.status === "fulfilled" ? imagesRes.value : { backdrops: [] };
  const providers = providersRes.status === "fulfilled" ? providersRes.value : null;
  const reviews = reviewsRes.status === "fulfilled" ? reviewsRes.value.results || [] : [];

  const cast = show.credits?.cast || [];
  const videos = show.videos?.results || [];
  const recommendations = show.recommendations?.results || [];
  const similar = show.similar?.results || [];
  const backdrops = images?.backdrops || [];

  return (
    <ContentSection
      item={show} 
      type="tv" 
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
