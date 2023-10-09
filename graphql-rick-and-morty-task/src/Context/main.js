import { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
	const [page, setPage] = useState(1);
	const [gender, setGender] = useState("");
	const [species, setSpecies] = useState("");
	const [location, setLocation] = useState("");
	const [filtered, setFiltered] = useState(true);
	const [name, setName] = useState("");

    const values = { page, setPage, gender, setGender, species, setSpecies, location, setLocation, filtered, setFiltered, name, setName };

	return <FilterContext.Provider value={values}>{children}</FilterContext.Provider>;
};

export const useFilter = () => useContext(FilterContext);
