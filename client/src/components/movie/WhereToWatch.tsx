import Image from "next/image";
import { tmdbImage } from "@/services/tmdb";
import { WatchProvidersResponse, WatchProvider, WatchProvidersData } from "@/types/movie";

interface WhereToWatchProps {
  providersData: WatchProvidersResponse | null;
}

export default function WhereToWatch({ providersData }: WhereToWatchProps) {
  if (!providersData || !providersData.results) return null;

  const results = providersData.results;
  
  // Try to find providers for India first, then fallbacks
  const countryOrder = ["IN", "US", "GB", "CA", "AU"];
  let selectedCountryData: WatchProvidersData | null = null;
  let selectedCountryCode = "";

  for (const code of countryOrder) {
    if (results[code]) {
      selectedCountryData = results[code];
      selectedCountryCode = code;
      break;
    }
  }

  // If none of our preferred countries have data, just pick the first one available
  if (!selectedCountryData) {
    const firstAvailable = Object.keys(results)[0];
    if (firstAvailable) {
      selectedCountryData = results[firstAvailable];
      selectedCountryCode = firstAvailable;
    }
  }

  if (!selectedCountryData) return null;

  // Gather unique providers from flatrate, free, rent, buy
  const uniqueProviders = new Map<number, WatchProvider>();

  const addProviders = (providers?: WatchProvider[]) => {
    if (providers) {
      providers.forEach(p => {
        if (!uniqueProviders.has(p.provider_id)) {
          uniqueProviders.set(p.provider_id, p);
        }
      });
    }
  };

  addProviders(selectedCountryData.flatrate);
  addProviders(selectedCountryData.free);
  addProviders(selectedCountryData.rent);
  addProviders(selectedCountryData.buy);

  const providersList = Array.from(uniqueProviders.values());

  if (providersList.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-white">Where to Watch</h2>
        {selectedCountryData.link && (
          <a
            href={selectedCountryData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Powered by JustWatch ({selectedCountryCode})
          </a>
        )}
      </div>
      
      <div className="flex flex-wrap gap-4">
        {providersList.map(provider => (
          <div 
            key={provider.provider_id} 
            className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            title={provider.provider_name}
          >
            {provider.logo_path && (
              <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0">
                <Image
                  src={tmdbImage(provider.logo_path, "w92")}
                  alt={provider.provider_name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm font-medium text-white">{provider.provider_name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
