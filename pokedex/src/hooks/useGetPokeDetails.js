import { useState, useEffect, useContext } from "react";
import { useGetData } from "./useGetData";
import { LoginContext } from "../context/LoginContext";
import axios from "axios";

const pokemonsJsonUrl = "http://localhost:3000/pokemons/";
const pokemonsApiUrl = "https://pokeapi.co/api/v2/pokemon/";

export const useGetPokeDetails = (name) => {
  const { isLoggedIn } = useContext(LoginContext);
  const { data: pokeDbJson } = useGetData(pokemonsJsonUrl);
  const [pokeDetails, setPokeDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isPokemonInJson = pokeDbJson?.some(
      (pokemon) => pokemon.name === name
    );
    const getDataApi = async () => {
      setIsLoading(true);
      try {
        if (isLoggedIn && isPokemonInJson) {
          const pokemonToSet = pokeDbJson.filter(
            (pokemon) => pokemon.name === name
          );
          setPokeDetails(pokemonToSet[0]);
        } else {
          const response = await axios.get(`${pokemonsApiUrl}${name}`);
          const data = response.data;
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
          setPokeDetails(details);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    getDataApi();
  }, [isLoggedIn, name, pokeDbJson]);

  return { pokeDetails, isLoading };
};
