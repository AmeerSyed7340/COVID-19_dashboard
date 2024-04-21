import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const Deaths = () => {
  const { deaths } = useContext(SearchContext);

  return (
    <div>
      <p>Deaths</p>
      <p>{deaths}</p>
    </div>
  );
};

export default Deaths;
