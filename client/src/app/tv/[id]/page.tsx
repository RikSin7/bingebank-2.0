import { notFound } from "next/navigation";
import { getTVShowDetails } from "@/services/tvService";
import HeroSection from "@/components/movie/HeroSection";
import TVContentSectionWrapper from "@/components/wrappers/TVContentSectionWrapper";
import ContentSkeleton from "@/components/movie/ContentSkeleton";
import { Suspense } from "react";
interface TVShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const { id } = await params;

  let show;

  try {
    show = await getTVShowDetails(id);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection item={show} type="tv" />
      <Suspense fallback={<ContentSkeleton />}>
        <TVContentSectionWrapper id={id} show={show} />
      </Suspense>
    </div>
  );
}
