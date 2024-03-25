import { createContext, useState } from "react";

export const FilterContext = createContext(null);

export function FiltersProvider({children}){
   const [filters, setFilters] = useState({
        category: 'all',
        minprice: 0
    });

   return (
    <FilterContext.Provider value={{ filters, setFilters }}>
        {children}
    </FilterContext.Provider>
   )
}