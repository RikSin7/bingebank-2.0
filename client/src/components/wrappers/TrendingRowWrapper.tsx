/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
import { getTrendingAll } from "@/services/trendingService";
import TrendingRow from "../movie/TrendingRow";

export default async function TrendingRowWrapper() {
  // 1. Fetch data specifically for this row
  const trending = await getTrendingAll();

  // 2. Format the data
  const trendingMovies = trending.results.filter((item: any) => item.media_type === "movie") as any[];
  const trendingTVShows = trending.results.filter((item: any) => item.media_type === "tv") as any[];

  // 3. Pass data to the Client Component
  return <TrendingRow trendingMovies={trendingMovies} trendingTV={trendingTVShows} />;
}