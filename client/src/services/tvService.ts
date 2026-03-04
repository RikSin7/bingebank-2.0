import { tmdbFetch } from "./tmdb";
import { TVShowDetailResponse, ImageResponse, TMDBResponse, TVShow } from "@/types/movie";

export async function getTrendingTVShows(page: number = 1) {
  return tmdbFetch<TMDBResponse<TVShow>>(`/trending/tv/week?page=${page}`);
}

export async function getPopularTVShows(page: number = 1) {
  return tmdbFetch<TMDBResponse<TVShow>>(`/tv/popular?page=${page}`);
}

export async function getTopRatedTVShows(page: number = 1) {
  return tmdbFetch<TMDBResponse<TVShow>>(`/tv/top_rated?page=${page}`);
}


export async function getTVShowDetails(id: string) {
  return tmdbFetch<TVShowDetailResponse>(
    `/tv/${id}?append_to_response=videos,credits,similar,recommendations`,
    true
  );
}

export async function getTVShowImages(id: string) {
  return tmdbFetch<ImageResponse>(`/tv/${id}/images`, true);
}

export async function getSimilarTVShows(id: string, page: number = 1) {
  return tmdbFetch<TMDBResponse<TVShow>>(`/tv/${id}/similar?page=${page}`);
}

export async function getRecommendedTVShows(id: string, page: number = 1) {
  return tmdbFetch<TMDBResponse<TVShow>>(`/tv/${id}/recommendations?page=${page}`);
}

export async function getTVShowsByGenre(genreId: string, page: number = 1) {
  return tmdbFetch<TMDBResponse<TVShow>>(
    `/discover/tv?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );
}
