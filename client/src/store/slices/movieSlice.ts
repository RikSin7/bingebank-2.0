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
