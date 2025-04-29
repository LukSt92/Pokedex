import { PokeCard } from "../../shared/PokeCard";
import placeholder from "../../../public/placeholder.jpg";
import { RxCross2 } from "react-icons/rx";
import { requestArenaParticipantsJson } from "../../services/requestArenaParticipantsJson";

export const ArenaPokeCard = ({ pokeData, setPokeData }) => {
  const handleClick = () => {
    requestArenaParticipantsJson("delete", pokeData);
    setPokeData();
  };

  return (
    <>
      {pokeData ? (
        <PokeCard name={pokeData.name} arena={true}>
          <RxCross2
            onClick={handleClick}
            size={24}
            className="absolute top-0 right-0"
          />
        </PokeCard>
      ) : (
        <img src={placeholder} className="w-sm" />
      )}
    </>
  );
};
