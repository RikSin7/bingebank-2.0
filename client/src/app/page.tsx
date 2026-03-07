import PopularRowWrapper from "@/components/wrappers/PopularRowWrapper";
import TopRatedRowWrapper from "@/components/wrappers/TopRatedRowWrapper";
import RegionalRowWrapper from "@/components/wrappers/RegionalRowWrapper";
import UpcomingRowWrapper from "@/components/wrappers/UpcomingRowWrapper";
import { Suspense } from "react";
import TrendingRowWrapper from "@/components/wrappers/TrendingRowWrapper";
import RowSkeleton from "@/components/movie/RowSkeleton";
import HeroCarouselWrapper from "@/components/wrappers/HeroCarouselWrapper";
import HeroSkeleton from "@/components/movie/HeroSkeleton";

export default async function Home() {

  return (
    <main className="min-h-screen bg-purple-900/5 relative">
      <Suspense fallback={<HeroSkeleton />}>
        <HeroCarouselWrapper />
      </Suspense>
      <div className="mx-auto px-4 md:px-12 relative z-10">
        {/* Trending row */}
        <Suspense fallback={<RowSkeleton />}>
          <TrendingRowWrapper />
        </Suspense>
        
        <Suspense fallback={<RowSkeleton />}>
          <PopularRowWrapper />
        </Suspense>

        <Suspense fallback={<RowSkeleton />}>
          <TopRatedRowWrapper />
        </Suspense>

        <Suspense fallback={<RowSkeleton />}>
          <RegionalRowWrapper />
        </Suspense>

        <Suspense fallback={<RowSkeleton />}>
          <UpcomingRowWrapper />
        </Suspense>
      </div>  
    </main>
  );
}
