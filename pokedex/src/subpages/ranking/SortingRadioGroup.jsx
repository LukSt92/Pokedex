import { capitalizeFirstLetter } from "../../utilis/capitalizeFirstLetter";
import { splitWords } from "../../utilis/splitWords";

export const SortingRadioGroup = ({ setSortBy }) => {
  const values = ["height", "weight", "base_experience", "wins"];

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="text-xl font-semibold">Sort by:</p>
      <ul className="w-2/3 flex justify-evenly px-2 text-sm font-medium border border-deep-gold rounded-lg sm:flex">
        {values.map((value, index) => (
          <li key={index}>
            <div className="flex items-center ps-3">
              <input
                type="radio"
                value={value}
                name="list-radio"
                className="min-w-6 min-h-6"
                onClick={() => setSortBy(value)}
              />
              <label className="w-full py-3 ms-2 text-sm font-medium">
                {capitalizeFirstLetter(splitWords(value))}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
