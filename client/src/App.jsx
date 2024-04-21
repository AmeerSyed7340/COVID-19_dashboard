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

      <div name='nav' className="flex justify-center items-center bg-off-white shadow-md py-4">
        <Navbar />
      </div>

      {/*main content holder*/}
      <div>
        {/*Country name*/}
        <div>
          <p>Results for {search}</p>
        </div>

        {/*Country flag*/}
        <div>
          <img src={flag} alt="country_flag" />
        </div>

        {/*Country Stats*/}
        <div>
          <Statistics />
        </div>

        {/*Deaths*/}
        <div>
          <Deaths />
        </div>
      </div>
      {/*Vaccination info*/}
      <div>
        <Vaccination />
      </div>

      {/*Btn to scroll up*/}
      <div>
        <button>Search for another country</button>
      </div>
    </div>
  );
};

export default App;
