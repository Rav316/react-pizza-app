import { Header } from "./header.tsx";
import { Outlet } from "react-router";
import * as React from "react";

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void
}

export const Layout: React.FC<Props> = ({searchValue, setSearchValue}) => {
  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <Outlet/>
    </>
  );
}