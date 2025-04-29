import { Title } from "../../shared/Title";
import { ArenaPokeCard } from "./ArenaPokeCard";
import { GiCrossedSwords, GiTrophy } from "react-icons/gi";
import { useArenaHandler } from "./useArenaHandler";
import { useState } from "react";
import { Button } from "../../shared/Button.jsx";
import { capitalizeFirstLetter } from "../../utilis/capitalizeFirstLetter.js";
import { requestArenaParticipantsJson } from "../../services/requestArenaParticipantsJson.js";
import { useNotification } from "../../hooks/useNotification.js";

export const Arena = () => {
  const {
    firstPokemon,
    secondPokemon,
    isLoading,
    setFirstPokemon,
    setSecondPokemon,
    addOrUpdatePokeData,
  } = useArenaHandler();
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState({});
  const { toggleNotification } = useNotification();

  const handleFight = () => {
    if (secondPokemon === undefined)
      toggleNotification("You need 2 pokemons to start battle!", "error");
    else {
      const firstParticipant = firstPokemon;
      const secParticipant = secondPokemon;
      const firstPokeBP =
        firstPokemon.stats.base_experience * firstPokemon.stats.weight;
      const secPokeBP =
        secondPokemon.stats.base_experience * secondPokemon.stats.weight;

      if (firstPokeBP > secPokeBP) {
        firstParticipant.stats.base_experience += 10;
        firstParticipant.wins = (firstParticipant.wins || 0) + 1;
        secParticipant.losses = (secParticipant.losses || 0) + 1;
        setResults(firstParticipant);
        addOrUpdatePokeData(firstParticipant);
        addOrUpdatePokeData(secParticipant);
      }
      if (secPokeBP > firstPokeBP) {
        secParticipant.stats.base_experience += 10;
        secParticipant.wins = (secParticipant.wins || 0) + 1;
        firstParticipant.losses = (firstParticipant.losses || 0) + 1;
        setResults(secParticipant);
        addOrUpdatePokeData(firstParticipant);
        addOrUpdatePokeData(secParticipant);
      }
      setShowModal((prev) => !prev);
    }
  };

  const handleArenaLeave = () => {
    setShowModal((prev) => !prev);
    requestArenaParticipantsJson("delete", firstPokemon);
    requestArenaParticipantsJson("delete", secondPokemon);
    setFirstPokemon();
    setSecondPokemon();
  };

  if (isLoading) return <p>Loading</p>;

  return (
    <>
      <Title>Arena</Title>
      <div className="flex gap-8 items-center">
        <ArenaPokeCard pokeData={firstPokemon} setPokeData={setFirstPokemon} />
        <div
          onClick={handleFight}
          className="flex flex-col gap-2 items-center cursor-pointer hover:scale-110 transition duration-300"
        >
          <GiCrossedSwords size={96} />
          <p className="font-bold text-2xl">FIGHT!</p>
        </div>
        <ArenaPokeCard
          pokeData={secondPokemon}
          setPokeData={setSecondPokemon}
        />
        {showModal && (
          <div className="fixed z-2 right-0 top-1/6 h-1/2 w-full bg-bgPrimColor flex flex-col items-center gap-12 p-8 animate-opacity transition-colors duration-300">
            {results == {} ? (
              <Title>Draw</Title>
            ) : (
              <>
                <p className="font-bold text-2xl">and the winner is...</p>
                <p className="font-bold text-2xl animate-slow-opacity">
                  {capitalizeFirstLetter(results.name)}
                </p>
                <div className="flex justify-center items-center gap-8 animate-slow-opacity">
                  <GiTrophy size={100} color="gold" />
                  <img
                    src={results.imgUrl}
                    alt={results.name}
                    className="h-48 animate-bounce"
                  />
                  <GiTrophy size={100} color="gold" />
                </div>
                <Button onClick={handleArenaLeave}>Leave arena</Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
