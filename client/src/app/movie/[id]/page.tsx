import { notFound } from "next/navigation";
import { getMovieDetails } from "@/services/movieService";
import HeroSection from "@/components/movie/HeroSection";
import ContentSectionWrapper from "@/components/wrappers/ContentSectionWrapper";
import ContentSkeleton from "@/components/movie/ContentSkeleton";
import { Suspense } from "react";
import BackButton from "@/components/common/BackButton";
interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  let movie;

  try {
    movie = await getMovieDetails(id);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-purple-900/5 text-white">
      <div className="absolute md:block hidden top-6 md:left-24 z-50">
        <BackButton />
      </div>
      <HeroSection item={movie} type="movie" />
      <Suspense fallback={<ContentSkeleton />}>
        <ContentSectionWrapper id={id} movie={movie} />
      </Suspense>
    </div>
  );
}
