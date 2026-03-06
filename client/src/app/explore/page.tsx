import { fetchExploreData } from "@/actions/explore";
import ExploreGrid from "@/components/explore/ExploreGrid";

interface ExplorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const resolvedParams = await searchParams;
  const category = (resolvedParams.category as string) || "trending-all";

  // Fetch initial first page
  const initialData = await fetchExploreData(category, 1);

  return (
    <div className="min-h-screen bg-purple-900/5 pb-12 pt-8">
      <div className="mx-auto px-4 md:px-12">
        <ExploreGrid initialData={initialData} category={category} />
      </div>
    </div>
  );
}
