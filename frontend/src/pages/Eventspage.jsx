import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/common/Navbar'
import HeroSlider from '../components/pages/EventPage/HeroSlider'
import axios from 'axios'
import { useLocationContext } from '../context/useLocationContext'
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer'
import CategoriesSection from '../components/pages/EventPage/CategoriesSection'
import MainAllEventsSections from '../components/pages/EventPage/MainAllEventsSections'
import EventEmptyState from '../components/pages/EventPage/EventEmptyState'

const Eventspage = () => {
  const [allevents, setAllEvents] = useState([])
  const [initialLoading, setInitialLoading] = useState(true)  // Controls full-page shimmer on first load
  const [isFetchingMore, setIsFetchingMore] = useState(false) // Controls bottom loader for infinite scroll
  const loaderRef = useRef(null)
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [trending, setTrending] = useState([])
  const [indiaTopEvents, setIndiaTopEvents] = useState([])
  const { location } = useLocationContext()
  const [sortBy,setSortBy] = useState("")
  const [startDate,setStartDate] = useState("")
  const [isBaseEmpty,setIsBaseEmpty] = useState(false) // Detects if city has absolutely no events (no filters applied)
  // fetch trending and india top events
  useEffect(() => {
    if (!location?.city) return
    const fetchHomeData = async () => {
      try {
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
      }
    }
    fetchHomeData()
  }, [location?.city])
  // fetch all events (Pagination + Filters)
  useEffect(() => {
    if (!location?.city) return
    const fetchAllevents = async () => {
      try {
        // Show full shimmer only for first page
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
            sortby:sortBy,
            startDate:startDate
          }
        })
        await delay(1200) // for fake delay testing
        if (response.data) {
          const newEvents = response?.data?.data?.events || []
          const newPagination = response?.data?.data?.pagination || {}
          // detect base empty (no filters applied)
          if(!sortBy && !startDate && page === 1){
            setIsBaseEmpty(newEvents.length === 0)
          }
           // Replace on first page, append on next pages
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
  }, [location?.city, page,sortBy,startDate])
  // Reset Pagination When city or filters change,start again from page 1
  useEffect(() => {
    setAllEvents([])
    setPage(1)
  }, [location?.city,sortBy,startDate])
  // Infinite Scroll Observer Loads next page when bottom loader comes into viewport
  useEffect(() => {
    const hasNextPage = pagination?.currentPage && pagination?.totalPages && pagination.currentPage < pagination.totalPages
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
  //  Scroll to Top on City Change
  useEffect(() => {
    if (location?.city) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }, [location?.city])
  // combine hero events
  const heroEvents = [...(trending || []), ...(indiaTopEvents || [])].slice(0, 6)
  // console.log("hero events",heroEvents)
  return (
    <div className='w-full'>
      <Navbar />
      {
        initialLoading ? (
          <HeroSliderShimmer /> //  Show shimmer while first page loading
        ) : isBaseEmpty ? ( //  Show full empty state only if city has no events
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
              <MainAllEventsSections sortBy={sortBy} setSortBy={setSortBy} isFetchingMore={isFetchingMore} pagination={pagination} allevents={allevents} loaderRef={loaderRef} startDate={startDate} setStartDate={setStartDate} />
            </section>
          </>
        )
      }

    </div>
  )
}

export default Eventspage