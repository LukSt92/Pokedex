import { Outlet } from "react-router-dom";
import { Layout } from "./subpages/layout/Layout";
import { useEffect, useState } from "react";
import { getData } from "./services/getData";

const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
