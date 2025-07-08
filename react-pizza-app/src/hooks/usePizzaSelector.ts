import { PizzaItem } from "../service/model.ts";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

export const usePizzaSelector = (items: PizzaItem[]) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const types = useMemo(() => {
    return Array.from(
      new Map(items.map((item) => [item.type.id, item.type])).values()
    );
  }, [items]);

  const sizes = useMemo(() => {
    return Array.from(
      new Map(
        items
          .filter((item) => item.type.id === selectedItem.type.id)
          .map((item) => [item.size.id, item.size])
      ).values()
    );
  }, [items, selectedItem]);

  const selectType = (typeId: number) => {
    const found = items.find((item) => item.type.id === typeId && item.size);
    if (found) setSelectedItem(found);
  };

  const selectSize = (sizeId: number) => {
    const found = items.find(
      (item) =>
        item.type.id === selectedItem.type.id && item.size.id === sizeId
    );
    if (found) setSelectedItem(found);
  };

  const itemCount = useSelector(
    (state: RootState) =>
      state.cart.items.find((item) => item.itemId === selectedItem.id)?.count ||
      0,
  );


  return {
    selectedItem,
    types,
    sizes,
    selectType,
    selectSize,
    itemCount
  };
}