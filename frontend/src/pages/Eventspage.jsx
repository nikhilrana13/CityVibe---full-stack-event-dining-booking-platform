import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/common/Navbar'
import HeroSlider from '../components/pages/EventPage/HeroSlider'
import axios from 'axios'
import { useLocationContext } from '../context/useLocationContext'
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer'
import CategoriesSection from '../components/pages/EventPage/CategoriesSection'
import MainAllEventsSections from '../components/pages/EventPage/MainAllEventsSections'
import EventEmptyState from '../components/pages/EventPage/EventEmptyState'
import { Helmet } from 'react-helmet-async'
import { useGetHomePageDataQuery } from '@/redux/api/HomeApi'
import { useGetEventsQuery } from '@/redux/api/EventApi'

const Eventspage = () => {
  const [allevents, setAllEvents] = useState([])
  const loaderRef = useRef(null)
  const { location } = useLocationContext()
  const [sortBy, setSortBy] = useState("")
  const [startDate, setStartDate] = useState("")
  const homeQuery = useGetHomePageDataQuery(location?.city,{
     skip:!location?.city
  })
  const indiaTopEvents  = homeQuery?.data?.data?.indiasTopEvents || []
  const trending = homeQuery?.data?.data?.trending || []
  const [page, setPage] = useState(1)
  const eventsQuery = useGetEventsQuery({
    page:page,
    city: location?.city,
    sortby: sortBy,
    startDate: startDate
},{
  skip:!location?.city,
  refetchOnMountOrArgChange: false
})
// Used to prevent filter reset effect from running on initial mount
const hasMounted = useRef(false);
const events = eventsQuery?.data?.data?.events || [];
const pagination = eventsQuery?.data?.data?.pagination;
const initialLoading = eventsQuery.isLoading && page === 1; // Controls full-page shimmer on first load
const isFetchingMore = eventsQuery.isFetching && page > 1; // Controls bottom loader for infinite scroll
 const isBaseEmpty = eventsQuery.isSuccess && events.length === 0 && pagination?.totalEvents === 0; // Detects if city has absolutely no events (no filters applied)
 
// Append paginated events to local state
useEffect(() => {
  if (!events.length) return;
  setAllEvents(prev => {
    // First page replaces existing events
  if (page === 1) return events;
  const merged = [...prev, ...events];
   // Prevent duplicate events during pagination/refetches
  return merged.filter(
    (event, index, self) =>
      index === self.findIndex(
        e => e._id === event._id
      )
  );
});
}, [events, page]);
// Reset pagination when filters or city change
// Skip initial mount to avoid clearing first API response
useEffect(() => {
  if (!hasMounted.current) {
    hasMounted.current = true;
    return;
  }
  setPage(1);
}, [location?.city, sortBy, startDate]);

    // Infinite Scroll Observer Loads next page when bottom loader comes into viewport
  useEffect(() => {
    const hasNextPage = pagination?.currentPage < pagination?.totalPages;
    // console.log("hasNextPage", hasNextPage);
    if (!hasNextPage || isFetchingMore) return
    const observer = new IntersectionObserver(
      entries => {
        //  console.log("Intersecting", entries[0].isIntersecting);
        if (entries[0].isIntersecting && !isFetchingMore) {
            // console.log("Loading next page...")
          setPage(prev => prev + 1)
        }
      },
      { rootMargin: "150px" } // smoother trigger before reaching exact bottom
    )
    const current = loaderRef.current
  //  console.log("loaderRef", current);
    if (current) observer.observe(current)
    return () => {
      observer.disconnect()
    }
  }, [pagination?.currentPage,pagination?.totalPages,isFetchingMore,allevents.length ])
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
    <>
      <Helmet>
        <title>
          {location?.city
            ? `Events in ${location.city} | Concerts, Parties & Experiences | CityVibe`
            : "Discover Events Near You | CityVibe"}
        </title>
        <meta
          name="description"
          content={
            location?.city
              ? `Discover the best events happening in ${location.city}. Book tickets for concerts, parties, live music, workshops and unique experiences with CityVibe.`
              : "Discover concerts, parties, live shows and experiences happening around you with CityVibe."
          }
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content={
            location?.city
              ? `Events in ${location.city} | CityVibe`
              : "Discover Events Near You | CityVibe"
          }
        />
        <meta
          property="og:description"
          content="Find and book tickets for concerts, parties, live shows and unique experiences happening around you."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://yourdomain.com/events/${location?.city || ""}`}
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            location?.city
              ? `Events in ${location.city} | CityVibe`
              : "Discover Events Near You | CityVibe"
          }
        />
        <meta
          name="twitter:description"
          content="Explore concerts, parties, live shows and experiences happening near you."
        />
      </Helmet>
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
              <section className='bg-gradient-to-b  from-[#F9F4DC] via-[#FDFBF2] to-white w-full' >
                {heroEvents?.length > 0 && (
                  <HeroSlider events={heroEvents} />
                )}
              </section>
              {/* category */}
              <section className='w-full  py-8'>
                <CategoriesSection />
              </section>
              {/* all events section */}
              <section className='w-full py-8'>
                <MainAllEventsSections sortBy={sortBy} setSortBy={setSortBy} isFetchingMore={isFetchingMore} pagination={pagination} allevents={allevents} loaderRef={loaderRef} startDate={startDate} setStartDate={setStartDate} />
              </section>
            </>
          )
        }
      </div>
    </>

  )
}

export default Eventspage