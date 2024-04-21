import React, { useState, useContext, useEffect, useRef } from "react";
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

  const inputRef = useRef(null); // Create a ref using the useRef hook

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
    if (inputValue.trim() === "") {
      alert("Please enter a country name.");
      return; // Return or show an error message if the input is empty
    }

    fetch(
      `https://disease.sh/v3/covid-19/countries/${encodeURIComponent(
        inputValue
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.country) {
          // Check if the data includes the country key
          console.log(data);
          updateCountry(data.country);
          updateFlag(data.countryInfo?.flag || "");
          updateActive(data.active || 0);
          updateCritical(data.critical || 0);
          updateRecovered(data.recovered || 0);
          updatePopulation(data.population || 0);
          updateDeaths(data.deaths || 0);
        } else {
          throw new Error("Invalid country");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Please enter a valid country name."); // Alert the user to enter a valid country
      });

    setInputValue(""); // Clear the input field after the search
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
          id="searchInput"
        />
        <div className="flex justify-center items-center">
          <CiSearch className="w-[30px]" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
