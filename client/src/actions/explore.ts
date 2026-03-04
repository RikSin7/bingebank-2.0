"use server";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getBollywoodMovies,
  getHollywoodMovies,
  getSimilarMovies,
  getRecommendedMovies,
} from "@/services/movieService";
import {
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getSimilarTVShows,
  getRecommendedTVShows,
} from "@/services/tvService";
import { getTrendingAll } from "@/services/trendingService";

export async function fetchExploreData(category: string, page: number) {
  if (category.startsWith("similar-movie-")) {
    const id = category.replace("similar-movie-", "");
    return getSimilarMovies(id, page);
  }
  if (category.startsWith("recommended-movie-")) {
    const id = category.replace("recommended-movie-", "");
    return getRecommendedMovies(id, page);
  }
  if (category.startsWith("similar-tv-")) {
    const id = category.replace("similar-tv-", "");
    return getSimilarTVShows(id, page);
  }
  if (category.startsWith("recommended-tv-")) {
    const id = category.replace("recommended-tv-", "");
    return getRecommendedTVShows(id, page);
  }

  switch (category) {
    case "trending-movies":
      return getTrendingMovies(page);
    case "popular-movies":
      return getPopularMovies(page);
    case "top-rated-movies":
      return getTopRatedMovies(page);
    case "now-playing-movies":
      return getNowPlayingMovies(page);
    case "bollywood-movies":
      return getBollywoodMovies(page);
    case "hollywood-movies":
      return getHollywoodMovies(page);
    case "trending-tv":
      return getTrendingTVShows(page);
    case "popular-tv":
      return getPopularTVShows(page);
    case "top-rated-tv":
      return getTopRatedTVShows(page);
    case "trending-all":
      return getTrendingAll(page);
    default:
      return getTrendingMovies(page);
  }
}
