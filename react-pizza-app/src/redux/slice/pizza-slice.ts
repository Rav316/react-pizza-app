import { PageResponse, Pizza } from "../../service/model.ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../../service/api-client.ts";
import { SearchParams } from "../../service/pizzas.ts";

interface PizzaSlice {
  items: PageResponse<Pizza>;
  loading: boolean;
  error: boolean;
}

const initialState: PizzaSlice = {
  items: {
    content: [],
    metadata: {
      page: 0,
      size: 0,
      totalElements: 0,
    },
  },
  loading: true,
  error: false
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: SearchParams) => {
    return await Api.pizzas.findAll(params);
  },
);

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        console.error(action.payload);
        state.error = true;
        state.loading = false;
      });
  },
});

export default pizzaSlice.reducer;
