import { createContext, useContext, useEffect, useState } from "react";
import { useLocationContext } from "./useLocationContext";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";




export const SearchContext = createContext()


export const SearchProvider = ({children})=>{
  const { location } = useLocationContext()
  const [query, setQuery] = useState("")
  const [type, setType] = useState("all")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounceValue = useDebounce(query,500)

   useEffect(() => {
       // if user type fast cancel previous request
    const controller = new AbortController()
    const fetchSearch = async () => {
        if (!location?.city) return
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search`, {
          params: {
            city: location?.city,
            type,
            query: debounceValue || ""
          },
         signal: controller.signal
        })
        // console.log("response",response.data)
        if(response.data){
         setResults(response?.data?.data)
        }
      } catch (error) {
        if(error.name !== "AbortError"){
         console.log("Search error", error)
        }
      } finally {
        setLoading(false)
      }
    }
     fetchSearch()
     return () => controller.abort()
  }, [debounceValue, type, location?.city])
    return (
        <SearchContext.Provider value={{results,loading,type,query,setType,setQuery}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext)