import axios from "axios";

const url = "http://localhost:3000/users";

export const createNewUser = async (data) => {
  axios
    .post(url, {
      userName: data.username,
      email: data.email,
      password: data.password,
    })
    .catch(function (error) {
      console.error(error);
    });
};
