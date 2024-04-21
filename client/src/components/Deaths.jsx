import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const Deaths = () => {
  const { deaths } = useContext(SearchContext);

  return (
    <div className="flex justify-between text-white font-bold sm:flex-col sm:justify-center sm:items-center md:flex-row md:justify-between">
      <p className="text-xl sm:text-4xl md:text-5xl md:px-10 my-6">DEATHS</p>
      <p className="text-xl sm:text-4xl md:text-5xl md:px-10 my-6">{deaths}</p>
    </div>
  );
};

export default Deaths;
