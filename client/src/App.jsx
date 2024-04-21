import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { SearchContext } from "./context/SearchContext";
import Statistics from "./components/Statistics";

const App = () => {
  const { search, flag } = useContext(SearchContext);
  console.log(search);
  return (
    <div>
      {/* context provider */}

      <div className="flex justify-center items-center bg-off-white shadow-md py-4">
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
          <p></p>
          <p></p>
        </div>
      </div>
      {/*Vaccination info*/}
      <div>
        <p></p>
        <div>{/*bar chart*/}</div>
      </div>

      {/*Btn to scroll up*/}
      <div>
        <button>Scroll up</button>
      </div>
    </div>
  );
};

export default App;
