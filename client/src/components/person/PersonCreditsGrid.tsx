import MediaCard from "../common/MediaCard";

interface PersonCreditsGridProps {
  credits: any[];
}

export default function PersonCreditsGrid({ credits }: PersonCreditsGridProps) {
  if (!credits || credits.length === 0) return <p className="text-zinc-500">No credits found.</p>;

  const uniqueCredits = Array.from(new Map(credits.map(item => [item.id, item])).values())
    .sort((a, b) => b.popularity - a.popularity);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 mt-8">
      {uniqueCredits.map((item: any) => (
        <MediaCard 
          key={`credit-${item.id}`} 
          item={{
            id: item.id,
            title: item.title,
            name: item.name,
            poster_path: item.poster_path,
            media_type: item.media_type,
            vote_average: item.vote_average,
            release_date: item.release_date,
            first_air_date: item.first_air_date,
            character: item.character
          }} 
        />
      ))}
    </div>
  );
}