import React, { useEffect, useState } from 'react'
import Navbar from '../components/common/Navbar'
import HeroSlider from '../components/pages/EventPage/HeroSlider'
import axios from 'axios'
import { useLocationContext } from '../context/useLocationContext'

const Eventspage = () => {
  const [loading, setloading] = useState(false)
  const [trending, setTrending] = useState([])
  const [indiaTopEvents, setIndiaTopEvents] = useState([])
  const { location } = useLocationContext()
  // console.log("select city",location)
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/home`, {
          params: {
            city: location?.city
          }, headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
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
      <section className='bg-gradient-to-b from-[#F9F4DC] via-[#FDFBF2] to-white'>
        <HeroSlider events={heroEvents} />
      </section>
      {/* categories */}
      {/* <section>
          categories
        </section> */}
    </div>
  )
}

export default Eventspage