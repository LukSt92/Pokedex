import { useState } from "react";
import { useGetAllPokemonsDetails } from "../../hooks/useGetAllPokemonsDetails";
import { Title } from "../../shared/Title";
import { SortingRadioGroup } from "./SortingRadioGroup";
import { capitalizeFirstLetter } from "../../utilis/capitalizeFirstLetter";

export const Ranking = () => {
  const { allPokeDetails, isLoading } = useGetAllPokemonsDetails();
  const [sortBy, setSortBy] = useState("height");

  if (isLoading) return <div>Loading...</div>;

  allPokeDetails?.sort((a, b) => {
    const aEntry = Object.entries(a.stats).find(([key]) => key === sortBy);
    const bEntry = Object.entries(b.stats).find(([key]) => key === sortBy);
    return bEntry[1] - aEntry[1];
  });

  return (
    <>
      <Title>Ranking</Title>
      <SortingRadioGroup setSortBy={setSortBy} />
      <ul className="flex flex-col items-stretch gap-4 w-2/3 max-md:text-xs max-md:w-4/5 max-sm:text-[10px]">
        <li className="grid grid-cols-6 text-center font-bold">
          <div>#</div>
          <div>Img:</div>
          <div>Name:</div>
          <div>Height:</div>
          <div>Weight:</div>
          <div>Experience:</div>
        </li>
        {allPokeDetails.map((pokemon, index) => (
          <li
            key={index}
            className="grid grid-cols-6 text-center font-medium items-center border border-deep-gold rounded-lg bg-gradient-to-r from-bg-prim-color to-bg-sec-color shadow-xl transition-colors duration-300"
          >
            <div>{index + 1}</div>
            <img
              src={pokemon.imgUrl}
              alt={pokemon.name}
              className="size-12 max-sm:size-8 justify-self-center"
            />
            <div>{capitalizeFirstLetter(pokemon.name)}</div>
            <div>{pokemon.stats.height}</div>
            <div>{pokemon.stats.weight}</div>
            <div>{pokemon.stats.base_experience}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
