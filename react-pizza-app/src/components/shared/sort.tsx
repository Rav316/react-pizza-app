import { useState } from "react";
import * as React from "react";
import type { OrderType } from "../../constants/pizza.ts";
import { SortIcon } from "../ui";
import type { SortType } from "../../service/model.ts";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store.ts";
import { setOrder, setSort } from "../../redux/slice/sortSlice.ts";
import { setCurrentPage } from "../../redux/slice/paginationSlice.ts";

const categories: SortType[] = [
  { label: "популярности", value: "popularity" },
  { label: "цене", value: "price" },
  { label: "Алфавиту", value: "alphabet" },
];

export const Sort: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const {selectedSort, selectedOrder} = useSelector((state: RootState) => state.sort);

  const onClickCategory = (value: string) => {
    dispatch(setSort(categories.find((c) => c.value === value)));
    setIsVisible(false);
    setCurrentPage(0);
  };

  const onChangeOrder = (order: OrderType) => {
    dispatch(setOrder(order));
    setCurrentPage(0);
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <SortIcon onChangeOrder={onChangeOrder} order={selectedOrder} />
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible((prev) => !prev)}>
          {categories.find((c) => c.value === selectedSort.value)?.label}
        </span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {categories.map((category, i) => (
              <li
                className={selectedSort.value === category.value ? "active" : ""}
                onClick={() => onClickCategory(category.value)}
                key={i}
              >
                {category.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
