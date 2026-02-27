import { createContext, useContext, useEffect, useState } from "react";



const LocationContext = createContext()
// Get Browser Coordinates
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Geolocation not supported")
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        })
      },
      (err) => reject(err)
    )
  })
}
//  Helper Reverse Geocode
const getCityFromCoords = async (lat, lon) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
  )

  const data = await res.json()
  const addr = data?.address || {}

  return {
    city: addr.city || addr.town || addr.state_district || "Unknown",
    state: addr.state || addr.country || "Unknown"
  }
}
export const LocationProvider = ({children}) => {
    const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem("selectedCity")
    return saved ? JSON.parse(saved) : {city:"Delhi",state:"Delhi"}
  })
   // saved to local storage   
  useEffect(() => {
    localStorage.setItem("selectedCity", JSON.stringify(location))
  }, [location])
   //  Manual current location handler
  const handleUseCurrentLocation = async () => {
    try {
      const { lat, lon } = await getUserLocation()
      const detected = await getCityFromCoords(lat, lon)

      setLocation(detected)
    } catch (error) {
      console.log("Location fetch failed:", error)
    }
  }
  return (
    <LocationContext.Provider value={{location,setLocation,handleUseCurrentLocation}}>
        {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => useContext(LocationContext)
