import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { OrderType } from "../../constants/pizza.ts";

interface SortSlice {
  selectedSort: string;
  selectedOrder: OrderType;
}

const initialState: SortSlice = {
  selectedSort: "popularity",
  selectedOrder: "desc",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
    setOrder: (state, action: PayloadAction<OrderType>) => {
      state.selectedOrder = action.payload;
    },
  },
});

export default filterSlice.reducer;

export const { setSort, setOrder } = filterSlice.actions;
