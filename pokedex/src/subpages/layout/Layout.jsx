import React from "react";
import { Header } from "../header/Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};
