import { useGetData } from "../../hooks/useGetData";
import { PokeCard } from "../../shared/PokeCard";
import { Title } from "../../shared/Title";
import { Loader } from "../../shared/Loader";

const url = "http://localhost:3000/favourites/";

export const Favourites = () => {
  const { data, isLoading } = useGetData(url);

  if (isLoading) return <Loader />;

  data.sort((a, b) => {
    return a.id - b.id;
  });

  return (
    <>
      <Title>Favourites</Title>
      {data.length === 0 && (
        <p>
          You have not added any Pokemon to your favorites yet, go to the main
          page to browse the list and create your collection!
        </p>
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((pokemon, index) => (
          <PokeCard key={index} name={pokemon.name} />
        ))}
      </div>
    </>
  );
};
