import React , {useState} from "react";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
    const[inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleClick = () => {
        console.log(inputValue);
        setInputValue('');
    }
  return (
    <div className="flex space-x-8">
      <div>
        <p>COVID Dashboard</p>
      </div>

      <div className="flex shadow-md rounded-[300px]">
        <input
          type="text"
          placeholder="Search for a country..."
          className="rounded-l-[300px] px-2 h-[25px]"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className='flex justify-center items-center'>
          <CiSearch className="w-[30px]" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
