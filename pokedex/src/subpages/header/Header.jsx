import React from "react";
import { NavLink } from "react-router-dom";

const routes = [
  { name: "Home", id: 1, path: "/" },
  { name: "Arena", id: 2, path: "arena" },
];

export const Header = () => {
  return (
    <div>
      <img src={"../../../International_Pokémon_logo.svg"}></img>
      <div>
        <div>
          <h4>UserName TODO</h4>
          <h4>Switch L/D</h4>
        </div>
        <div>
          {routes.map(({ name, id, path }) => (
            <NavLink key={id} to={path}>
              <button>{name}</button>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
