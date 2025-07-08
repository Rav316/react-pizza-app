import { CartItem } from "../service/model.ts";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0);
};