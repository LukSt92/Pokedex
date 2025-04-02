import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("userIsLoggedIn") === "true";
    setLoggedIn(loggedIn);
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
