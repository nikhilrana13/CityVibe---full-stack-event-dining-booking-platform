import { createContext, useContext, useEffect, useState } from "react";
import { useLocationContext } from "./useLocationContext";
import useDebounce from "../hooks/useDebounce";
import { useLocation } from "react-router-dom";
import { useGetSearchResultsQuery } from "@/redux/api/SearchResultApi";




export const SearchContext = createContext()


export const SearchProvider = ({children})=>{
  const { location } = useLocationContext()
  const routerLocation = useLocation()
  const [query, setQuery] = useState("")
  const [type, setType] = useState("all")
  const debounceValue = useDebounce(query,500)
  const city = location?.city?.trim()
  const searchQuery = useGetSearchResultsQuery({
    city:city,
    type,
    query:debounceValue
  },{
    skip:!location?.city
  })
  const results = searchQuery?.data?.data || []
  const loading =  searchQuery.isLoading || searchQuery.isFetching


  useEffect(() => {
  const path = routerLocation.pathname
  if (path.startsWith("/events")) {
    setType("event")
  } else if (path.startsWith("/dining")) {
    setType("dining")
  } else {
    setType("all")
  }
 }, [routerLocation.pathname])
    return (
        <SearchContext.Provider value={{results,loading,type,query,setType,setQuery}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext)