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
  getUpcomingMovies,
} from "@/services/movieService";
import {
  getTrendingTVShows,
  getPopularTVShows,
  getTopRatedTVShows,
  getSimilarTVShows,
  getRecommendedTVShows,
  getOnTheAirTVShows,
} from "@/services/tvService";
import { getTrendingAll } from "@/services/trendingService";

export async function fetchExploreData(category: string, page: number) {
  let res: any = null;
  if (category.startsWith("similar-movie-")) {
    const id = category.replace("similar-movie-", "");
    res = await getSimilarMovies(id, page);
  } else if (category.startsWith("recommended-movie-")) {
    const id = category.replace("recommended-movie-", "");
    res = await getRecommendedMovies(id, page);
  } else if (category.startsWith("similar-tv-")) {
    const id = category.replace("similar-tv-", "");
    res = await getSimilarTVShows(id, page);
  } else if (category.startsWith("recommended-tv-")) {
    const id = category.replace("recommended-tv-", "");
    res = await getRecommendedTVShows(id, page);
  } else {
    switch (category) {
      case "trending-movies": res = await getTrendingMovies(page); break;
      case "popular-movies": res = await getPopularMovies(page); break;
      case "top-rated-movies": res = await getTopRatedMovies(page); break;
      case "now-playing-movies": res = await getNowPlayingMovies(page); break;
      case "bollywood-movies": res = await getBollywoodMovies(page); break;
      case "hollywood-movies": res = await getHollywoodMovies(page); break;
      case "upcoming-movies": res = await getUpcomingMovies(page); break;
      case "trending-tv": res = await getTrendingTVShows(page); break;
      case "popular-tv": res = await getPopularTVShows(page); break;
      case "top-rated-tv": res = await getTopRatedTVShows(page); break;
      case "on-the-air-tv": res = await getOnTheAirTVShows(page); break;
      case "trending-all": res = await getTrendingAll(page); break;
      default: res = await getTrendingMovies(page);
    }
  }
  return res || { results: [], page: 1, total_pages: 1, total_results: 0 };
}

export async function fetchCustomExploreData(type: "movie" | "tv", page: number, sortBy: string, genres: number[]) {
  const { tmdbFetch } = await import("@/services/tmdb");
  const genresParam = genres.length > 0 ? `&with_genres=${genres.join(",")}` : "";
  const res = await tmdbFetch<any>(
    `/discover/${type}?sort_by=${sortBy}&page=${page}${genresParam}`
  );
  return res || { results: [], page: 1, total_pages: 1, total_results: 0 };
}
