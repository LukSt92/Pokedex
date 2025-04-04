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
    .catch(function (error) {
      console.log(error);
    });
};
