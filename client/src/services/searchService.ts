"use server"

import { tmdbFetch } from "./tmdb";
import { TMDBResponse, TrendingItem } from "@/types/movie";

export async function searchMulti(query: string, page: number = 1) {
  return tmdbFetch<TMDBResponse<TrendingItem>>(
    `/search/multi?query=${encodeURIComponent(query)}&page=${page}`
  );
}
