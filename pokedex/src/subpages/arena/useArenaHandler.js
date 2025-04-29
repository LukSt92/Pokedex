import React, { useEffect, useState } from "react";
import { useGetData } from "../../hooks/useGetData";
import { GetData } from "../../services/GetData";

const arenaUrl = "http://localhost:3000/arenaParticipants/";
const pokemonsJsonUrl = "http://localhost:3000/pokemons/";
const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/";

export const useArenaHandler = () => {
  const { data: arenaParticipants } = useGetData(arenaUrl);
  const { data: pokeDbJson } = useGetData(pokemonsJsonUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [firstPokemon, setFirstPokemon] = useState();
  const [secondPokemon, setSecondPokemon] = useState();

  useEffect(() => {
    setIsLoading(true);
    const getAndSetFighter = async (id, setter) => {
      const isExist = pokeDbJson.some((pokemon) => pokemon.id === id);
      if (!isExist) setter(await GetData(`${pokemonApiUrl}${id}`));
      else setter(pokeDbJson.filter((pokemon) => pokemon.id === id));
    };

    if (arenaParticipants && pokeDbJson) {
      if (arenaParticipants[0])
        getAndSetFighter(arenaParticipants[0]?.id, setFirstPokemon);
      if (arenaParticipants[1])
        getAndSetFighter(arenaParticipants[1]?.id, setSecondPokemon);
      setIsLoading(false);
    }
  }, [arenaParticipants, pokeDbJson]);

  return {
    firstPokemon,
    secondPokemon,
    isLoading,
    setFirstPokemon,
    setSecondPokemon,
  };
};
