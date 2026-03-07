export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-purple-900/5 pb-12 pt-8">
      <div className="mx-auto px-4 md:px-12">
        {/* Filter bar placeholder */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="h-8 w-48 bg-zinc-800/50 animate-pulse rounded-md" />
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-10 w-32 bg-zinc-800/50 animate-pulse rounded-full" />
            <div className="h-10 w-32 bg-zinc-800/50 animate-pulse rounded-full" />
          </div>
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
