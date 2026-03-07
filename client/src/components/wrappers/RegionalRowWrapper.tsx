import { getBollywoodMovies, getHollywoodMovies } from "@/services/movieService";
import RegionalRow from "../movie/RegionalRow";

export default async function RegionalRowWrapper() {
  const [bollywoodMovies, hollywoodMovies] = await Promise.all([
    getBollywoodMovies(),
    getHollywoodMovies(),
  ]);

  return (
    <RegionalRow 
      bollywood={bollywoodMovies.results} 
      hollywood={hollywoodMovies.results} 
    />
  );
}
