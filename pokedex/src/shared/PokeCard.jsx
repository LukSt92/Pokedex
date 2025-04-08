import React from "react";
import { useGetData } from "../hooks/useGetData";
import { Button } from "./Button";
import { capitalizeFirstLetter } from "../utilis/capitalizeFirstLetter";
import { splitWords } from "../utilis/splitWords";

export const PokeCard = ({ url }) => {
  const { data, isLoading } = useGetData(url);
  const details = {
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

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="w-sm border border-gray-200 rounded-lg flex flex-col items-center p-2 gap-8 bg-gradient-to-r from-neutral-100 to-stone-200 shadow-xl hover:scale-105 transition duration-300">
      <img src={details.imgUrl} alt={details.name} className="size-48" />
      <p className="text-xl font-bold">{capitalizeFirstLetter(details.name)}</p>
      <div className="flex flex-wrap">{statsInfo}</div>
    </div>
  );
};
