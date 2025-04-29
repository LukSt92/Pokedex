import axios from "axios";

const url = "http://localhost:3000/pokemons/";

export const requestPokemonJson = async (request, pokeDetails) => {
  if (request === "post")
    axios.post(url, pokeDetails).catch(function (error) {
      console.error(error);
    });
  if (request === "put")
    axios.put(`${url}${pokeDetails.id}`, pokeDetails).catch(function (error) {
      console.error(error);
    });
};
