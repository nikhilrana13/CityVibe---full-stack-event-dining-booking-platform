import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/common/Navbar'
import HeroSlider from '../components/pages/EventPage/HeroSlider'
import axios from 'axios'
import { useLocationContext } from '../context/useLocationContext'
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer'
import HeroFallback from '../components/pages/EventPage/HeroSliderFallback'
import CategoriesSection from '@/components/pages/EventPage/CategoriesSection'
import AllEventsSection from '@/components/pages/EventPage/AllEventsSection'
import MainAllEventsSections from '@/components/pages/EventPage/MainAllEventsSections'
import EventEmptyState from '@/components/pages/EventPage/EventEmptyState'

const Eventspage = () => {
  const [loading, setloading] = useState(true)
  const [allevents, setAllEvents] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const loaderRef = useRef(null)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
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
  useEffect(() => {
    if (!location?.city) return
    const fetchAllevents = async () => {
      try {
        if (page === 1) {
          setInitialLoading(true)
        } else {
          setIsFetchingMore(true)
        }
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/search`, {
          params: {
            page: page,
            city: location?.city,
          }
        })
        await delay(1200) // for fake delay testing
        if (response.data) {
          const newEvents = response?.data?.data?.events || []
          const newPagination = response?.data?.data?.pagination || {}
          setAllEvents(prev => page === 1 ? newEvents : [...prev, ...newEvents])
          setPagination(newPagination)
        }
      } catch (error) {
        console.error("failed to fetch all events", error)
      } finally {
        setInitialLoading(false)
        setIsFetchingMore(false)
      }
    }
    fetchAllevents()
  }, [location?.city, page])
  //  redirect to page 1
  useEffect(() => {
    setAllEvents([])
    setPage(1)
  }, [location?.city])
  // infinite scroll observer block
  useEffect(() => {
    const hasNextPage = pagination.currentPage < pagination?.totalPages
    if (!hasNextPage || isFetchingMore) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          //   console.log("Loading next page...")
          setPage(prev => prev + 1)
        }
      },
      { rootMargin: "100px" } // smoother trigger before reaching exact bottom
    )
    const current = loaderRef.current
    if (current) observer.observe(current)
    return () => {
      observer.disconnect()
    }
  }, [pagination?.currentPage, pagination?.totalPages, isFetchingMore])
  // scroll to top on city change
  useEffect(() => {
    if (location?.city) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }, [location?.city])
  const isEmpty = !initialLoading && Array.isArray(allevents) && allevents.length === 0
  const heroEvents = [...(trending || []), ...(indiaTopEvents || [])].slice(0, 6)
  // console.log("hero events",heroEvents)
  return (
    <div className='w-full'>
      <Navbar />
      {
        initialLoading ? (
          <HeroSliderShimmer />
        ) : isEmpty ? (
          <EventEmptyState
            title={`No events in ${location?.city}`}
            description={"We couldn’t find any upcoming events in your city right now. Try changing your city or explore other experiences."}
            primaryLabel={"Explore All Events"}
            onPrimaryCheck={() => navigate("/events")}
          />
        ) : (
          <>
            {/* hero slider */}
            <section className='bg-gradient-to-b from-[#F9F4DC] via-[#FDFBF2] to-white w-full' >
              {heroEvents?.length > 0 && (
                <HeroSlider events={heroEvents} />
              )}
            </section>
            {/* category */}
            <section className='w-full  py-8'>
              <CategoriesSection />
            </section>
            {/* all events section */}
            <section className='w-full  py-8'>
              <MainAllEventsSections isFetchingMore={isFetchingMore} pagination={pagination} allevents={allevents} loaderRef={loaderRef} />
            </section>
          </>
        )
      }

    </div>
  )
}

export default Eventspage