export default function PersonLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans overflow-hidden">
      
      {/* ─── Hero Section Skeleton ─── */}
      <div className="w-full bg-gradient-to-b from-zinc-900/50 to-[var(--bg-primary)] pt-24 md:pt-32 pb-12 px-4 md:px-12 border-b border-[var(--border-subtle)]">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12">
          
          {/* Profile Image Skeleton */}
          <div className="relative shrink-0 w-[180px] md:w-[280px] aspect-[2/3] rounded-2xl bg-zinc-800/80 animate-pulse shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10" />

          {/* Details Skeleton */}
          <div className="flex flex-col gap-4 items-center md:items-start w-full max-w-4xl mt-2 md:mt-0">
            
            {/* Name */}
            <div className="h-10 md:h-16 w-3/4 max-w-sm md:max-w-md bg-zinc-800/80 animate-pulse rounded-lg" />
            
            {/* Tags (Department, DOB, Birthplace) */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1">
              <div className="h-6 md:h-7 w-20 bg-zinc-800/80 animate-pulse rounded-full" />
              <div className="h-4 md:h-5 w-32 bg-zinc-800/80 animate-pulse rounded" />
              <div className="h-4 md:h-5 w-40 bg-zinc-800/80 animate-pulse rounded" />
            </div>

            {/* Biography */}
            <div className="mt-4 md:mt-6 w-full flex flex-col items-center md:items-start gap-2.5">
              {/* Bio Heading */}
              <div className="h-6 w-24 bg-zinc-800/80 animate-pulse rounded mb-1" />
              
              {/* Bio Paragraph Lines */}
              <div className="h-4 w-full bg-zinc-800/60 animate-pulse rounded" />
              <div className="h-4 w-full bg-zinc-800/60 animate-pulse rounded" />
              <div className="h-4 w-[95%] bg-zinc-800/60 animate-pulse rounded" />
              <div className="h-4 w-[90%] bg-zinc-800/60 animate-pulse rounded" />
              <div className="h-4 w-[60%] bg-zinc-800/60 animate-pulse rounded" />
            </div>
            
          </div>
        </div>
      </div>

      {/* ─── Known For Grid Skeleton ─── */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 py-12">
        
        {/* Section Heading Skeleton */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 rounded-full bg-purple-500/50 animate-pulse" />
          <div className="h-8 w-32 bg-zinc-800/80 animate-pulse rounded-lg" />
        </div>

        {/* Movies/TV Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="w-full aspect-[2/3] bg-zinc-800/60 animate-pulse rounded-xl border border-white/5 shadow-lg" 
            />
          ))}
        </div>
        
      </div>

    </div>
  );
}