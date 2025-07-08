import styles from "./search.module.scss";

import searchIcon from "../../../assets/img/search.svg";
import clearIcon from "../../../assets/img/clear.svg";
import * as React from "react";
import { useContext, useRef } from "react";
import { SearchContext } from "../../../context";

export const Search: React.FC = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search" />
      <input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder={"Поиск пиццы..."}
      />
      {searchValue && (
        <img
          onClick={onClickClear}
          className={styles.clearIcon}
          src={clearIcon}
          alt={"clear"}
        />
      )}
    </div>
  );
};
