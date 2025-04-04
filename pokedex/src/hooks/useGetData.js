import { useEffect, useState } from "react";
import axios from "axios";

export const useGetData = (url) => {
  const [data, setData] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [url]);

  return { data };
};
