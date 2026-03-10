import { notFound } from "next/navigation";
import { getTVShowDetails } from "@/services/tvService";
import HeroSection from "@/components/movie/HeroSection";
import TVContentSectionWrapper from "@/components/wrappers/TVContentSectionWrapper";
import ContentSkeleton from "@/components/movie/ContentSkeleton";
import { Suspense } from "react";
import BackButton from "@/components/common/BackButton";
interface TVShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const { id } = await params;

  let show;

  show = await getTVShowDetails(id);
  if (!show) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="absolute md:block hidden top-6 md:left-24 z-50">
        <BackButton />
      </div>
      <HeroSection item={show} type="tv" />
      <Suspense fallback={<ContentSkeleton />}>
        <TVContentSectionWrapper id={id} show={show} />
      </Suspense>
    </div>
  );
}
