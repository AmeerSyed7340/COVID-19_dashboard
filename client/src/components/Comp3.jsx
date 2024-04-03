import { useEffect, useState } from "react";
import "../styles/Comp3.css";

function Comp3({ stateName }) {
  const [stateLast30Days, setStateLast30Days] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if(stateName === '') {
        return;
      }else{
        async function fetchData() {
          //https://disease.sh/v3/covid-19/nyt/states/${encodeURIComponent(stateName)?lastdays=30
          const response = await fetch(`https://disease.sh/v3/covid-19/nyt/states/${encodeURIComponent(stateName)}?lastdays=30`);
          const data = await response.json();
          setStateLast30Days(data);
          console.log(data);
        }
        fetchData();
      }
    }
    fetchData();
  }, [stateName]);
  return<>
    <div className="comp3">
      <h1>Last 30 days in {stateName}</h1>
      <div className="comp3-data">
        <div className="state">
          {stateLast30Days.map((state, index) => {
            return <div key={index} className="state">
              <h3>{state.date}</h3>
              <p>Cases: {state.cases}</p>
              <p>Deaths: {state.deaths}</p>
            </div>;
          })}
        </div>
      </div>
    </div>
  </>;
}

export default Comp3;
