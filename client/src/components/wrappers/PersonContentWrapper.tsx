import { getPersonCombinedCredits } from "@/services/personService";
import PersonContentSection from "../person/PersonContentSection";

export default async function PersonContentWrapper({ id, department }: { id: string, department: string }) {
  // 1. Fetch their entire filmography
  const creditsData = await getPersonCombinedCredits(id);

  // 2. Decide which list to show based on their primary job
  const knownFor = department === "Acting" ? creditsData?.cast : creditsData?.crew;

  // 3. Pass it to the Client UI component
  return (
    <PersonContentSection credits={knownFor || []} />
  );
}