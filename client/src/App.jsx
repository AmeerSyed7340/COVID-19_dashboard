import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { SearchContext } from "./context/SearchContext";
import Statistics from "./components/Statistics";
import Deaths from "./components/Deaths";
import Vaccination from "./components/Vaccination";
import { Link, Events } from "react-scroll";

const App = () => {
  const { search, flag } = useContext(SearchContext);
  console.log(search);

  // Scroll to the top of the page and focus on the input element
  const handleScroll = () => {
    document.getElementById("searchInput").focus();
  };

  return (
    <div className='grid grid-cols-1 sm:hidden'>
      {/* context provider */}

      <div
        name="nav"
        className="flex justify-center items-center bg-off-white shadow-md py-4"
      >
        <Navbar />
      </div>

      {/*main content holder*/}
      
        {/*Country name*/}
        <div className="my-4 mx-6">
          <p className="capitalize underline font-bold mb-4 text-xl">
            Results for {search}
          </p>
          {/*Country flag*/}
          <div className="rounded-md shadow-lg">
            <img src={flag} alt="country_flag" className="w-full rounded-md" />
          </div>
        </div>

        {/*Country Stats*/}
        <div className="my-4 mx-6 px-2 rounded-lg shadow-lg bg-off-white">
          <Statistics />
        </div>

        {/*Deaths*/}
        <div className="my-4 rounded-lg shadow-lg mx-6 px-2 bg-gradient-to-b from-red-800 to-red-300">
          <Deaths />
        </div>
      

      {/*Bottom section*/}
      <div className="mx-6 my-4 sm:hidden">
        <p className="capitalize underline font-bold mb-4 text-xl">
          Global Vaccination for Last 30 days
        </p>
        {/*Vaccination info*/}
        <div className="rounded-lg shadow-lg">
          <Vaccination />
        </div>

        {/*Btn to scroll up*/}
        <div className="flex justify-center my-4 sm:hidden">
          <Link to="nav" smooth duration={500} onSetActive={handleScroll}>
            <button className="bg-slate-500 p-4 rounded-lg capitalize">
              Search for another country
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;
