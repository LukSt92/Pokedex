import React from "react";
import { capitalizeFirstLetter } from "../../utilis/capitalizeFirstLetter";
import { Input } from "../../shared/Input";
import { Label } from "../../shared/Label";

export const RegisterInput = ({ register, type, name, errors }) => {
  return (
    <div className="relative z-0 w-75 mb-5 group">
      <Input {...register(name)} type={type} />
      <Label>{capitalizeFirstLetter(name)}</Label>
      {errors && (
        <p className="text-red-500 text-sm font-medium">{errors.message}</p>
      )}
    </div>
  );
};
