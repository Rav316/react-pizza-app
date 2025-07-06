import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSort } from "../../redux/slice/sort-slice.ts";
import { setCategory } from "../../redux/slice/category-slice.ts";
import { setCurrentPage } from "../../redux/slice/pagination-slice.ts";
import logoSvg from "../../assets/img/pizza-logo.svg";
import { AppDispatch } from "../../redux/store.ts";

export const HeaderLogo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch(setSort("popularity"));
    dispatch(setCategory(0));
    dispatch(setCurrentPage(0));
    navigate("/");
  };

  return (
    <div
      className="header__logo"
      onClick={handleReset}
      style={{ cursor: "pointer" }}
    >
      <img width="38" src={logoSvg} alt="Pizza logo" />
      <div>
        <h1>React Pizza</h1>
        <p>самая вкусная пицца во вселенной</p>
      </div>
    </div>
  );
};
