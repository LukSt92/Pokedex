import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { useGetPokeDetails } from "../../hooks/useGetPokeDetails";
import { capitalizeFirstLetter } from "../../utilis/capitalizeFirstLetter";
import { Title } from "../../shared/Title";
import { InputGroup } from "../../shared/InputGroup";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPokemonSchema } from "../../services/schema";
import { Button } from "../../shared/Button";
import { requestPokemonJson } from "../../services/requestPokemonJson";
import { useNotification } from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";

const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
const pokemonsJsonUrl = "http://localhost:3000/pokemons/";

export const EditPokemon = () => {
  const { name } = useParams();
  const { pokeDetails, isLoading } = useGetPokeDetails(name);
  const { data: pokeDbJson } = useGetData(pokemonsJsonUrl);
  const { data: Pokedb } = useGetData(baseUrl);
  const { toggleNotification } = useNotification();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editPokemonSchema),
    defaultValues: {
      height: "",
      weight: "",
      experience: "",
    },
    values: {
      height: pokeDetails?.stats.height,
      weight: pokeDetails?.stats.weight,
      experience: pokeDetails?.stats.base_experience,
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  const validation = Pokedb?.results.some((pokemon) =>
    pokemon.name.includes(pokeDetails?.name)
  );

  if (!validation) {
    return <p>This name does not exist in the database.</p>;
  }

  const addOrUpdatePokeData = (pokeData) => {
    const isPokemonInJson = pokeDbJson.some(
      (pokemon) => pokemon.name === pokeData.name
    );
    if (isPokemonInJson) requestPokemonJson("put", pokeData);
    else requestPokemonJson("post", pokeData);
  };

  const onSubmit = (data) => {
    const pokemonToChange = {
      id: pokeDetails.id,
      name: pokeDetails.name,
      imgUrl: pokeDetails.imgUrl,
      stats: {
        height: data.height,
        base_experience: data.experience,
        weight: data.weight,
        ability: pokeDetails.stats.ability,
      },
      wins: pokeDetails?.wins,
      losses: pokeDetails?.losses,
    };

    addOrUpdatePokeData(pokemonToChange);
    toggleNotification(
      `${capitalizeFirstLetter(
        pokemonToChange.name
      )}'s attributes have been changed`,
      "success"
    );
    navigate("/");
  };

  return (
    <>
      <Title>{capitalizeFirstLetter(pokeDetails.name)}</Title>
      <img
        src={pokeDetails.imgUrl}
        alt={pokeDetails.name}
        className="size-36"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup
          register={register}
          type={"number"}
          name={"height"}
          errors={errors.height}
        />
        <InputGroup
          register={register}
          type={"number"}
          name={"weight"}
          errors={errors.weight}
        />
        <InputGroup
          register={register}
          type={"number"}
          name={"experience"}
          errors={errors.experience}
        />
        <div className="justify-self-center">
          <Button type="submit">Change</Button>
        </div>
      </form>
    </>
  );
};
