import { Header } from "./header.tsx";
import { Outlet } from "react-router";

export const Layout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}