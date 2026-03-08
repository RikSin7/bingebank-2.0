export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[100dvh] min-h-[600px] bg-[#030303] overflow-hidden">
      {/* Background Pulse */}
      <div className="absolute inset-0 w-full h-full bg-zinc-900/50 animate-pulse" />
      
      {/* Gradients to match the real hero */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030303] via-[#030303]/40 md:via-transparent to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#030303]/95 via-[#030303]/70 md:via-[#030303]/40 to-transparent" />

      {/* Content Skeleton */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center px-4 md:px-12 pb-24 md:pb-0">
        <div className="max-w-3xl flex flex-col gap-4 md:gap-6">
          
          {/* Badge & Rating Row */}
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-7 md:h-8 w-20 md:w-24 bg-zinc-800/80 animate-pulse rounded-sm" />
            <div className="h-6 w-24 md:w-32 bg-zinc-800/80 animate-pulse rounded-sm" />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2 md:gap-3">
            <div className="h-12 md:h-24 w-full max-w-xl bg-zinc-800/80 animate-pulse rounded-lg" />
            <div className="h-12 md:h-24 w-3/4 max-w-lg bg-zinc-800/80 animate-pulse rounded-lg" />
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-2 pt-2 border-l-2 border-zinc-700/50 pl-4 ml-1">
            <div className="h-3 md:h-4 w-full max-w-2xl bg-zinc-800/60 animate-pulse rounded" />
            <div className="h-3 md:h-4 w-11/12 max-w-2xl bg-zinc-800/60 animate-pulse rounded" />
            <div className="h-3 md:h-4 w-3/4 max-w-2xl bg-zinc-800/60 animate-pulse rounded" />
          </div>

          {/* Premium Button (Only ONE button now) */}
          <div className="pt-2 md:pt-4">
            <div className="h-12 md:h-14 w-full sm:w-48 bg-white/20 animate-pulse rounded-full" />
          </div>
        </div>
      </div>

      {/* "Up Next" Widget Skeleton (Desktop Only) */}
      <div className="absolute right-12 bottom-24 z-30 hidden lg:flex flex-col items-end gap-3">
        <div className="h-4 w-24 bg-zinc-800/80 animate-pulse rounded" />
        <div className="w-64 aspect-video rounded-xl bg-zinc-800/80 animate-pulse border border-white/5" />
      </div>

      {/* Pagination Indicators Skeleton */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 rounded-full bg-black/40 border border-white/5">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`h-1.5 md:h-2 rounded-full animate-pulse ${i === 0 ? "w-10 md:w-16 bg-white/20" : "w-1.5 md:w-2 bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}