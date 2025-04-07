import React, { useState } from "react";
import { Pagination } from "./Pagination";

import { Button } from "../../shared/Button";
import { useGetData } from "../../hooks/useGetData";

const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

export const Home = () => {
  const { data, isLoading } = useGetData(url);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);

  const pokeDataToView = data?.results.slice((page - 1) * 15, 15 * page);

  return (
    <>
      <div>Home</div>
      {isLoading ? <p>Loading</p> : <p>Test</p>}
      <Pagination page={page} setPage={setPage} maxPage={maxPage} />
      <Button onClick={() => console.log(pokeDataToView)}>test</Button>
    </>
  );
};
