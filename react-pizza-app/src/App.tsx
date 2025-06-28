import "./scss/app.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { NotFound } from "./pages/not-found.tsx";
import { Route, Routes } from "react-router";
import { Cart } from "./pages/cart.tsx";
import { Layout } from "./components/shared/layout.tsx";
import { Home } from "./pages/home.tsx";
import { useState } from "react";
import { SearchContext } from "./context/search-context.tsx";

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path={"*"} element={<NotFound />} />
              </Route>
            </Routes>
          </SearchContext.Provider>
        </div>
      </div>
    </>
  );
};

export default App;
