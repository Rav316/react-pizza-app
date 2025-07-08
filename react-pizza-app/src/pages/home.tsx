import { Categories, CategoriesSkeleton, Pagination, PizzaBlock, PizzaSkeleton, Sort } from "../components/shared";
import { useContext, useEffect, useRef } from "react";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store.ts";
import qs from "qs";
import { useNavigate } from "react-router";
import { setSort } from "../redux/slice/sort-slice.ts";
import { fetchCategories, setCategory } from "../redux/slice/category-slice.ts";
import { setCurrentPage } from "../redux/slice/pagination-slice.ts";
import { sortCategories } from "../constants/sort.ts";
import { fetchPizzas } from "../redux/slice/pizza-slice.ts";
import { SearchContext } from "../context";

export const Home: React.FC = () => {
  const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const { selectedSort, selectedOrder } = useSelector(
    (state: RootState) => state.sort,
  );
  const {
    categories,
    selectedCategory,
    loading: loadingCategories,
  } = useSelector((action: RootState) => action.category);
  const {
    items,
    loading: loadingPizza,
    error: pizzaError,
  } = useSelector((selector: RootState) => selector.pizza);
  const pageCount = Math.ceil(
    items.metadata.totalElements / items.metadata.size,
  );
  const [debouncedSearch] = useDebounce(searchValue, 300);
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const pageSize = 4;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortProperty = params.sortProperty as string;
      const validSortProperty = sortCategories
        .map((c) => c.value)
        .includes(sortProperty)
        ? sortProperty
        : "popularity";
      const selectedCategory = Number(params.selectedCategory);
      const validSelectedCategory = categories
        .map((c) => c.id)
        .includes(selectedCategory)
        ? selectedCategory
        : 0;
      const currentPage = isNaN(Number(params.currentPage))
        ? 0
        : Number(params.currentPage);
      const validCurrentPage =
        currentPage < 0 || currentPage > pageCount - 1 ? 0 : currentPage;
      dispatch(setSort(validSortProperty));
      dispatch(setCategory(validSelectedCategory));
      dispatch(setCurrentPage(validCurrentPage));
    }
  }, [categories, dispatch, pageCount]);

  useEffect(() => {
    if (categories.length === 0) return;
    dispatch(
      fetchPizzas({
        category:
          categories.length === 0
            ? "Все"
            : categories.find((c) => c.id === selectedCategory)?.title,
        sort: selectedSort,
        order: selectedOrder,
        search: debouncedSearch,
        page: currentPage,
        size: pageSize,
      }),
    );
  }, [
    categories,
    selectedCategory,
    debouncedSearch,
    currentPage,
    selectedSort,
    selectedOrder,
    dispatch,
  ]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: selectedSort,
        selectedCategory,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [
    debouncedSearch,
    currentPage,
    selectedSort,
    selectedOrder,
    searchValue,
    navigate,
    selectedCategory,
  ]);
  return (
    <div className="container">
      <div className="content__top">
        {loadingCategories ? <CategoriesSkeleton /> : <Categories />}
        <Sort />
      </div>
      <h2 className="content__title">{categories.find((c) => c.id === selectedCategory)?.title} пиццы</h2>

      {pizzaError ? (
        <div className="error-message">
          <h3>Не удалось загрузить список пицц 😢</h3>
          <p>Попробуйте позже или перезагрузите страницу.</p>
        </div>
      ) : (
        <>
          <div className="content__items">
            {loadingPizza
              ? Array(pageSize)
                  .fill(0)
                  .map((_, index) => <PizzaSkeleton key={index} />)
              : items.content.map((pizza) => (
                <PizzaBlock key={pizza.id} pizza={pizza} />
                ))}
          </div>
          {!loadingPizza && (
            <Pagination pageCount={pageCount} pageSize={pageSize} />
          )}
        </>
      )}
    </div>
  );
};
