import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3000/";

export const useGetAllUsersData = (addUrl) => {
  const [allUsersData, setAllUsersData] = useState();
  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await axios.get(`${baseUrl}${addUrl}`);
        setAllUsersData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllUsers();
  }, []);

  return { allUsersData };
};
