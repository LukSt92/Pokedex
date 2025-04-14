import { capitalizeFirstLetter } from "../utilis/capitalizeFirstLetter";
import { splitWords } from "../utilis/splitWords";
import { useNavigate } from "react-router-dom";
import { useGetPokemonDetails } from "../hooks/useGetPokemonDetails";

export const PokeCard = ({ name }) => {
  const { pokeDetails, isLoading } = useGetPokemonDetails(name);
  const navigate = useNavigate();

  const handleClick = () => navigate(`/summary/${pokeDetails.name}`);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const statsInfo = Object.entries(pokeDetails.stats).map(([key, value]) => (
    <div key={key} className="w-1/2 flex flex-col items-center p-2">
      <p className="text-xs">{value}</p>
      <p className="text-sm font-bold">
        {splitWords(capitalizeFirstLetter(key))}
      </p>
    </div>
  ));

  return (
    <div
      onClick={handleClick}
      className="w-sm border border-gray-200 rounded-lg flex flex-col items-center p-2 gap-8 bg-gradient-to-r from-neutral-100 to-stone-200 shadow-xl hover:scale-105 transition duration-300"
    >
      <img
        src={pokeDetails.imgUrl}
        alt={pokeDetails.name}
        className="size-48"
      />
      <p className="text-xl font-bold">
        {capitalizeFirstLetter(pokeDetails.name)}
      </p>
      <div className="flex flex-wrap">{statsInfo}</div>
    </div>
  );
};
