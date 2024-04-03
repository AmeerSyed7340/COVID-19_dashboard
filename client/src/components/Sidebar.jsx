import '../styles/Sidebar.css'; 
import { useEffect, useState } from 'react';

function Sidebar({setStates, setEachState, setStateName}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://disease.sh/v3/covid-19/states');
      const data = await response.json();      
      setStates(data);
    }
    fetchData();
  }, []);

  const handleSearch = async() => {
    if(query === '') {
      alert('Please enter a search query');
      return;
    }else{
      console.log(query);
      setStateName(query);
      const response = await fetch(`https://disease.sh/v3/covid-19/states/${encodeURIComponent(query)}`);
      const data = await response.json();
      setEachState(data);
      //console.log(data);
      setQuery('');
    }
    
  };
  return (
    <div className="sidebar">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <p onClick={handleSearch} className='search'>Search</p>
    </div>
  );
}

export default Sidebar;