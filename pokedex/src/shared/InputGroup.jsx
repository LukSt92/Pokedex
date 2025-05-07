import React from "react";
import { capitalizeFirstLetter } from "../utilis/capitalizeFirstLetter";

const inputClass =
  "block py-2.5 px-0 w-full font-medium text-base bg-transparent border-0 border-b-2 border-deep-gold appearance-none focus:outline-none focus:ring-0 focus:border-deep-sky peer";
const labelClass =
  "peer-focus:font-bold font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-deep-sky peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";

export const InputGroup = ({ register, type, name, errors }) => {
  return (
    <div className="relative z-0 w-75 mb-5 group">
      <input
        {...register(name)}
        type={type}
        className={inputClass}
        placeholder=" "
      />
      <label className={labelClass}>{capitalizeFirstLetter(name)}</label>
      {errors && (
        <p className="text-red-500 text-sm font-medium">{errors.message}</p>
      )}
    </div>
  );
};
