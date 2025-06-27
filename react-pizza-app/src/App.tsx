import "./scss/app.scss";
import "react-loading-skeleton/dist/skeleton.css";
import type { PizzaCategory, PizzaSize, PizzaType } from "./constants/pizza.ts";
import { NotFound } from "./pages/not-found.tsx";
import { Route, Routes } from "react-router";
import { Cart } from "./pages/cart.tsx";
import { Layout } from "./components/shared/layout.tsx";
import { Home } from "./pages/home.tsx";
import { useState } from "react";

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
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <Routes>
            <Route
              element={
                <Layout
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              }
            >
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path={"*"} element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
