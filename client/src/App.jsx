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
    <div className="grid grid-cols-1 gap-4">
      {/* context provider */}

      <div
        name="nav"
        className="flex justify-center items-center bg-off-white shadow-md py-4"
      >
        <Navbar />
      </div>

      {/*main content holder*/}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-10 md:px-[100px]'>

        {/*Country name*/}
        <div className="order-1 md:col-span-1 bg-off-white rounded-lg shadow-lg min-w-[330px]">
          <p className="capitalize underline font-bold mb-4 text-xl">
            Results for {search}
          </p>

          {/*Country flag*/}
          <div className="rounded-md shadow-lg">
            <img src={flag} alt="country_flag" className="w-full rounded-md" />
          </div>
        </div>

        {/*Country Stats*/}
        <div className="order-2 md:col-span-1 md:pt-20 md:px-10 bg-off-white rounded-lg shadow-lg p-4 min-w-[355px]">
          <Statistics />
        </div>

        {/*Deaths*/}
        <div className="order-3 sm:flex sm:justify-center md:block md:col-span-2 bg-gradient-to-b from-red-800 to-red-300 rounded-lg shadow-lg p-4 my-4">
          <Deaths />
        </div>

        {/*Bottom section*/}
        <div className="order-4 md:col-span-2 my-4">
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
    </div>
  );
};

export default App;
