import { PizzaDetails } from "../../service/model.ts";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../service/api-client.ts";

interface PizzaDetailsSlice {
  item: PizzaDetails;
  loading: boolean;
  error: boolean;
}

const initialState: PizzaDetailsSlice = {
  item: {
    id: 0,
    title: "",
    imageUrl: "",
    description: "",
    items: [],
    category: { id: 0, title: "" },
    rating: 0,
    ingredients: [],
  },
  loading: true,
  error: false,
};

export const fetchPizzaDetails = createAsyncThunk(
  "pizzaDetails/fetchPizzaDetailsStatus",
  async (id: number) => {
    return await Api.pizzas.findById(id);
  },
);

export const pizzaDetailsSlice = createSlice({
  name: "pizzaDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchPizzaDetails.fulfilled,
        (state, action: PayloadAction<PizzaDetails>) => {
          state.item = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchPizzaDetails.rejected, (state) => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default pizzaDetailsSlice.reducer;
