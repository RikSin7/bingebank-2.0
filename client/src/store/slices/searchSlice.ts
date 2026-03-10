import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchFilterType = "all" | "movie" | "tv" | "person";
export type SearchSortType = "relevance" | "popularity" | "newest" | "oldest";

interface SearchState {
  filter: SearchFilterType;
  sort: SearchSortType;
}

const initialState: SearchState = {
  filter: "all",
  sort: "relevance",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<SearchFilterType>) => {
      state.filter = action.payload;
    },
    setSearchSort: (state, action: PayloadAction<SearchSortType>) => {
      state.sort = action.payload;
    },
    resetSearchFilters: (state) => {
      state.filter = "all";
      state.sort = "relevance";
    },
  },
});

export const { setSearchFilter, setSearchSort, resetSearchFilters } = searchSlice.actions;
export default searchSlice.reducer;
