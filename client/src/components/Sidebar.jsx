import { useEffect, useState } from "react";

function Sidebar({ setStates, setEachState, setStateName }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://disease.sh/v3/covid-19/states");
      const data = await response.json();
      const excludedStates = ['Diamond Princess Ship','Wuhan Repatriated', 'Grand Princess Ship', 'Federal Prisons', 'Navajo Nation', 'US Military', 'Veteran Affairs', 'American Samoa', 'Northern Mariana Islands', 'United States Virgin Islands', 'District Of Columbia', 'Puerto Rico', 'Guam'];

      // Filter out the excluded states
      const filteredData = data.filter((item) => !excludedStates.includes(item.state));
      setStates(filteredData);
    }
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (query === "") {
      alert("Please enter a search query");
      return;
    } else {
      setStateName(query);
      const response = await fetch(
        `https://disease.sh/v3/covid-19/states/${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setEachState(data);
      //console.log(data);
      setQuery("");
    }
  };
  return (
    <div className='h-screen w-[300px] bg-neutral-600 flex items-center justify-evenly'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <p onClick={handleSearch} className='text-red-800 cursor-pointer font-bold'>
        Search
      </p>
    </div>
  );
}

export default Sidebar;
