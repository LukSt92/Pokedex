import React from "react";
import { capitalizeFirstLetter } from "../utilis/capitalizeFirstLetter";
import { splitWords } from "../utilis/splitWords";
import { useLocation, useParams } from "react-router-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useGetData } from "../hooks/useGetData";

const url = "https://pokeapi.co/api/v2/pokemon/";

export const PokeSummaryCard = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetData(`${url}${id}`);
  const details = {
    id: data?.id,
    name: data?.name,
    imgUrl: data?.sprites.other.dream_world.front_default,
    stats: {
      height: data?.height,
      base_experience: data?.base_experience,
      weight: data?.weight,
      ability: data?.abilities[0].ability.name,
    },
  };

  const statsInfo = Object.entries(details?.stats).map(([key, value]) => (
    <div key={key} className="w-1/2 flex flex-col items-center p-2">
      <p className="text-xs">{value}</p>
      <p className="text-sm font-bold">
        {splitWords(capitalizeFirstLetter(key))}
      </p>
    </div>
  ));

  return details ? (
    <div className="w-full border border-gray-200 rounded-lg flex items-center justify-between p-2 gap-8 bg-gradient-to-r from-neutral-100 to-stone-200 shadow-xl">
      <div className="flex flex-col gap-4">
        <img src={details.imgUrl} alt={details.name} className="size-48" />
        <div className="flex justify-between">
          <GiCrossedSwords size={36} />
          {details.isFavourite ? (
            <GoHeartFill size={36} color="red" />
          ) : (
            <GoHeart size={36} color="red" />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl font-bold">
          {capitalizeFirstLetter(details.name)}
        </p>
        <div className="flex flex-wrap">{statsInfo}</div>
      </div>
    </div>
  ) : (
    <p>
      Pokemon data did not load, you have to click directly on PokeCard to open
      Summary.
    </p>
  );
};
