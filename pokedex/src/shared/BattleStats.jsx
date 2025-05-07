export const BattleStats = ({ pokeDetails }) => {
  return (
    <div className="absolute flex flex-col top-0 left-0 bg-deep-gold p-3 font-bold text-center text-raisin-black rounded-tl-sm rounded-br-lg">
      <div className="flex gap-2">
        <p>W:</p>
        <p>{pokeDetails?.wins || 0}</p>
      </div>
      <div className="flex w-full place-content-between ">
        <p>L:</p>
        <p>{pokeDetails?.losses || 0}</p>
      </div>
    </div>
  );
};
