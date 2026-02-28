import React, { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

const useLocationSearch = () => {
    const [value, SetValue] = useState("")
    const [suggestions, SetSuggestions] = useState([])
    const [Loading, SetLoading] = useState(false)
    const [open, SetOpen] = useState(false)
    const [hasSearched, SetHasSearched] = useState(false)

    const debounceValue = useDebounce(value, 500)
    useEffect(() => {
        if (!debounceValue || debounceValue.length < 3) {
            SetSuggestions([])
            SetOpen(false)
            SetHasSearched(false)
            return
        }
        // if user type fast cancel previous request
        const controller = new AbortController()
        const fetchLocationSuggestions = async () => {
            try {
                SetLoading(true);
                SetHasSearched(true)
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${debounceValue}&format=json&addressdetails=1&limit=6&countrycodes=in`,
                    {
                        headers: {
                            "Accept": "application/json",
                        },
                        signal: controller.signal

                    }
                );
                const data = await response.json();
                const filtered = data
                    .filter(item =>
                        item.address?.city ||
                        item.address?.town ||
                        item.address?.state_district
                    ).map(item => {
                        const cityName =
                            item.address.city ||
                            item.address.town ||
                            item.address.state_district
                       const stateName =
                            item.address.state ||
                            cityName   // fallback
                            return {
                            city: cityName,
                            state: stateName,
                            display: `${cityName}, ${stateName}`
                        }
                    }).filter(
                        (item, index, self) =>
                            index ===
                            self.findIndex(
                                t => t.city === item.city && t.state === item.state
                            )
                    ); // remove duplicates
                // console.log("data", data)
                SetSuggestions(filtered);
                SetOpen(filtered.length > 0);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.log("failed to get suggestions", error)
                }
            } finally {
                SetLoading(false)
            }
        }
        fetchLocationSuggestions()
        return () => controller.abort()
    }, [debounceValue])

    return { value, SetValue, suggestions, Loading, open, SetOpen, hasSearched }
}

export default useLocationSearch;
