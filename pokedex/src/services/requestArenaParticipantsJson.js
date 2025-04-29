import axios from "axios";

const url = "http://localhost:3000/arenaParticipants/";

export const requestArenaParticipantsJson = async (request, pokeDetails) => {
  if (request === "post")
    axios.post(url, pokeDetails).catch(function (error) {
      console.error(error);
    });
  if (request === "delete")
    axios.delete(`${url}${pokeDetails.id}`).catch(function (error) {
      console.error(error);
    });
};
