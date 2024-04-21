import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const Deaths = () => {
  const { deaths } = useContext(SearchContext);

  return (
    <div className='flex justify-between text-white font-bold'>
      <p className='text-xl my-6'>DEATHS</p>
      <p className='text-xl my-6'>{deaths}</p>
    </div>
  );
};

export default Deaths;
