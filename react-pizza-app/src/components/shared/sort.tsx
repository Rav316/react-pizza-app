import { useEffect, useRef, useState } from "react";
import * as React from "react";
import type { OrderType } from "../../constants/pizza.ts";
import { SortIcon } from "../ui";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store.ts";
import { setOrder, setSort } from "../../redux/slice/sort-slice.ts";
import { setCurrentPage } from "../../redux/slice/pagination-slice.ts";
import { sortCategories } from "../../constants/sort.ts";

export const Sort: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const {selectedSort, selectedOrder} = useSelector((state: RootState) => state.sort);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    }

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, []);

  const onClickSort = (value: string) => {
    dispatch(setSort(sortCategories.find((c) => c.value === value)?.value));
    setIsVisible(false);
    setCurrentPage(0);
  };

  const onChangeOrder = (order: OrderType) => {
    dispatch(setOrder(order));
    setCurrentPage(0);
  }

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <SortIcon onChangeOrder={onChangeOrder} order={selectedOrder} />
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible((prev) => !prev)}>
          {sortCategories.find((c) => c.value === selectedSort)?.label}
        </span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortCategories.map((category, i) => (
              <li
                className={selectedSort === category.value ? "active" : ""}
                onClick={() => onClickSort(category.value)}
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
