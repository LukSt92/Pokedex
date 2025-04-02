import React from "react";
import axios from "axios";

const baseUrl = "http://localhost:3000/users";

export const createNewUser = async (data) => {
  axios
    .post(baseUrl, {
      userName: data.username,
      email: data.email,
      password: data.password,
    })
    .then(function (response) {
      console.log(response);
      //ADD NOTISTACK INFO HERE OR ADD FINALLY!!!
    })
    .catch(function (error) {
      console.log(error);
    });
};
