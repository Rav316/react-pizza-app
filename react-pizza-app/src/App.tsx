import "./scss/app.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from "react-router";
import { useState } from "react";
import { SearchContext } from "./context";
import { Layout } from "./components/shared";
import { MainLayout } from "./layouts";
import * as React from "react";
import Home from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";

const Cart = React.lazy(() => import("./pages/cart"));
const FullPizza = React.lazy(() => import("./pages/full-pizza"));

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <MainLayout>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path={"/pizza/:id"} element={<FullPizza />} />
              <Route path={"*"} element={<NotFound />} />
            </Route>
          </Routes>
        </SearchContext.Provider>
      </MainLayout>
    </>
  );
};

export default App;
