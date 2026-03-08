/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { tmdbImage } from "@/services/tmdb";
import { Star, Loader2 } from "lucide-react";

interface GenreGridProps {
  initialData: any;
  genreId: string;
  genreName: string;
  type: "movie" | "tv";
  fetchAction: (id: string, page: number) => Promise<any>;
}

function filterValidItems(results: any[]): any[] {
  if (!Array.isArray(results)) return [];
  return results.filter((item) => {
    if (item.media_type === "person") return false;
    if (!item.title && !item.name) return false;
    return true;
  });
}

export default function GenreGrid({ initialData, genreId, genreName, type, fetchAction }: GenreGridProps) {
  const [items, setItems] = useState<any[]>(filterValidItems(initialData?.results));
  const [page, setPage] = useState(initialData?.page || 1);
  const [totalPages, setTotalPages] = useState(initialData?.total_pages || 1);
  const [loading, setLoading] = useState(false);
  const fetchIdRef = useRef(0);

  // TMDB limits pagination up to 1000 pages for standard /discover calls safely.
  const hasMore = page < Math.min(totalPages, 500);

  useEffect(() => {
    const currentFetchId = ++fetchIdRef.current;

    const fetchFresh = async () => {
      setLoading(true);
      try {
        const res = await fetchAction(genreId, 1);
        if (currentFetchId !== fetchIdRef.current) return;
        setItems(filterValidItems(res.results));
        setPage(res.page || 1);
        setTotalPages(res.total_pages || 1);
      } catch (e) {
        console.error("Genre fetch error:", e);
        if (currentFetchId !== fetchIdRef.current) return;
        setItems([]);
      } finally {
        if (currentFetchId === fetchIdRef.current) setLoading(false);
      }
    };

    fetchFresh();
  }, [genreId, fetchAction]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const currentFetchId = fetchIdRef.current;
    try {
      const nextPage = page + 1;
      const res = await fetchAction(genreId, nextPage);
      if (currentFetchId !== fetchIdRef.current) return;
      setItems((prev) => {
        const existingIds = new Set(prev.map((i) => i.id));
        const newItems = filterValidItems(res.results).filter((i: any) => !existingIds.has(i.id));
        return [...prev, ...newItems];
      });
      setPage(nextPage);
      setTotalPages(res.total_pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      if (currentFetchId === fetchIdRef.current) setLoading(false);
    }
  };

  return (
    <div className="w-full bg-purple-900/0 pt-12">
      <div className="flex items-center gap-4 mb-10 px-4 md:px-8">
        <div className="h-10 w-1.5 bg-purple-400 rounded-full" />
        <h1 className="text-4xl md:text-5xl text-white tracking-tight">
          {genreName} {type === "movie" ? "Movies" : "TV Shows"}
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {items.map((item, index) => {
              const itemType = type;
              const href = itemType === "movie" ? `/movie/${item.id}` : `/tv/${item.id}`;
              const displayTitle = item.title || item.name;
              const date = item.release_date || item.first_air_date;

              if (!displayTitle) return null;

              return (
                <Link
                  key={`${itemType}-${item.id}-${index}`}
                  href={href}
                  className="flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-purple-900/10 shadow-lg">
                    {item.poster_path ? (
                      <Image
                        src={tmdbImage(item.poster_path, "w500")}
                        alt={displayTitle}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center p-4 text-gray-400">
                        <span className="text-sm font-semibold">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white font-bold text-sm line-clamp-2">{displayTitle}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center text-yellow-400 text-xs font-bold">
                          <Star className="w-3 h-3 fill-yellow-400 mr-1" />
                          {item.vote_average?.toFixed(1) || "NR"}
                        </span>
                        <span className="text-gray-300 text-[10px]">{date?.substring(0, 4)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>

      {loading && (
        <div className="flex justify-center mt-8 mb-4">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
        </div>
      )}

      {hasMore && items.length > 0 && !loading && (
        <div className="flex justify-center mt-12 mb-8">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && items.length > 0 && !loading && (
        <p className="text-center text-gray-500 mt-12 mb-8">You've reached the end.</p>
      )}

      {!loading && items.length === 0 && (
        <div className="flex justify-center items-center h-64 text-gray-400 text-lg">No results found for this genre.</div>
      )}
    </div>
  );
}
