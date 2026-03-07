/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  trending: any[];
}

const initialState: MovieState = {
  trending: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setTrending: (state, action: PayloadAction<any[]>) => {
      state.trending = action.payload;
    },
  },
});

export const { setTrending } = movieSlice.actions;
export default movieSlice.reducer;
