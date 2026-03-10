import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExploreState {
  category: "trending-movies" | "trending-tv" | "movies" | "tv";
  sortBy: string;
  selectedGenres: number[];
}

const initialState: ExploreState = {
  category: "trending-movies",
  sortBy: "popularity.desc",
  selectedGenres: [],
};
const exploreSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<ExploreState["category"]>) => {
      state.category = action.payload;
      console.log(state.category)
      // Reset dependent filters when category changes drastically
      if (action.payload.includes("trending")) {
         state.sortBy = "popularity.desc";
         state.selectedGenres = [];
      }
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    toggleGenre: (state, action: PayloadAction<number>) => {
      const index = state.selectedGenres.indexOf(action.payload);
      if (index === -1) {
        state.selectedGenres.push(action.payload);
      } else {
        state.selectedGenres.splice(index, 1);
      }
    },
    clearFilters: (state) => {
      state.sortBy = "popularity.desc";
      state.selectedGenres = [];
    },
  },
});

export const { setCategory, setSortBy, toggleGenre, clearFilters } = exploreSlice.actions;
export default exploreSlice.reducer;
