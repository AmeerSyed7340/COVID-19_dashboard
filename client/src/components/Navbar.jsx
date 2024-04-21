import React, { useState, useContext, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { SearchContext } from "../context/SearchContext";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    updateCountry,
    updateFlag,
    updateActive,
    updateCritical,
    updateRecovered,
    updatePopulation,
    updateDeaths,
  } = useContext(SearchContext);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries/United%20States")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateCountry(data.country);
        updateFlag(data.countryInfo.flag);
        updateActive(data.active);
        updateCritical(data.critical);  
        updateRecovered(data.recovered);
        updatePopulation(data.population);
        updateDeaths(data.deaths);
      });
  }, []);

  const handleClick = () => {
    fetch("https://disease.sh/v3/covid-19/countries/United%20States")
      .then((response) => response.json())
      .then((data) => console.log(data));

    console.log(inputValue);
    updateCountry(inputValue);
    setInputValue("");
  };
  return (
    <div className="flex space-x-8">
      <div>
        <p>COVID Dashboard</p>
      </div>

      <div className="flex shadow-md rounded-[300px]">
        <input
          type="text"
          placeholder="Search for a country..."
          className="rounded-l-[300px] px-2 h-[25px]"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex justify-center items-center">
          <CiSearch className="w-[30px]" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
