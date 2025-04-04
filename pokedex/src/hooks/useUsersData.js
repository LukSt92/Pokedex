import { useEffect, useState } from "react";
import { getData } from "../services/getData";

const url = "http://localhost:3000/users/";

export const useUsersData = () => {
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    setUsersData(getData(url));
  }, []);

  return { usersData };
};
