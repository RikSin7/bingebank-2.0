import { getPopularMovies } from "@/services/movieService";
import { getPopularTVShows } from "@/services/tvService";
import PopularRow from "../movie/PopularRow";

export default async function PopularRowWrapper() {
  const [popularMovies, popularTVShows] = await Promise.all([
    getPopularMovies(),
    getPopularTVShows(),
  ]);

  return (
    <PopularRow 
      popularMovies={popularMovies.results} 
      popularTV={popularTVShows.results} 
    />
  );
}
