import { Outlet } from "react-router";
import * as React from "react";
import { Header } from "./header.tsx";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
