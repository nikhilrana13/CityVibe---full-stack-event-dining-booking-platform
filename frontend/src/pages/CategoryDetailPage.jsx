import axios from 'axios';
import { useLocationContext } from '../context/useLocationContext';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer';
import HeroSlider from '../components/pages/EventPage/HeroSlider';
import AllEventsSection from '../components/pages/EventPage/AllEventsSection';
import EventEmptyState from '../components/pages/EventPage/EventEmptyState';

const CategoryDetailPage = () => {
    const {category} = useParams()
    const {location} = useLocationContext()
    const [allevents,setAllEvents] = useState([])
    const [loadEvents,setLoadEvents] = useState(true)
    const [page,setPage] = useState(1)
    const [pagination,setPagination] = useState({})
    const navigate = useNavigate()

     useEffect(()=>{
     if (!location?.city) return
      const fetchAllevents = async()=>{
        try {
          setLoadEvents(true)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/search`,{
              params:{
                page:page,
                city:location?.city,
                category:category,
              }
            })
            if(response.data){
              setAllEvents(response?.data?.data.events || [])
              setPagination(response?.data?.data?.pagination)
            }
        } catch (error) {
          console.error("failed to fetch all events",error)
        }finally{
          setLoadEvents(false)
        }
      }
      fetchAllevents()
  },[location?.city,page,category])
  // scroll to top on city change
  useEffect(() => {
  if (location?.city) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}, [location?.city,category])
// redirect to page 1 on city change
  useEffect(() => {
  if (location?.city) {
    setPage(1)
  }
}, [location?.city])
const isEmpty = !loadEvents && Array.isArray(allevents) && allevents.length === 0
const heroEvents = allevents?.slice(0, 6)
const formattedCategory = CATEGORY_LABELS[category] || category
  return (
    <div className='w-full'>
     <Navbar />
    {loadEvents ? (
      <HeroSliderShimmer />
    ) : isEmpty ? (
      <EventEmptyState 
      title={`No ${formattedCategory} events in ${location?.city}`} 
      description={"We couldn’t find any upcoming events in this category right now. Try changing your city or explore other experiences."}
      primaryLabel={"Explore All Events"}
      onPrimaryCheck={()=>navigate("/events")}
      /> 
    ) : (
      <>
        {/* hero slider */}
        <section className='bg-gradient-to-b from-[#F9F4DC] via-[#FDFBF2] to-white w-full'>
          {heroEvents?.length > 0 && (
            <HeroSlider events={heroEvents} />
          )}
        </section>
        {/* all events */}
        <section className='w-full py-10'>
          <AllEventsSection
            loadEvents={loadEvents}
            pagination={pagination}
            location={location}
            allevents={allevents}
          />
        </section>
      </>
    )}
    </div>
  );
}

export default CategoryDetailPage;



export const CATEGORY_LABELS = {
  music: "Music",
  comedy: "Comedy",
  sports: "Sports",
  performances: "Performances",
  fooddrink: "Food & Drink",
  socialmixers: "Social Mixers",
  pets: "Pets",
  openmics: "Open Mics",
  nightlife: "Nightlife",
  celebrations: "Celebrations"
}
