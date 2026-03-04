import { Metadata } from "next";
import { getTVShowsByGenre } from "@/services/tvService";
import GenreGrid from "@/components/genre/GenreGrid";

interface TVGenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: TVGenrePageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const name = resolvedParams.name ? String(resolvedParams.name) : "Genre";
  return {
    title: `${name} TV Shows - Bingebank`,
    description: `Browse ${name} TV Shows.`,
  };
}

export default async function TVShowGenrePage({ params, searchParams }: TVGenrePageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const genreName = resolvedSearchParams.name ? String(resolvedSearchParams.name) : "Genre";

  let initialData = null;
  try {
    initialData = await getTVShowsByGenre(id, 1);
  } catch (error) {
    console.error("Error fetching TV genre:", error);
  }

  // Server action to fetch more pages
  async function fetchMoreTV(genreId: string, page: number) {
    "use server";
    return getTVShowsByGenre(genreId, page);
  }

  return (
    <div className="min-h-screen bg-black pb-12 pt-8">
      <div className="mx-auto px-4">
        <GenreGrid
          key={id} 
          initialData={initialData}
          genreId={id}
          genreName={genreName}
          type="tv"
          fetchAction={fetchMoreTV}
        />
      </div>
    </div>
  );
}
