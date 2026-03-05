import { Metadata } from "next";
import { getMoviesByGenre } from "@/services/movieService";
import GenreGrid from "@/components/genre/GenreGrid";

interface MovieGenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: MovieGenrePageProps): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const name = resolvedParams.name ? String(resolvedParams.name) : "Genre";
  return {
    title: `${name} Movies - Bingebank`,
    description: `Browse ${name} movies.`,
  };
}

export default async function MovieGenrePage({ params, searchParams }: MovieGenrePageProps) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const genreName = resolvedSearchParams.name ? String(resolvedSearchParams.name) : "Genre";

  let initialData = null;
  try {
    initialData = await getMoviesByGenre(id, 1);
  } catch (error) {
    console.error("Error fetching movie genre:", error);
  }

  // Server action to fetch more pages
  async function fetchMoreMovies(genreId: string, page: number) {
    "use server";
    return getMoviesByGenre(genreId, page);
  }

  return (
    <div className="min-h-screen bg-black pb-12 pt-8">
      <div className="mx-auto px-4 md:px-12">
        <GenreGrid
          key={id} 
          initialData={initialData}
          genreId={id}
          genreName={genreName}
          type="movie"
          fetchAction={fetchMoreMovies}
        />
      </div>
    </div>
  );
}
