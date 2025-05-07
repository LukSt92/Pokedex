import { useEffect, useState } from "react";
import { useGetData } from "../../hooks/useGetData";
import { requestPokemonJson } from "../../services/requestPokemonJson";

const arenaUrl = "http://localhost:3000/arenaParticipants/";
const pokemonsJsonUrl = "http://localhost:3000/pokemons/";

export const useArenaHandler = () => {
  const { data: arenaParticipants } = useGetData(arenaUrl);
  const { data: pokeDbJson } = useGetData(pokemonsJsonUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [firstPokemon, setFirstPokemon] = useState();
  const [secondPokemon, setSecondPokemon] = useState();

  useEffect(() => {
    setIsLoading(true);
    if (arenaParticipants) {
      setFirstPokemon(arenaParticipants[0]);
      setSecondPokemon(arenaParticipants[1]);
      setIsLoading(false);
    }
  }, [arenaParticipants]);

  const addOrUpdatePokeData = (pokeDetails) => {
    const isPokemonInJson = pokeDbJson.some(
      (pokemon) => pokemon.name === pokeDetails.name
    );
    if (isPokemonInJson) requestPokemonJson("put", pokeDetails);
    else requestPokemonJson("post", pokeDetails);
  };

  return {
    firstPokemon,
    secondPokemon,
    isLoading,
    setFirstPokemon,
    setSecondPokemon,
    addOrUpdatePokeData,
  };
};
