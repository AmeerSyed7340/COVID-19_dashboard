import '../styles/Sidebar.css'; 
import { useState } from 'react';

function Sidebar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log(query);
    setQuery('');
  };
  return (
    <div className="sidebar">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <p onClick={handleSearch} >Search</p>
    </div>
  );
}

export default Sidebar;