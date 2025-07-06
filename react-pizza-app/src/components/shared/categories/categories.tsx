import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store.ts";
import { setCategory } from "../../../redux/slice/category-slice.ts";
import { setCurrentPage } from "../../../redux/slice/pagination-slice.ts";

export const Categories: React.FC = () => {
  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.category,
  );
  const dispatch = useDispatch<AppDispatch>();

  const onClickCategory = (id: number) => {
    dispatch(setCategory(id));
    dispatch(setCurrentPage(0));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            onClick={() => onClickCategory(category.id)}
            key={category.id}
            className={selectedCategory === category.id ? "active" : ""}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
