export default function RowSkeleton() {
  return (
    <div className="w-full py-6 mb-8">
      {/* Title Skeleton */}
      <div className="h-8 w-48 bg-white/10 rounded-md animate-pulse mb-6 ml-4 md:ml-8" />
      {/* Cards Skeleton */}
      <div className="flex gap-4 md:gap-6 px-4 md:px-8 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px] aspect-[2/3] bg-white/5 rounded-2xl animate-pulse" 
          />
        ))}
      </div>
    </div>
  );
}