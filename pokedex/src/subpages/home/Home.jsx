import React, { useState } from "react";
import { Pagination } from "./Pagination";
import { PokeCard } from "../../shared/PokeCard";
import { Title } from "../../shared/Title";
import { useGetData } from "../../hooks/useGetData";
import { Loader } from "../../shared/Loader";

const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading } = useGetData(url);
  const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    setPage(1);
    setSearchValue(e.target.value);
  };

  const filteredPokemons = data?.results.filter((pokemon) =>
    pokemon.name.includes(searchValue)
  );
  const pokeData = filteredPokemons?.slice((page - 1) * 15, 15 * page);
  const maxPage = Math.ceil(filteredPokemons?.length / 15);

  return (
    <>
      <Title>Home</Title>
      <div className="w-full max-w-sm min-w-[200px]">
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Search by name..."
          onChange={(e) => handleInputChange(e)}
          value={searchValue}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-center">
            {pokeData?.map((pokemon, index) => (
              <PokeCard key={index} name={pokemon.name} />
            ))}
          </div>
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </>
      )}
    </>
  );
};
