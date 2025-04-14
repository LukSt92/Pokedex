import axios from "axios";
import { useEffect, useState } from "react";

const url = "http://localhost:3000/favourites";

export const useCheckIsFavourite = (name) => {
  const [isFavourite, setIsFavourite] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const check = data.some((pokemon) => pokemon.name.includes(name));

        setIsFavourite(check);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [name]);

  return { isFavourite, setIsFavourite };
};
