import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
const Statistics = () => {
  const { active, critical, recovered, population } = useContext(SearchContext);

  return (
    <div>
      <div className='flex'>
        <p>Active</p>
        <p>{active}</p>
      </div>

      <div className='flex'>
        <p>Critical</p>
        <p>{critical}</p>
      </div>

      <div className='flex'>
        <p>Recovered</p>
        <p>{recovered}</p>
      </div>

      <div className='flex'>
        <p>Population</p>
        <p>{population}</p>
      </div>
    </div>
  );
};

export default Statistics;
