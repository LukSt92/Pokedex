import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Button } from "../../shared/Button";

export const Pagination = ({ page, maxPage, setPage }) => {
  const handleClick = (variant) => {
    if (variant === "next") {
      if (page === maxPage) return;
      setPage((prev) => prev + 1);
    }
    if (variant === "prev") {
      if (page === 1) return;
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <Button onClick={() => handleClick("prev")}>
        <FiArrowLeft className=" text-xl md:text-lg" />
      </Button>
      <p>
        Page <strong>{page}</strong> of&nbsp;
        <strong>{maxPage.toString()}</strong>
      </p>
      <Button onClick={() => handleClick("next")}>
        <FiArrowRight className=" text-xl md:text-lg" />
      </Button>
    </div>
  );
};
