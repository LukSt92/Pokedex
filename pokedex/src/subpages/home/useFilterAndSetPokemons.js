import { useEffect, useState } from "react";
import { useGetData } from "../../hooks/useGetData";

const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

export const useFilterAndSetPokemons = (page) => {
  const [searchValue, setSearchValue] = useState("");
  const { data } = useGetData(url);
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [maxPage, setMaxPage] = useState(10);

  useEffect(() => {
    setIsLoading(true);
    const filteredPokemons = data?.results.filter((pokemon) =>
      pokemon.name.includes(searchValue)
    );
    setMaxPage(Math.ceil(filteredPokemons?.length / 15));
    const pokeDataToView = filteredPokemons?.slice((page - 1) * 15, 15 * page);
    setPokeData(pokeDataToView);
    setIsLoading(false);
  }, [data?.results, searchValue, page]);
  return { pokeData, isLoading, maxPage, searchValue, setSearchValue };
};
