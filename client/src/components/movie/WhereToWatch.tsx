import Image from "next/image";
import { tmdbImage } from "@/services/tmdb";
import { WatchProvidersResponse, WatchProvider, WatchProvidersData } from "@/types/movie";
import { Play } from "lucide-react";

interface WhereToWatchProps {
  providersData: WatchProvidersResponse | null;
}

export default function WhereToWatch({ providersData }: WhereToWatchProps) {
  if (!providersData || !providersData.results) return null;

  const results = providersData.results;
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

  if (!selectedCountryData) {
    const firstAvailable = Object.keys(results)[0];
    if (firstAvailable) {
      selectedCountryData = results[firstAvailable];
      selectedCountryCode = firstAvailable;
    }
  }

  if (!selectedCountryData) return null;

  const uniqueProviders = new Map<number, WatchProvider>();
  const addProviders = (providers?: WatchProvider[]) => {
    if (providers) {
      providers.forEach(p => {
        if (!uniqueProviders.has(p.provider_id)) uniqueProviders.set(p.provider_id, p);
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
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Play className="w-5 h-5 text-purple-400 fill-purple-400/20" /> Where to Watch
        </h2>
        {selectedCountryData.link && (
          <a
            href={selectedCountryData.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20"
          >
            JustWatch ({selectedCountryCode})
          </a>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {providersList.map(provider => (
          <div 
            key={provider.provider_id} 
            className="flex items-center gap-3 pr-4 pl-1.5 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all shadow-md group"
            title={provider.provider_name}
          >
            {provider.logo_path && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                <Image
                  src={tmdbImage(provider.logo_path, "w92")}
                  alt={provider.provider_name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
            )}
            <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{provider.provider_name}</span>
          </div>
        ))}
      </div>
    </>
  );
}