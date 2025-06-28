import styles from "./search.module.scss";

import searchIcon from "../../../assets/img/search.svg";
import clearIcon from "../../../assets/img/clear.svg";
import * as React from "react";
import { useContext } from "react";
import { SearchContext } from "../../../context/search-context.tsx";

export const Search: React.FC = () => {
  const {searchValue, setSearchValue} = useContext(SearchContext);
  console.log('render Search components');
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search" />
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder={"Поиск пиццы..."}
      />
      {searchValue && (
        <img onClick={() => setSearchValue("")} className={styles.clearIcon} src={clearIcon} alt={"clear"} />
      )}
    </div>
  );
};
