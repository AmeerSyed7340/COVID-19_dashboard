import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext();   // Create a context

export const SearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState('');

    const updateCountry = (countryName) => {
        setSearch(countryName);
    };

    return (
        <SearchContext.Provider value={{ search, setSearch, updateCountry }}>
            {children}
        </SearchContext.Provider>
    );
}