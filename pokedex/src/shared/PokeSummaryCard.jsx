import { capitalizeFirstLetter } from "../utilis/capitalizeFirstLetter";
import { splitWords } from "../utilis/splitWords";
import { useParams } from "react-router-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { GoHeartFill } from "react-icons/go";
import { useGetData } from "../hooks/useGetData";
import { useGetPokemonDetails } from "../hooks/useGetPokemonDetails";
import { requestFavouriteToJson } from "../services/requestFavouriteToJson";
import { useCheckIsFavourite } from "../hooks/useCheckIsFavourite";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { useCheckIsInArena } from "../hooks/useCheckIsInArena";
import { requestArenaParticipantsJson } from "../services/requestArenaParticipantsJson";

const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

export const PokeSummaryCard = () => {
  const { isLoggedIn } = useContext(LoginContext);
  const { name } = useParams();
  const { pokeDetails, isLoading } = useGetPokemonDetails(name);
  const { data: Pokedb } = useGetData(baseUrl);
  const { isFavourite, setIsFavourite } = useCheckIsFavourite(name);
  const { isInArena, setIsInArena, counter, setCounter } =
    useCheckIsInArena(name);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const validation = Pokedb?.results.some((pokemon) =>
    pokemon.name.includes(pokeDetails?.name)
  );

  if (!validation) {
    return <p>This name does not exist in the database.</p>;
  }

  const statsInfo = Object.entries(pokeDetails.stats).map(([key, value]) => (
    <div key={key} className="w-1/2 flex flex-col items-center p-2">
      <p className="text-xs">{value}</p>
      <p className="text-sm font-bold">
        {splitWords(capitalizeFirstLetter(key))}
      </p>
    </div>
  ));

  const handleFavourClick = () => {
    if (!isFavourite) {
      requestFavouriteToJson("post", pokeDetails);
      setIsFavourite(true);
    } else {
      requestFavouriteToJson("delete", pokeDetails);
      setIsFavourite(false);
    }
  };

  const handleArenaClick = () => {
    if (!isInArena && counter < 2) {
      requestArenaParticipantsJson("post", pokeDetails);
      setIsInArena(true);
      setCounter((prev) => prev + 1);
      //TODO ADD Notifications!!
    }
  };

  return (
    <div className="w-1/2 border border-gray-200 rounded-lg flex items-center justify-between p-2 gap-8 bg-gradient-to-r from-neutral-100 to-stone-200 shadow-xl">
      <div className="flex flex-col gap-4">
        <img
          src={pokeDetails.imgUrl}
          alt={pokeDetails.name}
          className="size-48"
        />
        {isLoggedIn && (
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <GiCrossedSwords size={36} onClick={handleArenaClick} />
              <div>{counter} / 2</div>
            </div>
            <GoHeartFill
              size={36}
              color={isFavourite ? "red" : "black"}
              onClick={handleFavourClick}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4">
        <p className="text-xl font-bold">
          {capitalizeFirstLetter(pokeDetails.name)}
        </p>
        <div className="flex flex-wrap">{statsInfo}</div>
      </div>
    </div>
  );
};
