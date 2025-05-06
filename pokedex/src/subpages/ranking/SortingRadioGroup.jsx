import React from "react";
import { capitalizeFirstLetter } from "../../utilis/capitalizeFirstLetter";
import { splitWords } from "../../utilis/splitWords";

export const SortingRadioGroup = ({ setSortBy }) => {
  const values = ["height", "weight", "base_experience"];

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
      <p className="text-xl font-semibold">Sort by:</p>
      <ul className="w-1/2 text-sm font-medium border border-border-color rounded-lg sm:flex">
        {values.map((value, index) => (
          <li key={index} className="w-full border-b border-border-color">
            <div className="flex items-center ps-3">
              <input
                type="radio"
                value={value}
                name="list-radio"
                className="w-6 h-6 bg-gray-100 border-gray-300 focus:ring-blue-500"
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
