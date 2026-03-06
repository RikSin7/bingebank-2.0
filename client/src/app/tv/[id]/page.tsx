import { notFound } from "next/navigation";
import { getTVShowDetails, getTVShowImages } from "@/services/tvService";
import { getTVShowWatchProviders, getTVShowReviews } from "@/services/tvService";
import HeroSection from "@/components/movie/HeroSection";
import ContentSection from "@/components/movie/ContentSection";

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

  let providers = null;
  let reviews: any[] = [];

  try {
    const [providersRes, reviewsRes] = await Promise.all([
      getTVShowWatchProviders(id),
      getTVShowReviews(id)
    ]);
    providers = providersRes;
    reviews = reviewsRes.results || [];
  } catch (error) {
    console.error("Default providers and reviews empty", error);
  }

  const cast = show.credits?.cast || [];
  const videos = show.videos?.results || [];
  const recommendations = show.recommendations?.results || [];
  const similar = show.similar?.results || [];
  const backdrops = images?.backdrops || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection item={show} type="tv" />
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
    </div>
  );
}
