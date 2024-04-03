import "../styles/Comp2.css";

function Comp2({ eachState }) {
  return<>
    <div className="comp2">
      <h1>Each state cases</h1>
      <div className="comp2-data">
        <div className="state">
          <h3>State: {eachState.state}</h3>
          <p>Cases: {eachState.cases}</p>
        </div>
      </div>
    </div>
  </>;
}

export default Comp2;
