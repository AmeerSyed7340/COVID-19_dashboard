import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext(); // Create a context

export const SearchContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [flag, setFlag] = useState("");

  //stats
  const [active, setActive] = useState("");
  const [critical, setCritical] = useState("");
  const [recovered, setRecovered] = useState("");
  const [population, setPopulation] = useState("");
  const [deaths, setDeaths] = useState("");

  const updateCountry = (countryName) => {
    setSearch(countryName);
  };

  const updateFlag = (flagUrl) => {
    setFlag(flagUrl);
  };

  const updateActive = (activeCases) => {
    setActive(activeCases);
  };

  const updateCritical = (criticalCases) => {
    setCritical(criticalCases);
  };

  const updateRecovered = (recoveredCases) => {
    setRecovered(recoveredCases);
  };

  const updatePopulation = (populationCount) => {
    setPopulation(populationCount);
  };

  const updateDeaths = (deathCount) => {
    setDeaths(deathCount);
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        updateCountry,
        flag,
        updateFlag,
        active,
        updateActive,
        critical,
        updateCritical,
        recovered,
        updateRecovered,
        population,
        updatePopulation,
        deaths,
        updateDeaths,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
