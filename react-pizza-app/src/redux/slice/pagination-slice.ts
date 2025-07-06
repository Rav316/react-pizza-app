import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationSlice {
  currentPage: number;
}

const initialState: PaginationSlice = {
  currentPage: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export default paginationSlice.reducer;

export const { setCurrentPage } = paginationSlice.actions;
