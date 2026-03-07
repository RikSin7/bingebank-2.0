import { Search } from "lucide-react";

export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-black pb-12 pt-8">
      <div className="mx-auto px-4 md:px-12">
        {/* Search header placeholder */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Search className="h-8 w-8 text-zinc-600 animate-pulse" />
            <div className="h-10 w-64 bg-zinc-800/50 animate-pulse rounded-md" />
          </div>
          <div className="flex gap-4">
            <div className="h-8 w-24 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-8 w-24 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-8 w-24 bg-zinc-800/50 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Grid placeholder */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="w-full aspect-[2/3] bg-zinc-800/50 animate-pulse rounded-xl" />
              <div className="h-4 bg-zinc-800/50 animate-pulse rounded w-3/4 mt-1" />
              <div className="h-3 bg-zinc-800/50 animate-pulse rounded w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
