import { Categories, PizzaSkeleton, Sort } from "../components/shared";
import { PizzaBlock } from "../components/shared/pizza-block/pizza-block.tsx";
import { useContext, useEffect, useState } from "react";
import type { OrderType } from "../constants/pizza.ts";
import * as React from "react";
import { Pagination } from "../components/shared/pagination/pagination.tsx";
import { CategoriesSkeleton } from "../components/shared/categories/categories-skeleton.tsx";
import { useDebounce } from "use-debounce";
import type {
  PageResponse,
  Pizza,
  PizzaCategory,
  SortType,
} from "../service/model.ts";
import { SearchContext } from "../context/search-context.tsx";

const sortCategories: SortType[] = [
  { label: "популярности", value: "popularity" },
  { label: "цене", value: "price" },
  { label: "Алфавиту", value: "alphabet" },
];

export const Home: React.FC = () => {
  const {searchValue} = useContext(SearchContext);
  console.log('render Home component');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingPizzas, setLoadingPizzas] = useState(true);
  const [items, setItems] = useState<PageResponse<Pizza>>({
    content: [],
    metadata: { page: 0, size: 0, totalElements: 0 },
  });
  const [categories, setCategories] = useState<PizzaCategory[]>([]);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedSort, setSelectedSort] = useState(sortCategories[0].value);
  const [order, setOrder] = useState<OrderType>("desc");
  const [debouncedSearch] = useDebounce(searchValue, 300);
  const [currentPage, setCurrentPage] = useState(0);
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
      `http://localhost:8080/api/pizza?category=${categories.length === 0 ? "Все" : categories.find((c) => c.id === categoryId)?.title}&sort=${sortCategories.find((c) => c.value === selectedSort)?.value}&order=${order}&search=${searchValue}&query=${debouncedSearch}&page=${currentPage}&size=${pageSize}`,
    )
      .then((res) => res.json())
      .then((data: PageResponse<Pizza>) => {
        setItems(data);
        setLoadingPizzas(false);
      });
  }, [
    categories,
    categoryId,
    order,
    selectedSort,
    debouncedSearch,
    currentPage,
  ]);

  const handleChangeCategory = (id: number) => {
    setCategoryId(id);
    setCurrentPage(0);
  };

  const handleChangeSort = (value: string) => {
    setSelectedSort(value);
    setCurrentPage(0);
  };

  const handleChangeOrder = (order: OrderType) => {
    setOrder(order);
    setCurrentPage(0);
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
        <Sort
          value={selectedSort}
          categories={sortCategories}
          onChangeSort={handleChangeSort}
          order={order}
          onChangeOrder={handleChangeOrder}
        />
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
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
