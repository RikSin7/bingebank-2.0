import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteItem {
  id: number;
  title: string;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  vote_average?: number;
  release_date?: string;
}

interface FavoritesState {
  items: FavoriteItem[];
}

// Load initial state from local storage safely
const loadState = (): FavoriteItem[] => {
  try {
    if (typeof window === "undefined") return [];
    const serializedState = localStorage.getItem("favorites");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const initialState: FavoritesState = {
  items: loadState(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.media_type === action.payload.media_type
      );

      if (existingIndex >= 0) {
        // Remove if exists
        state.items.splice(existingIndex, 1);
      } else {
        // Add if it doesn't exist
        state.items.push(action.payload);
      }

      // Sync with local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(state.items));
      }
    },
    hydrateFavorites: (state, action: PayloadAction<FavoriteItem[]>) => {
       state.items = action.payload;
    }
  },
});

export const { toggleFavorite, hydrateFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
