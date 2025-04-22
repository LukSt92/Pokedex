import axios from "axios";
import { useState, useEffect } from "react";
import { useGetData } from "./useGetData";

const url = "https://pokeapi.co/api/v2/pokemon?limit=150";

export const useGetAllPokemonsDetails = () => {
  const { data } = useGetData(url);
  const [allPokeDetails, setAllPokeDetails] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    data?.results.map((pokemon) => {
      const getData = async () => {
        try {
          const response = await axios.get(pokemon.url);
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
          setAllPokeDetails((prev) => [...prev, details]);
        } catch (error) {
          console.error(error);
        }
      };
      getData();
    });
    setisLoading(false);
  }, [data?.results]);

  return { allPokeDetails, isLoading };
};
