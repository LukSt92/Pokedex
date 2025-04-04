import React from "react";

export const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
    >
      {children}
    </button>
  );
};
