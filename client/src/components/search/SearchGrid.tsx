"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { searchMulti } from "@/services/searchService";
import { tmdbImage } from "@/services/tmdb";
import { Star, Loader2 } from "lucide-react";

interface SearchGridProps {
  initialData: any;
  query: string;
}

function filterValidItems(results: any[]): any[] {
  if (!Array.isArray(results)) return [];
  return results.filter((item) => {
    if (item.media_type === "person") return false;
    if (!item.title && !item.name) return false;
    return true;
  });
}

export default function SearchGrid({ initialData, query }: SearchGridProps) {
  const [items, setItems] = useState<any[]>(filterValidItems(initialData?.results));
  const [page, setPage] = useState(initialData?.page || 1);
  const [totalPages, setTotalPages] = useState(initialData?.total_pages || 1);
  const [loading, setLoading] = useState(false);

  const safeTotalPages = Math.min(totalPages, 1000);
  const hasMore = page < safeTotalPages;

  const loadMore = async () => {
    if (loading || !hasMore || !query) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await searchMulti(query, nextPage);
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
      setLoading(false);
    }
  };

  if (!query) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p className="text-gray-400 text-lg">Type something to search for movies and TV shows.</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-12 xl:pt-0">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 border-l-4 border-emerald-400 pl-4">
        Search Results for "{query}"
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {items.map((item, index) => {
          const inferredType = item.media_type || "movie"; // searchMulti always returns media_type, this is just fallback
          const isMovie = inferredType === "movie";
          const href = isMovie ? `/movie/${item.id}` : `/tv/${item.id}`;
          const displayTitle = item.title || item.name;
          const date = item.release_date || item.first_air_date;

          if (!displayTitle) return null;

          return (
            <Link
              key={`search-${inferredType}-${item.id}-${index}`}
              href={href}
              className="flex flex-col gap-2 group cursor-pointer"
            >
              <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 shadow-lg">
                {item.poster_path ? (
                  <Image
                    src={tmdbImage(item.poster_path, "w500")}
                    alt={displayTitle}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center p-4 bg-black text-gray-400">
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

      {items.length === 0 && !!query && !loading && (
        <div className="flex justify-center items-center h-64 text-gray-400 text-lg">No results found.</div>
      )}
    </div>
  );
}
