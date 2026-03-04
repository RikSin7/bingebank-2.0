import { tmdbFetch } from "./tmdb";
import { TrendingItem, TMDBResponse } from "@/types/movie";

export async function getTrendingAll(page: number = 1): Promise<TMDBResponse<TrendingItem>> {
  return tmdbFetch<TMDBResponse<TrendingItem>>(
    `/trending/all/day?language=en-US&page=${page}`
  );
}
