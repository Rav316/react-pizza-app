import { CartItem } from "../../service/model.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartSlice {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSlice = {
  totalPrice: 0,
  items: [],
};

const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (item) => item.itemId === action.payload.itemId,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push(action.payload);
      }
      calculateTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.itemId !== action.payload,
      );
      calculateTotalPrice(state.items);
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(
        (item) => item.itemId === action.payload,
      );
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
        } else {
          state.items = state.items.filter(
            (item) => item.itemId !== action.payload,
          );
        }
      }
      calculateTotalPrice(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, decrementItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
