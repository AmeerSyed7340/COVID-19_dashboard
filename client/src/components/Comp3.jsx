import "../styles/Comp3.css";

function Comp3({ eachState }) {
  return<>
    <div className="comp3">
      <h1>Comp3</h1>
      <div className="comp3-data">
        <div className="state">
          <h3>State: {eachState.state}</h3>
          <p>Cases: {eachState.cases}</p>
        </div>
      </div>
    </div>
  </>;
}

export default Comp3;
