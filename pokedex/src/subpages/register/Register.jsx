import React from "react";
import { Button } from "../../shared/Button";
import { useForm } from "react-hook-form";
import { useState } from "react";

const inputClass =
  "block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer";
const labelClass =
  "peer-focus:font-medium absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

export const Register = () => {
  const [userData, setUserData] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => setUserData(data);

  //TODO ADD ZOD VALIDATION AND <p> FOR ERROR MESSAGES && LOOK INFO FOR NOTISTACK
  // CREATE DBJSON TO STORE NEW USER DATA
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
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("email")}
            type="email"
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Email address</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("password")}
            type="text"
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Password</label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            {...register("confirmPassword")}
            type="text"
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Confirm password</label>
        </div>
        <div className="justify-self-center">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </>
  );
};
