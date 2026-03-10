import { fetchExploreData } from "@/actions/explore";
import BackButton from "@/components/common/BackButton";
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
    <div className="min-h-screen bg-[var(--bg-tinted)] pb-12 pt-8">
      <div className="absolute md:block hidden top-6 md:left-24 z-50">
        <BackButton />
      </div>
      <div className="mx-auto">
        <ExploreGrid initialData={initialData} category={category} />
      </div>
    </div>
  );
}
