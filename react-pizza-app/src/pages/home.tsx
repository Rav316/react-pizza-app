import { Categories, PizzaSkeleton, Sort } from "../components/shared";
import { PizzaBlock } from "../components/shared/pizza-block/pizza-block.tsx";
import { useEffect, useState } from "react";
import type { Pizza } from "../App.tsx";
import type { OrderType, PizzaCategory, SortType } from "../constants/pizza.ts";
import * as React from "react";
import { Pagination } from "../components/shared/pagination/pagination.tsx";

const sortCategories: SortType[] = [
  { label: "популярности", value: "popularity" },
  { label: "цене", value: "price" },
  { label: "Алфавиту", value: "alphabet" },
];

interface Props {
  searchValue: string;
}

export const Home: React.FC<Props> = ({searchValue}) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Pizza[]>([]);
  const [categories, setCategories] = useState<PizzaCategory[]>([]);
  const [categoryId, setCategoryId] = useState(0);
  const [selectedSort, setSelectedSort] = useState(sortCategories[0].value);
  const [order, setOrder] = useState<OrderType>("desc");

  useEffect(() => {
    fetch("http://localhost:8080/api/categories")
      .then((res) => res.json())
      .then((data: PizzaCategory[]) =>
        setCategories([{ id: 0, title: "Все" }, ...data]),
      );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8080/api/pizza?category=${categories.find((c) => c.id === categoryId)?.title}&sortBy=${sortCategories.find((c) => c.value === selectedSort)?.value}&order=${order}&search=${searchValue}`,
    )
      .then((res) => res.json())
      .then((data: Pizza[]) => {
        setItems(data);
      })
      .finally(() => setLoading(false));
  }, [categories, categoryId, order, selectedSort, searchValue]);

  const pizzas = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categories={categories}
          value={categoryId}
          onChangeCategory={(id: number) => setCategoryId(id)}
        />
        <Sort
          value={selectedSort}
          categories={sortCategories}
          onChangeCategory={(value: string) => setSelectedSort(value)}
          order={order}
          onChangeOrder={(order: OrderType) => setOrder(order)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => <PizzaSkeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />)}
      </div>
      <Pagination/>
    </div>
  );
};
