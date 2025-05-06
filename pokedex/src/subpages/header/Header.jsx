import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeSwitch } from "./ThemeSwitch";
import { Button } from "../../shared/Button";
import { LoginContext } from "../../context/LoginContext";

const routes = {
  basics: [
    { name: "Favourites", id: 1, path: "favourites" },
    { name: "Arena", id: 2, path: "arena" },
    { name: "Ranking", id: 3, path: "ranking" },
    { name: "Edit", id: 4, path: "edit" },
  ],
  toLog: [
    { name: "Register", id: 5, path: "register" },
    { name: "Login", id: 6, path: "login" },
  ],
};

export const Header = () => {
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleClick = () => {
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="flex w-screen p-8 border-b-4 border-border-color max-lg:flex-col max-lg:items-center">
      <Link to={"/"} className="shrink-0">
        <img src={"../../../International_Pokémon_logo.svg"}></img>
      </Link>
      <div className="flex flex-col items-end grow gap-4 max-lg:items-center">
        <div className="flex items-center gap-2">
          {isLoggedIn && <h4 className="font-bold">{userName}</h4>}
          <ThemeSwitch />
        </div>
        <div className="flex flex-wrap gap-2 justify-end max-md:flex-col">
          {routes.basics.map(({ name, id, path }) => (
            <Link key={id} to={isLoggedIn && path}>
              <Button>{name}</Button>
            </Link>
          ))}
          {!isLoggedIn ? (
            routes.toLog.map(({ name, id, path }) => (
              <Link key={id} to={path}>
                <Button>{name}</Button>
              </Link>
            ))
          ) : (
            <Button onClick={handleClick}>Log out</Button>
          )}
        </div>
      </div>
    </div>
  );
};
