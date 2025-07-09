import { useDispatch } from "react-redux";
import { setSort } from "../../redux/slice/sort-slice.ts";
import { setCategory } from "../../redux/slice/category-slice.ts";
import { setCurrentPage } from "../../redux/slice/pagination-slice.ts";
import logoSvg from "../../../public/pizza-logo.svg";
import { AppDispatch } from "../../redux/store.ts";
import { Link } from "react-router";
import { useCallback } from "react";

export const HeaderLogo = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleReset = useCallback(() => {
    dispatch(setSort("popularity"));
    dispatch(setCategory(0));
    dispatch(setCurrentPage(0));
  }, [dispatch])

  return (
    <Link to={'/'} onClick={handleReset}>
      <div
        className="header__logo"
      >
        <img width="38" src={logoSvg} alt="Pizza logo" />
        <div className="header__logo-info">
          <h1>React Pizza</h1>
          <p>самая вкусная пицца во вселенной</p>
        </div>
      </div>
    </Link>

  );
};
