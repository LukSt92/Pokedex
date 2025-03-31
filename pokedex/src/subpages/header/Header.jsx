import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeSwitch } from "./ThemeSwitch";

const routes = [
  { name: "Home", id: 1, path: "/" },
  { name: "Arena", id: 2, path: "arena" },
];

export const Header = () => {
  return (
    <div className="flex w-screen p-8 border-b-4 border-indigo-500">
      <img src={"../../../International_Pokémon_logo.svg"}></img>
      <div className="flex flex-col items-end grow gap-4">
        <div className="flex items-center gap-2">
          <h4>UserName TODO</h4>
          <ThemeSwitch />
        </div>
        <div className="flex justify-stretch">
          {routes.map(({ name, id, path }) => (
            <NavLink key={id} to={path}>
              <button
                type="button"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                {name}
              </button>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
