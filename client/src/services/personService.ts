import { PersonCombinedCreditsResponse, PersonDetail } from "@/types/movie";
import { tmdbFetch } from "./tmdb";

export async function getPersonDetails(id: string) {
  return tmdbFetch<PersonDetail>(`/person/${id}?append_to_response=images`, true);
}

export async function getPersonCombinedCredits(id: string) {
  // This gets both Movies and TV Shows they have been a part of in one single call!
  return tmdbFetch<PersonCombinedCreditsResponse>(`/person/${id}/combined_credits`);
}