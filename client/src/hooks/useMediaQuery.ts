import { useEffect, useState } from "react"

export default function useMediaQuery(query: string) {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        const listener = () => setMatches(media.matches);

        //initial check
        setMatches(media.matches);

        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener)
        
    }, [query])
    
    return matches
}