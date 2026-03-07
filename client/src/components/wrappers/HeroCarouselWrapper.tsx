import { getTrendingAll } from "@/services/trendingService";
import HeroCarousel from "../movie/HeroCarousel";

export default async function HeroCarouselWrapper() {
  const trending = await getTrendingAll();
  const heroItems = trending.results
    .filter((item: any) => item.backdrop_path)
    .slice(0, 10);

  return <HeroCarousel items={heroItems} />;
}
