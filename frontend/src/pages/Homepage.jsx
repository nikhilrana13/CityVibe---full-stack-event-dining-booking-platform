import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/common/Navbar'
import TrendingSection from '../components/pages/Homepage/TrendingSection'
import MusicSection from '../components/pages/Homepage/MusicSection'
import ThisWeekEvent from '../components/pages/Homepage/ThisWeekEvent'
import IndiaTopEventSection from '../components/pages/Homepage/IndiaTopEventSection'
import Footer from '../components/pages/listyourevent/Footer'
import ComedySection from '../components/pages/Homepage/ComedySection'
import { useLocationContext } from '../context/useLocationContext'
import { useGetHomePageDataQuery } from '@/redux/api/HomeApi'
import HomeOfferSection from '@/components/offers/HomeOfferSection'


const Homepage = () => {
  const {location} = useLocationContext()
  const homeQuery = useGetHomePageDataQuery(location?.city,{
    skip:!location?.city
  })
  const loading = homeQuery?.isLoading
  const trending = homeQuery?.data?.data?.trending || []
  const music = homeQuery?.data?.data?.music || []
  const thisweek = homeQuery?.data?.data?.thisweek || []
  const comedy = homeQuery?.data?.data?.comedy || []
  const indiatop = homeQuery?.data?.data?.indiasTopEvents || []
  
  // scroll to top on city change
  useEffect(() => {
  if (location?.city) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}, [location?.city])

  return (
    <div className='w-full'>
      <Navbar />
      <section className='w-full  bg-[linear-gradient(to_bottom,#EFEBFF_0%,#FFFFFF_60%)] 
       pb-10 md:py-10 space-y-16'>
        {/* offer section */}
        <HomeOfferSection />
        {/* trending section according to city name */}
        <TrendingSection trending={trending} loading={loading} city={location?.city} />
        {/* Music event in Your city */}
        <MusicSection music={music} loading={loading} />
        {/* this week event */}
        <ThisWeekEvent thisweek={thisweek} loading={loading} />
        {/* comedy */}
        <ComedySection comedy={comedy} loading={loading} />
        {/* india top events */}
        <IndiaTopEventSection indiatop={indiatop} loading={loading} />
      </section>
      <Footer />
    </div>
  )
}

export default Homepage