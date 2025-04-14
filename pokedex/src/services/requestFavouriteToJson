import axios from "axios";

const url = "http://localhost:3000/favourites/";

export const requestFavouriteToJson = async (request, pokeDetails) => {
  const data = { name: pokeDetails.name, id: pokeDetails.id };

  if (request === "post")
    axios.post(url, data).catch(function (error) {
      console.error(error);
    });
  if (request === "delete")
    axios.delete(`${url}${data.id}`).catch(function (error) {
      console.error(error);
    });
};
