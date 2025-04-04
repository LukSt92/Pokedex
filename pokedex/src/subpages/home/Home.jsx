import React, { useEffect, useState } from "react";
import { usePokemonsApiData } from "../../hooks/usePokemonsApiData";
import { Pagination } from "./Pagination";
import { getData } from "../../services/getData";
import { Button } from "../../shared/Button";

export const Home = () => {
  const { pokemonsApiData, isLoading } = usePokemonsApiData();
  const [currPokemonsToShow, setCurrPokemonsToShow] = useState();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(10);
  const [pok, setPok] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [isIs, setIsIs] = useState(true);

  useEffect(() => {
    // All of this need to be pull out to hooks
    const setCurrentsPokemons = () => {
      console.log(page);
      const pokemons = pokemonsApiData.results.slice(
        (page - 1) * 15,
        15 * page
      );
      setCurrPokemonsToShow(pokemons);
      setIsPending(false);
    };
    if (!isLoading) {
      setCurrentsPokemons();
    }
    const setPokemon = async () => {
      await currPokemonsToShow.map((item) => {
        const setData = async () => {
          const data = await getData(item.url);
          setPok((prev) => [...prev, data]);
        };
        if (isIs) setData();
      });
      setIsIs(false);
    };
    if (!isPending) setPokemon();
  }, [isLoading, isPending, isIs, page]);

  const handleChangePage = () => {
    setPok([]);
    setIsPending(true);
    setIsIs(true);
  };

  return (
    <>
      <div>Home</div>
      {!isIs && pok.map((item) => <p>{item.name}</p>)}
      <Pagination
        page={page}
        setPage={setPage}
        maxPage={maxPage}
        handleChangePage={handleChangePage}
      />
      <Button onClick={() => console.log(pok)}>test</Button>
    </>
  );
};
