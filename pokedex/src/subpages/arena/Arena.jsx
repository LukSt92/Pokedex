import { Title } from "../../shared/Title";
import { ArenaPokeCard } from "./ArenaPokeCard";
import { GiCrossedSwords } from "react-icons/gi";
import { useArenaHandler } from "./useArenaHandler";
import { postPokemonToJson } from "../../services/postPokemonToJson.js";
import { useEffect, useState } from "react";

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
  const results = {};

  const handleFight = () => {
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
      results.winner = firstParticipant;
      addOrUpdatePokeData(firstParticipant);
      addOrUpdatePokeData(secParticipant);
    }
    if (secPokeBP > firstPokeBP) {
      secParticipant.stats.base_experience += 10;
      secParticipant.wins = (secParticipant.wins || 0) + 1;
      firstParticipant.losses = (firstParticipant.losses || 0) + 1;
      results.winner = secParticipant;
      addOrUpdatePokeData(firstParticipant);
      addOrUpdatePokeData(secParticipant);
    }
    // setShowModal((prev) => !prev);
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
          <div className="fixed z-2 top-1/6 h-1/2 w-1/2 border">Test Test</div>
        )}
      </div>
    </>
  );
};
