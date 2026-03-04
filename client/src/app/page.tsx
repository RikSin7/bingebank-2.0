import { getTrendingAll } from "@/services/trendingService";
import {
  getTopRatedMovies,
  getNowPlayingMovies,
  getBollywoodMovies,
  getHollywoodMovies,
} from "@/services/movieService";
import { getPopularTVShows } from "@/services/tvService";

import HeroCarousel from "@/components/movie/HeroCarousel";
import MovieRow from "@/components/movie/MovieRow";
import TVShowRow from "@/components/movie/TVShowRow";

export default async function Home() {
  const [
    trending,
    topRatedMovies,
    nowPlayingMovies,
    popularTVShows,
    bollywoodMovies,
    hollywoodMovies,
  ] = await Promise.all([
    getTrendingAll(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
    getPopularTVShows(),
    getBollywoodMovies(),
    getHollywoodMovies(),
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
    <main className="min-h-screen bg-black pb-20">
      <HeroCarousel items={heroItems} />

      {/* Rows Container */}
      <div className="mx-auto px-4 space-y-10 md:space-y-12 py-8 relative z-10">
        <MovieRow
          title="Trending Movies"
          movies={trendingMovies}
          exploreLink="/explore?category=trending-movies"
        />
        <TVShowRow
          title="Trending TV Shows"
          shows={trendingTVShows}
          exploreLink="/explore?category=trending-tv"
        />
        <MovieRow
          title="Now Playing"
          movies={nowPlayingMovies.results}
          exploreLink="/explore?category=now-playing-movies"
        />
        <TVShowRow
          title="Popular TV Shows"
          shows={popularTVShows.results}
          exploreLink="/explore?category=popular-tv"
        />
        <MovieRow
          title="Top Rated Movies"
          movies={topRatedMovies.results}
          exploreLink="/explore?category=top-rated-movies"
        />
        <MovieRow
          title="Bollywood Hits"
          movies={bollywoodMovies.results}
          exploreLink="/explore?category=bollywood-movies"
        />
        <MovieRow
          title="Hollywood Blockbusters"
          movies={hollywoodMovies.results}
          exploreLink="/explore?category=hollywood-movies"
        />
      </div>  
    </main>
  );
}
