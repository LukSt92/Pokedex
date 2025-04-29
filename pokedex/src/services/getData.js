import axios from "axios";

export const GetData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;
    const details = {
      id: data?.id,
      name: data?.name,
      imgUrl: data?.sprites.other.dream_world.front_default,
      stats: {
        height: data?.height,
        base_experience: data?.base_experience,
        weight: data?.weight,
        ability: data?.abilities[0].ability.name,
      },
    };

    return details;
  } catch (error) {
    console.error(error);
  }
};
