import React, { useEffect } from "react";
import { Button } from "../../shared/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long." }),
    email: z.string().email({ message: "Incorrect email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        {
          message:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character and be at least 8 characters long.",
        }
      ),
    confirmPassword: z.string(),
  })
  .refine((userData) => userData.password === userData.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const baseUrl = "http://localhost:3000/users";

const inputClass =
  "block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
const labelClass =
  "peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema), defaultValues: {} });

  const onSubmit = (data) => {
    if (allUsersData.some((user) => user.userName === data.username))
      console.log("test");
    //TODO ADD NOTISTACK!!
    else createNewUser(data);
  };

  async function createNewUser(data) {
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
  }
  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await axios.get(baseUrl);
        setAllUsersData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getAllUsers();
  }, []);
  const [allUsersData, setAllUsersData] = useState([]);

  return (
    <>
      <p className="text-4xl font-bold">Create new account</p>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("username")}
            type="text"
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Username</label>
          {errors?.username && <p>{errors.username.message}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("email")}
            type="email"
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Email address</label>
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("password")}
            type="password"
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Password</label>
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("confirmPassword")}
            type="password"
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Confirm password</label>
          {errors?.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="justify-self-center">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </>
  );
};
