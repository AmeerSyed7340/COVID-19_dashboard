import "../styles/ContentHolder.css";
import Sidebar from './Sidebar'
import Comp1 from './Comp1'
import Comp2 from './Comp2' 
import Comp3 from './Comp3'
import Comp4 from './Comp4'

import { useState } from "react";
function ContentHolder() {
    const[states, setStates] = useState([]);
    const[eachState, setEachState] = useState({});//[state, setState]
    return (
        <div className="content-holder">
            <Sidebar setStates={setStates} setEachState={setEachState}/>
            <div className="main-content">
                <Comp1 states={states}/>
                <Comp2 eachState={eachState}/>
            </div>
        </div>
    );
}

export default ContentHolder;
