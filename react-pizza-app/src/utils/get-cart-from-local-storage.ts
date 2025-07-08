import { CartItem } from "../service/model.ts";

export const getCartFromLocalStorage = (): CartItem[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}