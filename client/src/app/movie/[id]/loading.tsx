export default function DetailLoading() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[60vh] md:h-[85vh] bg-zinc-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="absolute bottom-0 w-full px-4 md:px-12 pb-8 md:pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster Skeleton */}
            <div className="hidden md:block w-64 lg:w-72 aspect-[2/3] bg-zinc-800/80 rounded-xl shadow-2xl flex-shrink-0" />
            
            {/* Content Skeleton */}
            <div className="w-full flex flex-col gap-4">
              <div className="h-12 md:h-16 w-3/4 max-w-2xl bg-zinc-800/80 rounded-lg" />
              
              <div className="flex gap-4 items-center">
                <div className="h-6 w-16 bg-zinc-800/80 rounded-full" />
                <div className="h-6 w-24 bg-zinc-800/80 rounded-full" />
                <div className="h-6 w-20 bg-zinc-800/80 rounded-full" />
              </div>

              <div className="flex gap-2">
                <div className="h-8 w-20 bg-zinc-800/80 rounded-full" />
                <div className="h-8 w-24 bg-zinc-800/80 rounded-full" />
                <div className="h-8 w-24 bg-zinc-800/80 rounded-full" />
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <div className="h-4 w-full max-w-3xl bg-zinc-800/80 rounded" />
                <div className="h-4 w-full max-w-3xl bg-zinc-800/80 rounded" />
                <div className="h-4 w-3/4 max-w-3xl bg-zinc-800/80 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeletons (Cast / Media / Similar) */}
      <div className="px-4 md:px-12 py-12 flex flex-col gap-12">
        <div>
          <div className="h-8 w-48 bg-zinc-800/50 rounded-md mb-6 animate-pulse" />
          <div className="flex gap-4 overflow-hidden">
             {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-32 md:w-40 aspect-[2/3] bg-zinc-800/50 rounded-xl animate-pulse" />
             ))}
          </div>
        </div>
        
        <div>
          <div className="h-8 w-64 bg-zinc-800/50 rounded-md mb-6 animate-pulse" />
          <div className="flex gap-4 overflow-hidden">
             {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-64 md:w-80 aspect-video bg-zinc-800/50 rounded-xl animate-pulse" />
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
