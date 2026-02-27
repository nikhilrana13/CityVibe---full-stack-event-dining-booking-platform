import { useLocationContext } from '../../context/useLocationContext';
import React from 'react';

const popularCities = [
  { name: "Ahmedabad",state:"Gujarat",img: "/citiespng/ahmedabad.png" },
  { name: "Bengaluru",state:"Karnataka",img: "/citiespng/bengaluru.png" },
  { name: "Chandigarh",state:"Chandigarh",img: "/citiespng/chandigarh.png" },
  { name: "Chennai",state:"Tamil Nadu",img: "/citiespng/chennai.png" },
  { name: "Delhi",state:"Delhi",img: "/citiespng/delhi.png" },
  { name: "Goa",state:"Goa",img: "/citiespng/goa.png" },
  { name: "Hyderabad",state:"Telangana",img: "/citiespng/hyderabad.png" },
  { name: "Kolkata",state:"West Bengal",img: "/citiespng/kolkata.png" },
  { name: "Mumbai",state:"Maharashtra",img: "/citiespng/mumbai.png" },
  { name: "Pune",state:"Maharashtra",img: "/citiespng/pune.png" },
  {name:"Mohali",state:"Punjab",img: "/citiespng/amritsar.png"},
  { name: "Amritsar",state:"Punjab",img: "/citiespng/amritsar.png" },
  
]
const PopularCitiesGrid = ({onClose}) => {
    const {setLocation} = useLocationContext()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {popularCities.map((city) => (
        <button
          key={city.name}
          onClick={()=>{setLocation({city:city.name,state:city.state}),onClose()}}
          className="bg-[#F5F3FF] border rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
        >
          <img
            src={city.img}
            alt={city.name}
            className="w-16 h-14 object-contain mb-4"
          />
          <span className="text-sm font-medium text-gray-800">
            {city.name}
          </span>
        </button>
      ))}
    </div>
  );
}

export default PopularCitiesGrid;
