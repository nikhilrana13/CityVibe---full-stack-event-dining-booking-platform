import React, { useEffect, useState } from 'react'

const useDebounce = (value,delay) => {
    const [debouncevalue,setdebounceValue] = useState(value)

    useEffect(()=>{
      const handler = setTimeout(() => {
        setdebounceValue(value)
      }, delay);
      //clear timeout
      return (()=> clearTimeout(handler))
    },[value,delay])
      
  return debouncevalue
}

export default useDebounce