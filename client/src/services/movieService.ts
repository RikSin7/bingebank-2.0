import { tmdbFetch } from "./tmdb";
import { 
  MovieDetailResponse, 
  ImageResponse, 
  TMDBResponse, 
  Movie,
  WatchProvidersResponse,
  ReviewsResponse
} from "@/types/movie";

export async function getTrendingMovies(page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(`/trending/movie/week?page=${page}`);
}

export async function getPopularMovies(page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(`/movie/popular?page=${page}`);
}

export async function getTopRatedMovies(page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(`/movie/top_rated?page=${page}`);
}

export async function getNowPlayingMovies(page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(`/movie/now_playing?page=${page}`);
}

export async function getUpcomingMovies(page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(`/movie/upcoming?page=${page}`);
}

export async function getBollywoodMovies(page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(
    `/discover/movie?with_original_language=hi&region=IN&sort_by=popularity.desc&page=${page}`
  );
}

export async function getHollywoodMovies(page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(
    `/discover/movie?with_original_language=en&region=US&sort_by=popularity.desc&page=${page}`
  );
}

export async function getMovieDetails(id: string) {
  return tmdbFetch<MovieDetailResponse>(
    `/movie/${id}?append_to_response=videos,credits,similar,recommendations`,
    true
  );
}

export async function getMovieImages(id: string) {
  return tmdbFetch<ImageResponse>(`/movie/${id}/images`, true);
}

export async function getSimilarMovies(id: string, page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(`/movie/${id}/similar?page=${page}`);
}

export async function getRecommendedMovies(id: string, page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(`/movie/${id}/recommendations?page=${page}`);
}

export async function getMoviesByGenre(genreId: string, page: number = 1) {
  return tmdbFetch<TMDBResponse<Movie>>(
    `/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );
}

export async function getMovieWatchProviders(id: string) {
  return tmdbFetch<WatchProvidersResponse>(`/movie/${id}/watch/providers`);
}

export async function getMovieReviews(id: string, page: number = 1) {
  return tmdbFetch<ReviewsResponse>(`/movie/${id}/reviews?page=${page}`);
}
