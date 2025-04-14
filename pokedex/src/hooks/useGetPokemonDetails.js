import axios from "axios";
import { useState, useEffect } from "react";

const urlApi = "https://pokeapi.co/api/v2/pokemon/";

export const useGetPokemonDetails = (name) => {
  const [pokeDetails, setPokeDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${urlApi}${name}`);
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
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [name]);
  return { pokeDetails, isLoading };
};
