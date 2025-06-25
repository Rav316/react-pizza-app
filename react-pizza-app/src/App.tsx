import "./scss/app.scss";
import { Categories, Header, Sort } from "./components/shared";
import { PizzaBlock } from "./components/shared/pizza-block.tsx";
import type { PizzaCategory, PizzaSize, PizzaType } from "./constants/pizza.ts";
import { useEffect, useState } from "react";

export interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: PizzaType[];
  sizes: PizzaSize[];
  category: PizzaCategory;
  rating: number;
}

const App = () => {
  const [items, setItems] = useState<Pizza[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/pizza')
      .then(res => res.json())
      .then((data: Pizza[]) => {
        console.log(data)
        setItems(data)
      })
  }, [])

  console.log('rendering...');
  return (
    <>
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <div className="content__top">
                <Categories />
                <Sort />
              </div>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
                {
                  items.map(pizza => (
                    <PizzaBlock key={pizza.id} pizza={pizza}/>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default App;
