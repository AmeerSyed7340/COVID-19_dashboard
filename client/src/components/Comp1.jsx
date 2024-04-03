import '../styles/Comp1.css';
function Comp1({states}) {
  return <>
    <div className="comp1">
      <h1>Comp1</h1>
      <div className="comp1-data">
        {states.map((state, index) => {
          return <div key={index} className="state">
            <h3>{state.state}</h3>
            <p>{state.cases}</p>
            <p>{state.deaths}</p>
            <p>{state.recovered}</p>
          </div>;
        })}
      </div>
    </div>
  </>;
}

export default Comp1;
