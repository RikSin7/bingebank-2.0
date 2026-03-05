import { getTrendingAll } from "@/services/trendingService";
import {
  getTopRatedMovies,
  getPopularMovies,
  getBollywoodMovies,
  getHollywoodMovies,
  getUpcomingMovies,
} from "@/services/movieService";
import { getPopularTVShows, getOnTheAirTVShows, getTopRatedTVShows } from "@/services/tvService";

import HeroCarousel from "@/components/movie/HeroCarousel";
import UpcomingRow from "@/components/movie/UpcomingRow";
import RegionalRow from "@/components/movie/RegionalRow";
import TopRatedRow from "@/components/movie/TopRatedRow";
import PopularRow from "@/components/movie/PopularRow";
import TrendingRow from "@/components/movie/TrendingRow";
import ExpandableSearch from "@/components/common/ExpandableSearch";

export default async function Home() {
  const [
    trending,
    topRatedMovies,
    popularMovies,
    popularTVShows,
    bollywoodMovies,
    hollywoodMovies,
    upcomingMovies,
    onTheAirTVShows,
    topRatedTVShows,
  ] = await Promise.all([
    getTrendingAll(),
    getTopRatedMovies(),
    getPopularMovies(),
    getPopularTVShows(),
    getBollywoodMovies(),
    getHollywoodMovies(),
    getUpcomingMovies(),
    getOnTheAirTVShows(),
    getTopRatedTVShows(),
  ]);

  const heroItems = trending.results
    .filter((item) => item.backdrop_path)
    .slice(0, 10);

  const trendingMovies = trending.results.filter(
    (item) => item.media_type === "movie"
  ) as any[]; // Type cast needed because TrendingItem is a union type
  console.log(trendingMovies);
  const trendingTVShows = trending.results.filter(
    (item) => item.media_type === "tv"
  ) as any[];

  return (
    <main className="min-h-screen bg-black pb-20 relative">
      {/* <ExpandableSearch /> */}
      <HeroCarousel items={heroItems} />

      {/* Rows Container */}
      <div className="mx-auto px-4 md:px-12 space-y-10 md:space-y-12 py-8 relative z-10">
        <TrendingRow
          trendingMovies={trendingMovies}
          trendingTV={trendingTVShows}
        />
        <PopularRow
          popularMovies={popularMovies.results}
          popularTV={popularTVShows.results}
        />
        <TopRatedRow
          topRatedMovies={topRatedMovies.results}
          topRatedTV={topRatedTVShows.results}
        />
        <RegionalRow
          bollywood={bollywoodMovies.results}
          hollywood={hollywoodMovies.results}
        />
        <UpcomingRow
          upcomingMovies={upcomingMovies.results}
          upcomingTV={onTheAirTVShows.results}
        />
      </div>  
    </main>
  );
}
