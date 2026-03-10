"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, ArrowDown } from "lucide-react";
import MediaCard from "../common/MediaCard";

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
        if (!res) {
          setItems([]);
          return;
        }
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
      if (!res) return;
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
    <div className="w-full bg-transparent relative pt-12">
      <div className="flex items-center gap-4 mb-10 px-4 md:px-8">
        <div className="h-10 w-1.5 bg-purple-400 rounded-full" />
        <h1 className="text-4xl md:text-5xl text-[var(--text-primary)] tracking-tight">
          {genreName} {type === "movie" ? "Movies" : "TV Shows"}
        </h1>
      </div>

            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-[var(--gradient-base)] via-transparent to-transparent z-10 pointer-events-none" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {items.map((item, index) => {
              if (!item.title && !item.name) return null;

              return (
                <MediaCard 
                  key={`${type}-${item.id}-${index}`}
                  item={{
                    ...item,
                    media_type: type
                  }} 
                />
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
            className="group cursor-pointer flex items-center gap-3 px-8 py-4 bg-[var(--bg-glass)] hover:bg-emerald-500/10 border border-[var(--border-medium)] hover:border-emerald-500/50 text-[var(--text-primary)] font-bold rounded-2xl transition-all duration-300 backdrop-blur-md"
          >
            Load More
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}

      {!hasMore && items.length > 0 && !loading && (
        <p className="text-center text-gray-500 mt-12 mb-8">You've reached the end.</p>
      )}

      {!loading && items.length === 0 && (
        <div className="flex justify-center items-center h-64 text-[var(--text-muted)] text-lg">No results found for this genre.</div>
      )}
    </div>
  );
}
