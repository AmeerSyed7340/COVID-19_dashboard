import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext();   // Create a context

export const SearchProvider = () => useContext(SearchContext);   // Create a provider

export const SearchContextProvider = ({ children }) => {
    const [search, setSearch] = useState('');

    const updateCountry = (countryName) => {
        setSearch(countryName);
    };

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}