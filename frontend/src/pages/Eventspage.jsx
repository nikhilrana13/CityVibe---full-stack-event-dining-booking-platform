import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import HeroSlider from '../components/pages/EventPage/HeroSlider'
import axios from 'axios'
import { useLocationContext } from '../context/useLocationContext'
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer'
import HeroFallback from '../components/pages/EventPage/HeroSliderFallback'
import CategoriesSection from '@/components/pages/EventPage/CategoriesSection'
import AllEventsSection from '@/components/pages/EventPage/AllEventsSection'

const Eventspage = () => {
  const [loading, setloading] = useState(true)
  const [allevents,setAllEvents] = useState([])
  const [loadEvents,setLoadEvents] = useState(true)
  const [page,setPage] = useState(1)
  const [pagination,setPagination] = useState({})
  const [trending, setTrending] = useState([])
  const [indiaTopEvents, setIndiaTopEvents] = useState([])
  const { location } = useLocationContext()
  // console.log("select city",location)
  // fetch trending events
  useEffect(() => {
     if (!location?.city) return
    const fetchHomeData = async () => {
      try {
        setloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/home`, {
          params: {
            city: location?.city
          }
        })
        // console.log('response',response.data)
        if (response.data) {
          setTrending(response?.data?.data?.trending)
          setIndiaTopEvents(response?.data?.data?.indiasTopEvents)
        }
      } catch (error) {
        console.error("failed to fetch home data", error)
      } finally {
       setloading(false)
      }
    }
    fetchHomeData()
  }, [location?.city])
  // fetch all events 
  useEffect(()=>{
     if (!location?.city) return
      const fetchAllevents = async()=>{
        try {
          setLoadEvents(true)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/search`,{
              params:{
                page:page,
                city:location?.city
              }
            })
            if(response.data){
              setAllEvents(response?.data?.data.events)
              setPagination(response?.data?.data?.pagination)
            }
        } catch (error) {
          console.error("failed to fetch all events",error)
        }finally{
          setLoadEvents(false)
        }
      }
      fetchAllevents()
  },[location?.city,page])
  // redirect to page 1 on city change
  useEffect(() => {
  if (location?.city) {
    setPage(1)
  }
}, [location?.city])
  // scroll to top on city change
  useEffect(() => {
    if (location?.city) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }, [location?.city])
  const heroEvents = [...(trending || []),...(indiaTopEvents|| [])].slice(0,6)
  // console.log("hero events",heroEvents)
  return (
    <div className='w-full'>
      <Navbar />
      {/* hero section slider */}
      <section className='bg-gradient-to-b from-[#F9F4DC] via-[#FDFBF2] to-white w-full'>
        {
          loading ? (
            <HeroSliderShimmer />
          ):heroEvents.length > 0 ? (
            <HeroSlider events={heroEvents} />
          ):(
            <HeroFallback />
          )
        }
      </section>
      {/* categories */}
      <section className='w-full py-10'>
          <CategoriesSection />
      </section>
      {/* all events */}
       <section className='w-full py-10'>
      
      </section>
      
    </div>
  )
}

export default Eventspage