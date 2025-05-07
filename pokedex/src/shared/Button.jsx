import React from "react";

export const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-26 py-2 flex justify-center text-milk text-center bg-deep-sky font-medium rounded-lg text-sm"
    >
      {children}
    </button>
  );
};
