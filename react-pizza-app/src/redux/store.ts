import { configureStore } from "@reduxjs/toolkit";

import sortReducer from './slice/sortSlice';
import paginationReducer from './slice/paginationSlice';
import categoryReducer from './slice/categorySlice';

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    pagination: paginationReducer,
    category: categoryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>