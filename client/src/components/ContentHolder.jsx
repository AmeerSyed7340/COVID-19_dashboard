import "../styles/ContentHolder.css";
import Sidebar from "./Sidebar";
import Comp1 from "./Comp1";
import Comp2 from "./Comp2";
import Comp3 from "./Comp3";
import Comp4 from "./Comp4";

import { useState } from "react";
function ContentHolder() {
  const [states, setStates] = useState([]);
  const [eachState, setEachState] = useState({}); //[state, setState]
  const [stateName, setStateName] = useState(''); //[stateName, setStateName
  return (
    <div className='flex h-screen w-screen'>
      <Sidebar setStates={setStates} setEachState={setEachState} setStateName={setStateName}/>
      <div className="main-content">
        <div className="main-content-top">
          <Comp1 states={states} />
          <Comp2 eachState={eachState} />
        </div>
        <div className="main-content-bot">
          <Comp3 stateName={stateName} />
          <Comp4 stateName={stateName} />
        </div>
      </div>
    </div>
  );
}

export default ContentHolder;
