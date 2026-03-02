import axios from 'axios';
import { useLocationContext } from '../context/useLocationContext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer';
import HeroSlider from '../components/pages/EventPage/HeroSlider';
import AllEventsSection from '../components/pages/EventPage/AllEventsSection';
import EventEmptyState from '../components/pages/EventPage/EventEmptyState';



const CategoryDetailPage = () => {
    const { category } = useParams()
    const { location } = useLocationContext()
    const [allevents, setAllEvents] = useState([])
    const [initialLoading, setInitialLoading] = useState(true)
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})
    const navigate = useNavigate()
    const loaderRef = useRef(null)

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
                        category: category,
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
    }, [location?.city, page, category])
    // scroll to top on city change
    useEffect(() => {
        if (location?.city) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }, [location?.city, category])
    //  redirect to page 1
    useEffect(() => {
        setAllEvents([])
        setPage(1)
    }, [category, location?.city])
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
    }, [pagination?.currentPage, pagination?.totalPages,isFetchingMore])
    const isEmpty = !initialLoading && Array.isArray(allevents) && allevents.length === 0
    const heroEvents = allevents?.slice(0, 6)
    const formattedCategory = CATEGORY_LABELS[category] || category
    return (
        <div className='w-full'>
            <Navbar />
            {initialLoading ? (
                <HeroSliderShimmer />
            ) : isEmpty ? (
                <EventEmptyState
                    title={`No ${formattedCategory} events in ${location?.city}`}
                    description={"We couldn’t find any upcoming events in this category right now. Try changing your city or explore other experiences."}
                    primaryLabel={"Explore All Events"}
                    onPrimaryCheck={() => navigate("/events")}
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
                            // loadEvents={loadEvents}
                            isFetchingMore={isFetchingMore}
                            pagination={pagination}
                            location={location}
                            allevents={allevents}
                            loaderRef={loaderRef}
                            category={formattedCategory}
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
