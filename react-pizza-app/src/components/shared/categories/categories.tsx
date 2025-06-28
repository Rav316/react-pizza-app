import * as React from "react";
import type { PizzaCategory } from "../../../constants/pizza.ts";

interface Props {
  categories: PizzaCategory[];
  value: number;
  onChangeCategory: (id: number) => void;
}

export const Categories: React.FC<Props> = ({categories, value, onChangeCategory}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            onClick={() => onChangeCategory(category.id)}
            key={category.id}
            className={value === category.id ? "active" : ""}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
