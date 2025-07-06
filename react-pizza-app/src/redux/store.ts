import { configureStore } from "@reduxjs/toolkit";

import sortReducer from './slice/sort-slice.ts';
import paginationReducer from './slice/pagination-slice.ts';
import categoryReducer from './slice/category-slice.ts';

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    pagination: paginationReducer,
    category: categoryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>