export default function GenreLoading() {
  return (
    <div className="min-h-screen bg-[var(--bg-tinted)] pb-12 pt-24">
      <div className="mx-auto px-4 md:px-12">
        {/* Genre header placeholder */}
        <div className="mb-8 flex flex-col gap-2">
          <div className="h-10 w-48 bg-zinc-800/50 animate-pulse rounded-md" />
        </div>

        {/* Grid placeholder */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 lg:gap-6 mt-8">
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
