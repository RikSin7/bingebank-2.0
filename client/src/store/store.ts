import { configureStore } from "@reduxjs/toolkit";
import stateReducer from "./slices/stateSlice";
import favoritesReducer from "./slices/favoritesSlice";
import exploreReducer from "./slices/exploreSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    state: stateReducer,
    favorites: favoritesReducer,
    explore: exploreReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
