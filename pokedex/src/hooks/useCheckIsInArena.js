import axios from "axios";
import { useEffect, useState } from "react";

const url = "http://localhost:3000/arenaParticipants";

export const useCheckIsInArena = (name) => {
  const [isInArena, setIsInArena] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        const check = data.some((pokemon) => pokemon.name.includes(name));

        setIsInArena(check);
        setCounter(data.length);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [name]);

  return { isInArena, setIsInArena, counter, setCounter };
};
