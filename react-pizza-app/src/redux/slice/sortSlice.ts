import { createSlice } from "@reduxjs/toolkit";
import type { SortType } from "../../service/model.ts";
import type { OrderType } from "../../constants/pizza.ts";

interface SortSlice {
  selectedSort: SortType;
  selectedOrder: OrderType;
}

const initialState: SortSlice = {
  selectedSort: {label: 'популярности', value: 'popularity'},
  selectedOrder: 'desc'
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort: (state, action) => {
      state.selectedSort = action.payload;
    },
    setOrder: (state, action) => {
      state.selectedOrder = action.payload;
    }
  },
});

export default filterSlice.reducer;

export const { setSort, setOrder } = filterSlice.actions;