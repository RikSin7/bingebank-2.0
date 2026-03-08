import { searchMulti } from "@/services/searchService";
import SearchGrid from "@/components/search/SearchGrid";
import BackButton from "@/components/common/BackButton";

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = (resolvedParams.query as string) || "";

  // Fetch initial first page on the server if query exists
  const initialData = query ? await searchMulti(query, 1) : null;

  return (
    <div className="min-h-screen bg-black pb-12 pt-8">
      <div className="absolute md:block hidden top-6 md:left-24 z-50">
        <BackButton />
      </div>
      <div className="mx-auto px-4 md:px-12">
        <SearchGrid key={query} initialData={initialData} query={query} />
      </div>
    </div>
  );
}
