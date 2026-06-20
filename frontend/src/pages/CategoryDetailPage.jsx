import axios from 'axios';
import { useLocationContext } from '../context/useLocationContext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer';
import HeroSlider from '../components/pages/EventPage/HeroSlider';
import AllEventsSection from '../components/pages/EventPage/AllEventsSection';
import EventEmptyState from '../components/pages/EventPage/EventEmptyState';
import { useGetEventsQuery } from '@/redux/api/EventApi';


const CategoryDetailPage = () => {
    const { category } = useParams()
    const { location } = useLocationContext()
    const [allevents, setAllEvents] = useState([])
    const [page, setPage] = useState(1)
    const eventsQuery = useGetEventsQuery({
        page: page,
        city: location?.city,
        category: category
    }, {
        skip: !location?.city,
        refetchOnMountOrArgChange: false
    })
    const events = eventsQuery?.data?.data?.events || [];
    const pagination = eventsQuery?.data?.data?.pagination;
    const initialLoading = eventsQuery.isLoading && page === 1;
    const isFetchingMore = eventsQuery.isFetching && page > 1;
    const navigate = useNavigate()
    const loaderRef = useRef(null)
    const hasMounted = useRef(false)
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
    // Reset pagination when category or city change
    // Skip initial mount to avoid clearing first API response
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        setPage(1);
    }, [location?.city, category]);

    // scroll to top on city change
    useEffect(() => {
        if (location?.city) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
    }, [location?.city, category])

    // infinite scroll observer block
    useEffect(() => {
        const hasNextPage = pagination?.currentPage < pagination?.totalPages
        if (!pagination || !hasNextPage || isFetchingMore) return;
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isFetchingMore) {
                    //   console.log("Loading next page...")
                    setPage(prev => prev + 1)
                }
            },
            { rootMargin: "150px" } // smoother trigger before reaching exact bottom
        )
        const current = loaderRef.current
        if (current) observer.observe(current)
        return () => {
            observer.disconnect()
        }
    }, [pagination?.currentPage, pagination?.totalPages, allevents.length, isFetchingMore])

    const isEmpty = eventsQuery.isSuccess && !eventsQuery.isFetching && events.length === 0
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
                            initialLoading={initialLoading}
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
