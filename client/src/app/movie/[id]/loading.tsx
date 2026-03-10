import ContentSkeleton from "@/components/movie/ContentSkeleton";

export default function DetailLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      
      {/* ─── Hero Section Skeleton ─── */}
      <section className="relative mt-24 md:mt-0 w-full min-h-[70vh] lg:min-h-[90vh] flex flex-col items-center justify-end overflow-hidden">
        
        {/* Backdrop Skeleton */}
        <div className="absolute inset-0 w-full h-full bg-zinc-900/50 animate-pulse z-0" />
        
        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--gradient-base)] via-[var(--gradient-base)]/90 to-transparent z-0" />

        {/* Hero Content Wrapper */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 md:px-12 pb-8 md:pb-16 pt-[15vh] md:pt-[35vh]">
          
          {/* ─── EXACT SAME RESPONSIVE GRID AS HERO SECTION ─── */}
          <div className="grid gap-x-4 sm:gap-x-6 md:gap-x-10 gap-y-5 md:gap-y-2 items-end w-full md:grid-rows-[1fr_auto] grid-cols-[clamp(130px,38vw,180px)_1fr] sm:grid-cols-[180px_1fr] md:grid-cols-[auto_1fr]">
            
            {/* 1. Poster Skeleton (Now visible on mobile!) */}
            <div className="col-span-1 row-span-1 md:row-span-2 relative shrink-0 aspect-[4/6] rounded-xl md:rounded-[2rem] bg-zinc-800/80 animate-pulse shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/5 md:w-[260px] lg:w-[320px]" />

            {/* 2. Title & Tagline Skeleton */}
            <div className="col-start-2 row-start-1 flex flex-col gap-2 md:gap-3 w-full pb-1 md:pb-0">
              
              {/* Genres Pills */}
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                <div className="h-5 md:h-7 w-12 md:w-16 bg-zinc-800/80 animate-pulse rounded-full" />
                <div className="h-5 md:h-7 w-16 md:w-20 bg-zinc-800/80 animate-pulse rounded-full" />
              </div>

              {/* Title Block */}
              <div className="flex flex-col gap-2 mt-1">
                <div className="h-8 sm:h-10 md:h-14 lg:h-20 w-full max-w-sm md:max-w-xl bg-zinc-800/80 animate-pulse rounded-lg" />
                <div className="h-8 sm:h-10 md:h-14 lg:h-20 w-2/3 max-w-xs md:max-w-md bg-zinc-800/80 animate-pulse rounded-lg" />
              </div>

              {/* Tagline */}
              <div className="h-4 sm:h-5 md:h-6 lg:h-8 w-5/6 max-w-xs md:max-w-md bg-zinc-800/80 animate-pulse rounded-md mt-1" />
            </div>

            {/* 3. Metadata Capsules & Crew Skeleton */}
            <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-2 flex flex-col gap-4 w-full">
              
              {/* Metadata Capsules */}
              <div className="flex flex-wrap items-center justify-start gap-2 md:gap-3 mt-2 md:mt-0">
                <div className="h-7 md:h-9 w-16 md:w-20 bg-zinc-800/80 animate-pulse rounded-full" />
                <div className="h-7 md:h-9 w-24 md:w-28 bg-zinc-800/80 animate-pulse rounded-full" />
                <div className="h-7 md:h-9 w-28 md:w-32 bg-zinc-800/80 animate-pulse rounded-full" />
                <div className="h-7 md:h-9 w-32 md:w-36 bg-zinc-800/80 animate-pulse rounded-full" />
              </div>

              {/* Crew Info Pill */}
              <div className="h-10 md:h-12 w-full max-w-xs md:max-w-sm bg-zinc-800/80 animate-pulse rounded-2xl md:rounded-full mt-1" />
            </div>

          </div>
        </div>
      </section>

      {/* ─── Content Section Skeletons (Cast / Media / Similar) ─── */}
      <ContentSkeleton />
    </div>
  );
}