import { Categories, PizzaSkeleton, Sort } from "../components/shared";
import { PizzaBlock } from "../components/shared/pizza-block/pizza-block.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import * as React from "react";
import { Pagination } from "../components/shared/pagination/pagination.tsx";
import { CategoriesSkeleton } from "../components/shared/categories/categories-skeleton.tsx";
import { useDebounce } from "use-debounce";
import type { PageResponse, Pizza } from "../service/model.ts";
import { SearchContext } from "../context/search-context.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store.ts";
import { Api } from "../service/api-client.ts";
import qs from "qs";
import { useNavigate } from "react-router";
import { setSort } from "../redux/slice/sortSlice.ts";
import { setCategory } from "../redux/slice/categorySlice.ts";
import { setCurrentPage } from "../redux/slice/paginationSlice.ts";
import { sortCategories } from "../constants/sort.ts";

export const Home: React.FC = () => {
  const { searchValue } = useContext(SearchContext);
  const dispatch = useDispatch();
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
  const [loadingPizzas, setLoadingPizzas] = useState(true);
  const [items, setItems] = useState<PageResponse<Pizza>>({
    content: [],
    metadata: { page: 0, size: 0, totalElements: 0 },
  });
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
      const currentPage = isNaN(Number(params.currentPage)) ? 0 : Number(params.currentPage);
      const validCurrentPage = (currentPage < 0 || currentPage > pageCount - 1) ? 0 : currentPage;
      dispatch(setSort(validSortProperty));
      dispatch(setCategory(validSelectedCategory));
      dispatch(setCurrentPage(validCurrentPage));
    }
  }, [categories, dispatch, pageCount]);

  useEffect(() => {
    if (categories.length === 0) return;
    setLoadingPizzas(true);

    Api.pizzas
      .findAll({
        category:
          categories.length === 0
            ? "Все"
            : categories.find((c) => c.id === selectedCategory)?.title,
        sort: selectedSort,
        order: selectedOrder,
        search: searchValue,
        query: debouncedSearch,
        page: currentPage,
        size: pageSize,
      })
      .then((data) => {
        setItems(data);
        setLoadingPizzas(false);
      });
  }, [
    categories,
    selectedCategory,
    debouncedSearch,
    currentPage,
    selectedSort,
    selectedOrder,
    searchValue,
  ]);

  useEffect(() => {
    if(isMounted.current) {
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
          pageCount={pageCount}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
