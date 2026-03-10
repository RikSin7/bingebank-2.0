export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-[#030303] pb-12 pt-24">
      <div className="mx-auto px-4 md:px-12">
        {/* Title Placeholder */}
            <div className="flex items-center gap-3 md:gap-4 mb-8 ml-4">
              {/* Purple Accent Line */}
              <div className="w-1.5 h-8 md:h-10 bg-purple-500/50 animate-pulse rounded-full" />
              {/* Title Text */}
              <div className="h-8 md:h-10 w-48 md:w-72 bg-zinc-800/50 animate-pulse rounded-lg" />
            </div>

        {/* Grid placeholder */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
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
