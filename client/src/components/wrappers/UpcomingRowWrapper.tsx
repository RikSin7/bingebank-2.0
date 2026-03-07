import { getUpcomingMovies } from "@/services/movieService";
import { getOnTheAirTVShows } from "@/services/tvService";
import UpcomingRow from "../movie/UpcomingRow";

export default async function UpcomingRowWrapper() {
  const [upcomingMovies, upcomingTV] = await Promise.all([
    getUpcomingMovies(),
    getOnTheAirTVShows(),
  ]);

  return (
    <UpcomingRow 
      upcomingMovies={upcomingMovies.results} 
      upcomingTV={upcomingTV.results} 
    />
  );
}
