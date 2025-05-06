import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { useGetPokeDetails } from "../../hooks/useGetPokeDetails";

const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

export const EditPokemon = () => {
  const { name } = useParams();
  const { pokeDetails, isLoading } = useGetPokeDetails(name);
  const { data: Pokedb } = useGetData(baseUrl);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const validation = Pokedb?.results.some((pokemon) =>
    pokemon.name.includes(pokeDetails?.name)
  );

  if (!validation) {
    return <p>This name does not exist in the database.</p>;
  }

  return <div>Edit Pokemon</div>;
};
