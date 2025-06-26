import { useState } from "react";
import * as React from "react";
import type { OrderType, SortType } from "../../constants/pizza.ts";
import { SortIcon } from "../ui";

interface Props {
  value: string;
  categories: SortType[];
  onChangeCategory: (value: string) => void;
  onChangeOrder: (value: OrderType) => void;
  order: OrderType;
}

export const Sort: React.FC<Props> = ({value, categories, onChangeCategory, order, onChangeOrder}) => {
  const [isVisible, setIsVisible] = useState(false);

  const onClickCategory = (value: string) => {
    onChangeCategory(value);
    setIsVisible(false)
  }

  return (
    <div className="sort">
      <div className="sort__label">
        <SortIcon onChangeOrder={onChangeOrder} order={order}/>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible((prev) => !prev)}>
          {categories.find(c => c.value === value)?.label}
        </span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {categories.map((category, i) => (
              <li
                className={value === category.value ? "active" : ""}
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
