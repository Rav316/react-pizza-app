import "./scss/app.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from "react-router";
import { useState } from "react";
import { SearchContext } from "./context";
import { Layout } from "./components/shared";
import { Cart, FullPizza, Home, NotFound } from "./pages";
import { MainLayout } from "./layouts";

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
              <Route path={'/pizza/:id'} element={<FullPizza/>} />
              <Route path={"*"} element={<NotFound />} />
            </Route>
          </Routes>
        </SearchContext.Provider>
      </MainLayout>
    </>
  );
};

export default App;
