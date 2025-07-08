import { CartItem } from "../../service/model.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "../../utils/get-cart-from-local-storage.ts";
import { calcTotalPrice } from "../../utils/calc-total-price.ts";

interface CartSlice {
  totalPrice: number;
  items: CartItem[];
}

const data = getCartFromLocalStorage();

const initialState: CartSlice = {
  totalPrice: calcTotalPrice(data),
  items: data
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
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.itemId !== action.payload,
      );
      state.totalPrice = calcTotalPrice(state.items);
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(
        (item) => item.itemId === action.payload,
      );
      if (findItem) {
        findItem.count--;
      }
      state.totalPrice = calcTotalPrice(state.items);
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
