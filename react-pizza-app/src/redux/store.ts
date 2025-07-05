import { configureStore } from "@reduxjs/toolkit";

import sortReducer from './slice/sortSlice';
import paginationReducer from './slice/paginationSlice';

export const store = configureStore({
  reducer: {
    sort: sortReducer,
    pagination: paginationReducer
  }
});

export type RootState = ReturnType<typeof store.getState>