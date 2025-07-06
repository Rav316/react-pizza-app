import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaCategory } from "../../service/model.ts";

interface CategorySlice {
  categories: PizzaCategory[];
  selectedCategory: number;
  loading: boolean;
}

const initialState: CategorySlice = {
  categories: [],
  selectedCategory: 0,
  loading: false
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    loadCategories: (state, action: PayloadAction<PizzaCategory[]>) => {
      state.categories = [
        {id: 0, title: 'Все'},
        ...action.payload
      ]
      state.loading = false;
    },
    setCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
  }
});

export default categorySlice.reducer;

export const {loadCategories,setCategory} = categorySlice.actions;