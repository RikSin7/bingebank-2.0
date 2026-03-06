import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import stateReducer from "./slices/stateSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    state: stateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
