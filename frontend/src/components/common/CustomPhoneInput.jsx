import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { countries } from "../data/Countries";
import * as Flags from "country-flag-icons/react/3x2";

const CustomPhoneInput = ({value,onChange,onCountryChange}) => {
   const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const Flag = Flags[selectedCountry.code];

    const handleCountryChange = (country)=>{
      setSelectedCountry(country)
      onCountryChange?.(country)
    }


  return (
    <div className="w-full max-w-[380px] mx-auto m-3">
      <div className="flex border border-gray-300 rounded-xl relative focus-within:ring-2 focus-within:ring-purple-500">
        {/* Country Selector */}
        <Listbox value={selectedCountry} onChange={handleCountryChange}>
          <div className="relative">
            <Listbox.Button className="flex items-center border-r gap-2 px-3 h-[52px] ">
              <Flag className="w-5 h-4" />
              <span className="text-sm">{selectedCountry.dialCode}</span>
            </Listbox.Button>

            <Listbox.Options className="fixed z-[99999] mt-2 max-h-60 w-[300px] bg-white overflow-auto rounded-xl  shadow-xl border border-gray-200  scrollbar-hide">
              {countries.map((country) => {
                const CountryFlag = Flags[country.code];
                return (
                  <Listbox.Option
                    key={country.code}
                    value={country}
                    className="cursor-pointer px-4 py-2 hover:bg-purple-50 flex items-center gap-3"
                  >
                    <CountryFlag className="w-5 h-4" />
                    <span className="text-sm">{country.name}</span>
                    <span className="ml-auto text-gray-500 text-sm">
                      {country.dialCode}
                    </span>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </div>
        </Listbox>
         {/* Phone Number Input  */}
        <input
          type="tel"
          placeholder="Enter mobile number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 h-[52px] outline-none text-sm rounded-r-xl"
        /> 
      </div>
    </div>
   
  )
}

export default CustomPhoneInput