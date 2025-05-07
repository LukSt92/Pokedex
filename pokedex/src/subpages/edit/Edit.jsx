import { useGetAllPokemonsDetails } from "../../hooks/useGetAllPokemonsDetails";
import { Title } from "../../shared/Title";
import { capitalizeFirstLetter } from "../../utilis/capitalizeFirstLetter";
import { Button } from "../../shared/Button";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
  const { allPokeDetails, isLoading } = useGetAllPokemonsDetails();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  const handleEditClick = (name) => {
    navigate(`/edit/${name}`);
  };

  return (
    <>
      <Title>Edit</Title>
      <ul className="flex flex-col items-stretch gap-4 w-2/3 max-md:text-xs max-md:w-4/5 max-sm:text-[10px]">
        {allPokeDetails.map((pokemon, index) => (
          <li
            key={index}
            className="flex justify-between font-medium px-3 items-center border border-deep-gold rounded-lg bg-gradient-to-r from-bg-prim-color to-bg-sec-color shadow-xl transition-colors duration-300"
          >
            <div>{index + 1}</div>
            <img
              src={pokemon.imgUrl}
              alt={pokemon.name}
              className="size-12 max-sm:size-8 justify-self-center"
            />
            <div>{capitalizeFirstLetter(pokemon.name)}</div>
            <div
              className="text-deep-gold font-bold underline underline-offset-4 text-lg"
              onClick={() => handleEditClick(pokemon.name)}
            >
              Edit
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
