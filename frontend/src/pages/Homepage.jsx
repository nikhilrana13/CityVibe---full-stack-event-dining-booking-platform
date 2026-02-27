import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/common/Navbar'
import axios from 'axios'
import TrendingSection from '../components/pages/Homepage/TrendingSection'
import MusicSection from '../components/pages/Homepage/MusicSection'
import ThisWeekEvent from '../components/pages/Homepage/ThisWeekEvent'
import IndiaTopEventSection from '../components/pages/Homepage/IndiaTopEventSection'
import Footer from '../components/pages/listyourevent/Footer'

const Homepage = () => {
  const [loading, setloading] = useState(false)
  const [trending, setTrending] = useState([])
  const [music, setMusic] = useState([])
  const [thisweek, setThisweek] = useState([])
  const [comedy, setComedy] = useState([])
  const [indiaTopEvents, setIndiaTopEvents] = useState([])

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setloading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/home`, {
          params: {
            city: "delhi"
          }, headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        if (response.data) {
          setTrending(response?.data?.data?.trending)
          setMusic(response?.data?.data.music)
          setThisweek(response?.data?.data?.thisWeek)
          setComedy(response?.data?.data?.comedy)
          setIndiaTopEvents(response?.data?.data?.indiasTopEvents)
        }
      } catch (error) {
        console.error("failed to fetch home data", error)
      } finally {
       setloading(false)
      }
    }
    fetchHomeData()
  }, [])


  return (
    <div className='w-full'>
      <Navbar  />
      <section className='w-full  bg-[linear-gradient(to_bottom,#EFEBFF_0%,#FFFFFF_60%)] 
       pb-10 md:py-10 space-y-16'>
        {/* trending section according to city name */}
        <TrendingSection trending={trending} loading={loading} />
        {/* Music event in Your city */}
        <MusicSection music={music} loading={loading} />
        {/* this week event */}
        <ThisWeekEvent thisweek={thisweek} loading={loading} />
        {/* india top events */}
        <IndiaTopEventSection indiatop={indiaTopEvents} loading={loading} />
      </section>
      <Footer />
    </div>
  )
}

export default Homepage