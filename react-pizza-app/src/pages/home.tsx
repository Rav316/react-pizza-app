import { Categories, PizzaSkeleton, Sort } from "../components/shared";
import { PizzaBlock } from "../components/shared/pizza-block/pizza-block.tsx";
import { useEffect, useState } from "react";
import type { Pizza } from "../App.tsx";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/pizza")
      .then((res) => res.json())
      .then((data: Pizza[]) => {
        setItems(data);
      })
      .finally(() => setLoading(false));
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} pizza={pizza} />)}
      </div>
    </div>
  );
};
