import "./scss/app.scss";
import "react-loading-skeleton/dist/skeleton.css";
import type { PizzaCategory, PizzaSize, PizzaType } from "./constants/pizza.ts";
import { NotFound } from "./pages/not-found.tsx";
import { Route, Routes } from "react-router";
import { Cart } from "./pages/cart.tsx";
import { Layout } from "./components/shared/layout.tsx";
import { Home } from "./pages/home.tsx";

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
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <Routes>
            <Route element={<Layout/>}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path={'*'} element={<NotFound/>} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
