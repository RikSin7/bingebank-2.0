import { getTopRatedMovies } from "@/services/movieService";
import { getTopRatedTVShows } from "@/services/tvService";
import TopRatedRow from "../movie/TopRatedRow";

export default async function TopRatedRowWrapper() {
  const [topRatedMovies, topRatedTVShows] = await Promise.all([
    getTopRatedMovies(),
    getTopRatedTVShows(),
  ]);

  return (
    <TopRatedRow 
      topRatedMovies={topRatedMovies.results} 
      topRatedTV={topRatedTVShows.results} 
    />
  );
}
