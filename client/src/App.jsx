import React from "react";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <div className='flex justify-center items-center bg-off-white shadow-md py-4'>
        <Navbar />
      </div>

      {/*main content holder*/}
      <div>
        {/*Country name*/}
        <div>
          <p>Results for country name</p>
        </div>

        {/*Country flag*/}
        <div><img src="" alt="" /></div>

        {/*Country Stats*/}
        <div>
          <div>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <p></p>
          </div>
        </div>

        {/*Deaths*/}
        <div>
          <p></p>
          <p></p>
        </div>

        {/*Vaccination info*/}
        <div>
          <p></p>
          <div>
            {/*bar chart*/}
          </div>
        </div>

        {/*Btn to scroll up*/}
        <div>
          <button>Scroll up</button>
        </div>
      </div>
    </div>
  );
};

export default App;
