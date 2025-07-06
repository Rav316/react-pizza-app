import { Header } from "./header.tsx";
import { Outlet } from "react-router";
import * as React from "react";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
