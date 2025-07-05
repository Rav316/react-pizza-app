import { Categories, PizzaSkeleton, Sort } from "../components/shared";
import { PizzaBlock } from "../components/shared/pizza-block/pizza-block.tsx";
import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { Pagination } from "../components/shared/pagination/pagination.tsx";
import { CategoriesSkeleton } from "../components/shared/categories/categories-skeleton.tsx";
import { useDebounce } from "use-debounce";
import type { PageResponse, Pizza, PizzaCategory } from "../service/model.ts";
import { SearchContext } from "../context/search-context.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store.ts";
import { setCurrentPage } from "../redux/slice/paginationSlice.ts";

export const Home: React.FC = () => {
  const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch();
  const { selectedSort, selectedOrder } = useSelector(
    (state: RootState) => state.sort,
  );
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPizzas, setLoadingPizzas] = useState(true);
  const [items, setItems] = useState<PageResponse<Pizza>>({
    content: [],
    metadata: { page: 0, size: 0, totalElements: 0 },
  });
  const [categories, setCategories] = useState<PizzaCategory[]>([]);
  const [categoryId, setCategoryId] = useState(0);
  const [debouncedSearch] = useDebounce(searchValue, 300);
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const pageSize = 4;

  useEffect(() => {
    setLoadingCategories(true);
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((data: PizzaCategory[]) => {
        setCategories([{ id: 0, title: "Все" }, ...data]);
        setLoadingCategories(false);
      });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setLoadingPizzas(true);
    fetch(
      `http://localhost:8080/api/pizza?category=${categories.length === 0 ? "Все" : categories.find((c) => c.id === categoryId)?.title}&sort=${selectedSort.value}&order=${selectedOrder}&search=${searchValue}&query=${debouncedSearch}&page=${currentPage}&size=${pageSize}`,
    )
      .then((res) => res.json())
      .then((data: PageResponse<Pizza>) => {
        setItems(data);
        setLoadingPizzas(false);
      });
  }, [categories, categoryId, debouncedSearch, currentPage, selectedSort.value, selectedOrder, searchValue]);

  const handleChangeCategory = (id: number) => {
    setCategoryId(id);
    dispatch(setCurrentPage(0));
  };

  return (
    <div className="container">
      <div className="content__top">
        {loadingCategories ? (
          <CategoriesSkeleton />
        ) : (
          <Categories
            categories={categories}
            value={categoryId}
            onChangeCategory={handleChangeCategory}
          />
        )}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loadingPizzas
          ? Array(pageSize)
              .fill(0)
              .map((_, index) => <PizzaSkeleton key={index} />)
          : items.content.map((pizza) => (
              <PizzaBlock key={pizza.id} pizza={pizza} />
            ))}
      </div>
      {!loadingPizzas && (
        <Pagination
          pageCount={items.metadata.totalElements / items.metadata.size}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
