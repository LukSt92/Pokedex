import React from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeSwitch } from "./ThemeSwitch";

const routes = [
  { name: "Favourites", id: 1, path: "favourites" },
  { name: "Arena", id: 2, path: "arena" },
  { name: "Ranking", id: 3, path: "ranking" },
  { name: "Edit", id: 4, path: "edit" },
  { name: "Register", id: 5, path: "register" },
  { name: "Login", id: 6, path: "login" },
];

export const Header = () => {
  return (
    <div className="flex w-screen p-8 border-b-4 border-indigo-500">
      <Link to={"/"}>
        <img src={"../../../International_Pokémon_logo.svg"}></img>
      </Link>
      <div className="flex flex-col items-end grow gap-4">
        <div className="flex items-center gap-2">
          <h4>UserName TODO</h4>
          <ThemeSwitch />
        </div>
        <div className="flex justify-stretch">
          {routes.map(({ name, id, path }) => (
            <Link key={id} to={path}>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                {name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
