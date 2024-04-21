import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { SearchContext } from "./context/SearchContext";
import Statistics from "./components/Statistics";
import Deaths from "./components/Deaths";
import Vaccination from "./components/Vaccination";

const App = () => {
  const { search, flag } = useContext(SearchContext);
  console.log(search);
  return (
    <div>
      {/* context provider */}

      <div
        name="nav"
        className="flex justify-center items-center bg-off-white shadow-md py-4"
      >
        <Navbar />
      </div>

      {/*main content holder*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 px-6">
        {/*Country name*/}
        <div className="my-4">
          <p className="capitalize underline font-bold mb-4">
            Results for {search}
          </p>
          {/*Country flag*/}
          <div className="rounded-md shadow-lg">
            <img src={flag} alt="country_flag" className="w-full rounded-md" />
          </div>
        </div>

        {/*Country Stats*/}
        <div className="my-4 rounded-lg shadow-lg px-2 bg-off-white">
          <Statistics />
        </div>

        {/*Deaths*/}
        <div className="my-4 rounded-lg shadow-lg px-2 bg-gradient-to-b from-red-800 to-red-300">
          <Deaths />
        </div>
      </div>

      {/*Bottom section*/}
      <div className="px-6 my-4">
        {/*Vaccination info*/}
        <div className="rounded-lg shadow-lg">
          <Vaccination />
        </div>

        {/*Btn to scroll up*/}
        <div className="flex justify-center my-4">
          <button className="bg-slate-500 p-4 rounded-lg capitalize">
            Search for another country
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
