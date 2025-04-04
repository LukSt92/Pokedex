import { useEffect, useState } from "react";
import { getData } from "../services/getData";

const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

export const usePokemonsApiData = () => {
  const [pokemonsApiData, setPokemonsApiData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonsData = async () => {
      setPokemonsApiData(await getData(url));
      setIsLoading(false);
    };
    getPokemonsData();
  }, []);

  return { pokemonsApiData, isLoading };
};
