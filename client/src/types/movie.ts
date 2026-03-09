export interface TrendingItem {
  id: number;
  title?: string;        // Movies have "title"
  name?: string;         // TV shows have "name"
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  original_language?: string;
  popularity?: number;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
}

// ── Movie Detail Types ──

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  known_for_department: string;
  gender: number;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  gender: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface WatchProvidersData {
  link: string;
  flatrate?: WatchProvider[];
  free?: WatchProvider[];
  buy?: WatchProvider[];
  rent?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, WatchProvidersData>;
}

export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ReviewsResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  status: string;
  budget: number;
  revenue: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  original_language: string;
  popularity: number;
  imdb_id: string | null;
  homepage: string | null;
}

export interface MovieDetailResponse extends MovieDetail {
  videos: { results: Video[] };
  credits: MovieCredits;
  similar: { results: Movie[] };
  recommendations: { results: Movie[] };
}

// ── Backdrops / Images ──

export interface Backdrop {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ImageResponse {
  id: number;
  backdrops: Backdrop[];
}

// ── TV Show Detail Types ──

export interface TVShowDetail {
  id: number;
  name: string;
  overview: string;
  tagline: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  episode_run_time: number[];
  vote_average: number;
  vote_count: number;
  status: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  original_language: string;
  popularity: number;
  homepage: string | null;
  networks: { id: number; name: string; logo_path: string | null }[];
  created_by: { id: number; name: string; profile_path: string | null }[];
}

export interface TVShowDetailResponse extends TVShowDetail {
  videos: { results: Video[] };
  credits: MovieCredits;
  similar: { results: TVShow[] };
  recommendations: { results: TVShow[] };
}


// ── Person Types ──

export interface PersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
}

export interface PersonCredit {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  character?: string;
  job?: string;
  popularity: number;
}

export interface PersonCombinedCreditsResponse {
  cast: PersonCredit[];
  crew: PersonCredit[];
}