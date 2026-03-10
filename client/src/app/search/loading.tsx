export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#030303] pb-12 pt-24">
      <div className="mx-auto px-4 md:px-12">
        
        {/* Header placeholder */}
        <div className="flex gap-4 mb-8 ml-4">
          <div className="h-8 w-44 bg-zinc-800/50 animate-pulse rounded-full" />
        </div>

        {/* Filter & Sort Bar Placeholder*/}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10 ml-4 overflow-hidden">
          
          {/* Left: Type Filters Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-20 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-10 w-24 bg-purple-500/20 animate-pulse rounded-full border border-purple-500/30" />
            <div className="h-10 w-28 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-10 w-32 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-10 w-28 bg-zinc-800/50 animate-pulse rounded-full" />
          </div>

          {/* Right: Sort Options Skeleton */}
          <div className="items-center gap-2 hidden sm:flex">
            <div className="h-9 w-20 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-10 w-32 bg-emerald-500/20 animate-pulse rounded-full border border-emerald-500/30" />
            <div className="h-10 w-28 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-10 w-28 bg-zinc-800/50 animate-pulse rounded-full" />
          </div>
        </div>

        {/* Grid placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Poster Skeleton */}
              <div className="w-full aspect-[2/3] bg-zinc-800/50 animate-pulse rounded-2xl border border-white/5" />
              
              {/* Text Meta Skeleton (Sitting outside the poster) */}
              <div className="mt-3 px-1 flex flex-col gap-1.5">
                <div className="h-4 md:h-5 bg-zinc-800/50 animate-pulse rounded w-3/4" />
                <div className="flex gap-2 mt-1">
                  <div className="h-3 md:h-4 bg-zinc-800/50 animate-pulse rounded w-12" />
                  <div className="h-3 md:h-4 bg-zinc-800/50 animate-pulse rounded w-8" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}