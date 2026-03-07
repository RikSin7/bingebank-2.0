import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  isSidebarOpen: boolean;
}

const initialState: State = {
  isSidebarOpen: true,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setIsSidebarOpen } = stateSlice.actions;
export default stateSlice.reducer;
