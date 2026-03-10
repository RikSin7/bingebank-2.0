export default function ContentSkeleton() {
  return (
    <div className="px-4 md:px-12 py-12 flex flex-col gap-12 bg-transparent">
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
  );
}
