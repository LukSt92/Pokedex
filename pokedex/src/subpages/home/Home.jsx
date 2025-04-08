import React, { useState } from "react";
import { Pagination } from "./Pagination";
import { PokeCard } from "../../shared/PokeCard";
import { Title } from "../../shared/Title";
import { useFilterAndSetPokemons } from "./useFilterAndSetPokemons";

export const Home = () => {
  const [page, setPage] = useState(1);
  const { pokeData, isLoading, maxPage, searchValue, setSearchValue } =
    useFilterAndSetPokemons(page);

  const handleInputChange = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchValue(e.target.value);
  };

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
        <p>Loading</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-4 justify-center">
            {pokeData?.map((pokemon, index) => (
              <PokeCard key={index} url={pokemon.url} />
            ))}
          </div>
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </>
      )}
    </>
  );
};
