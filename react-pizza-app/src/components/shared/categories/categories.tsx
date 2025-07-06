import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store.ts";
import { useEffect } from "react";
import { Api } from "../../../service/api-client.ts";
import { loadCategories, setCategory } from "../../../redux/slice/category-slice.ts";
import { setCurrentPage } from "../../../redux/slice/pagination-slice.ts";

export const Categories: React.FC = () => {
  const {categories, selectedCategory} = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    Api.categories.findAll()
      .then(data => dispatch(loadCategories(data)))
  }, [dispatch]);

  const onClickCategory = (id: number) => {
    dispatch(setCategory(id));
    dispatch(setCurrentPage(0));
  }

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
