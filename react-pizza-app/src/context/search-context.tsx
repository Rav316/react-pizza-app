import * as React from "react";

interface SearchContextType {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

export const SearchContext = React.createContext<SearchContextType>({
  searchValue: "",
  setSearchValue: () => {},
});