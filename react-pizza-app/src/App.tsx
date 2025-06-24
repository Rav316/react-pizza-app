import "./scss/app.scss";
import { Categories, Header, Sort } from "./components/shared";
import { PizzaBlock } from "./components/shared/pizza-block.tsx";
import type { PizzaType } from "./constants/pizza.ts";

export interface Pizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  types: PizzaType[];
  sizes: number[];
  category: number;
  rating: number;
}

const pizzas: Pizza[] = [
  {
    id: 1,
    title: "Охотничья",
    price: 629,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/019635b27c727302835040e5d7c27caa.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 4,
    rating: 10,
  },
  {
    id: 2,
    title: "Креветка и песто",
    price: 699,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/019591b642d87304a62d322945990861.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 1,
    rating: 10,
  },
  {
    id: 3,
    title: "Охотничья",
    price: 629,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/019635b27c727302835040e5d7c27caa.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 1,
    rating: 10,
  },
  {
    id: 4,
    title: "Четыре сыра 🌿",
    price: 559,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/11ee7d612a1c13cbbfcc286c332d7762.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 1,
    rating: 10,
  },
  {
    id: 5,
    title: "Чилл Грилл",
    price: 539,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 1,
    rating: 10,
  },
  {
    id: 6,
    title: "Креветки блю чиз",
    price: 679,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/0195ca1dcb2f7341b78534772343b047.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 1,
    rating: 10,
  },
  {
    id: 7,
    title: "Сырная 🌿👶",
    price: 269,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/11ee7d610d2925109ab2e1c92cc5383c.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 1,
    rating: 10,
  },
  {
    id: 8,
    title: "Пепперони фреш",
    price: 269,
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/11ee7d612fc7b7fca5be822752bee1e5.avif",
    types: [0, 1],
    sizes: [25, 30, 35],
    category: 1,
    rating: 10,
  }
];

const App = () => {
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
                  pizzas.map(pizza => (
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
