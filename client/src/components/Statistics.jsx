import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
const Statistics = () => {
  const { active, critical, recovered, population } = useContext(SearchContext);

  return (
    <div>
      <div className='flex justify-between my-6 md:my-10'>
        <p className='text-xl md:text-4xl'>Active</p>
        <p className='text-xl md:text-4xl text-blue-500'>{active}</p>
      </div>

      <div className='flex justify-between my-6 md:my-10'>
        <p className='text-xl md:text-4xl'>Critical</p>
        <p className='text-xl md:text-4xl text-pink-600'>{critical}</p>
      </div>

      <div className='flex justify-between my-6 md:my-10'>
        <p className='text-xl md:text-4xl'>Recovered</p>
        <p className='text-xl md:text-4xl text-green-500'>{recovered}</p>
      </div>

      <div className='flex justify-between my-6 md:my-10'>
        <p className='text-xl md:text-4xl'>Population</p>
        <p className='text-xl md:text-4xl text-gray-500'>{population}</p>
      </div>
    </div>
  );
};

export default Statistics;
