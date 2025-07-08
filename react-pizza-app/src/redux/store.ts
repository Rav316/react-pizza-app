import { configureStore } from "@reduxjs/toolkit";

import sortReducer from "./slice/sort-slice.ts";
import paginationReducer from "./slice/pagination-slice.ts";
import categoryReducer from "./slice/category-slice.ts";
import cartReducer from "./slice/cart-slice.ts";
import pizzaReducer from "./slice/pizza-slice.ts";
import pizzaDetailsReducer from "./slice/pizza-details-slice.ts";

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    pagination: paginationReducer,
    category: categoryReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
    pizzaDetails: pizzaDetailsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
