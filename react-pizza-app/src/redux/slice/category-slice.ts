import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PizzaCategory } from "../../service/model.ts";
import { Api } from "../../service/api-client.ts";

interface CategorySlice {
  categories: PizzaCategory[];
  selectedCategory: number;
  loading: boolean;
}

const initialState: CategorySlice = {
  categories: [],
  selectedCategory: 0,
  loading: false,
};

export const fetchCategories = createAsyncThunk<PizzaCategory[], void>(
  "category/fetchCategoriesStatus",
  async () => {
    return await Api.categories.findAll();
  },
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = [{ id: 0, title: "Все" }, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error(action.payload);
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;

export const { setCategory } = categorySlice.actions;
