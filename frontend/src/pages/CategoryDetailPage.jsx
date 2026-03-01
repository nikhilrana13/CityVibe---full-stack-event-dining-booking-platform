import axios from 'axios';
import { useLocationContext } from '../context/useLocationContext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import HeroSliderShimmer from '../components/pages/EventPage/HeroSliderShimmer';
import HeroSlider from '../components/pages/EventPage/HeroSlider';
import AllEventsSection from '../components/pages/EventPage/AllEventsSection';
import EventEmptyState from '../components/pages/EventPage/EventEmptyState';


// const testevents = [
//   {
//     "_id": "evt_001",
//     "title": "Delhi Indie Music Night",
//     "category": "music",
//     "city": "Delhi",
//     "venue": "The Piano Man Jazz Club",
//     "startDate": "2026-07-12T18:30:00Z",
//     "minPrice": 499,
//     "coverimage": "https://picsum.photos/400/600?random=1"
//   },
//   {
//     "_id": "evt_002",
//     "title": "Stand-Up Comedy Evening",
//     "category": "comedy",
//     "city": "Delhi",
//     "venue": "Comedy County",
//     "startDate": "2026-07-14T20:00:00Z",
//     "minPrice": 299,
//     "coverimage": "https://picsum.photos/400/600?random=2"
//   },
//   {
//     "_id": "evt_003",
//     "title": "Live Sufi Concert",
//     "category": "music",
//     "city": "Delhi",
//     "venue": "India Habitat Centre",
//     "startDate": "2026-07-20T19:00:00Z",
//     "minPrice": 799,
//     "coverimage": "https://picsum.photos/400/600?random=3"
//   },
//   {
//     "_id": "evt_004",
//     "title": "Sunday Yoga & Wellness Meetup",
//     "category": "socialmixers",
//     "city": "Delhi",
//     "venue": "Lodhi Garden",
//     "startDate": "2026-07-18T07:00:00Z",
//     "minPrice": 199,
//     "coverimage": "https://picsum.photos/400/600?random=4"
//   },
//   {
//     "_id": "evt_005",
//     "title": "Open Mic Poetry Night",
//     "category": "openmics",
//     "city": "Delhi",
//     "venue": "Cafe Soul Garden",
//     "startDate": "2026-07-22T18:00:00Z",
//     "minPrice": 149,
//     "coverimage": "https://picsum.photos/400/600?random=5"
//   },
//   {
//     "_id": "evt_006",
//     "title": "Bollywood DJ Night",
//     "category": "nightlife",
//     "city": "Delhi",
//     "venue": "Privee Club",
//     "startDate": "2026-07-16T22:00:00Z",
//     "minPrice": 999,
//     "coverimage": "https://picsum.photos/400/600?random=6"
//   },
//   {
//     "_id": "evt_007",
//     "title": "Startup Networking Mixer",
//     "category": "socialmixers",
//     "city": "Delhi",
//     "venue": "WeWork Connaught Place",
//     "startDate": "2026-07-19T17:30:00Z",
//     "minPrice": 399,
//     "coverimage": "https://picsum.photos/400/600?random=7"
//   },
//   {
//     "_id": "evt_008",
//     "title": "Street Food Festival",
//     "category": "fooddrink",
//     "city": "Delhi",
//     "venue": "Jawaharlal Nehru Stadium",
//     "startDate": "2026-07-25T12:00:00Z",
//     "minPrice": 99,
//     "coverimage": "https://picsum.photos/400/600?random=8"
//   },
//   {
//     "_id": "evt_009",
//     "title": "Pet Adoption Drive",
//     "category": "pets",
//     "city": "Delhi",
//     "venue": "Sunder Nursery",
//     "startDate": "2026-07-21T10:00:00Z",
//     "minPrice": 0,
//     "coverimage": "https://picsum.photos/400/600?random=9"
//   },
//   {
//     "_id": "evt_010",
//     "title": "Cricket Fan Meetup",
//     "category": "sports",
//     "city": "Delhi",
//     "venue": "Arun Jaitley Stadium",
//     "startDate": "2026-07-28T16:00:00Z",
//     "minPrice": 599,
//     "coverimage": "https://picsum.photos/400/600?random=10"
//   },
//   {
//     "_id": "evt_011",
//     "title": "Theatre Drama Performance",
//     "category": "performances",
//     "city": "Delhi",
//     "venue": "Kamani Auditorium",
//     "startDate": "2026-07-29T19:00:00Z",
//     "minPrice": 699,
//     "coverimage": "https://picsum.photos/400/600?random=11"
//   },
//   {
//     "_id": "evt_012",
//     "title": "Karaoke Night",
//     "category": "nightlife",
//     "city": "Delhi",
//     "venue": "Summer House Cafe",
//     "startDate": "2026-07-30T21:00:00Z",
//     "minPrice": 399,
//     "coverimage": "https://picsum.photos/400/600?random=12"
//   },
//   {
//     "_id": "evt_013",
//     "title": "Wine Tasting Experience",
//     "category": "fooddrink",
//     "city": "Delhi",
//     "venue": "The Leela Palace",
//     "startDate": "2026-08-02T18:00:00Z",
//     "minPrice": 1499,
//     "coverimage": "https://picsum.photos/400/600?random=13"
//   },
//   {
//     "_id": "evt_014",
//     "title": "Acoustic Evening",
//     "category": "music",
//     "city": "Delhi",
//     "venue": "Depot 48",
//     "startDate": "2026-08-05T19:30:00Z",
//     "minPrice": 549,
//     "coverimage": "https://picsum.photos/400/600?random=14"
//   },
//   {
//     "_id": "evt_015",
//     "title": "Dog Lovers Meetup",
//     "category": "pets",
//     "city": "Delhi",
//     "venue": "Nehru Park",
//     "startDate": "2026-08-07T09:00:00Z",
//     "minPrice": 0,
//     "coverimage": "https://picsum.photos/400/600?random=15"
//   },
//   {
//     "_id": "evt_016",
//     "title": "Laugh Riot Comedy Show",
//     "category": "comedy",
//     "city": "Delhi",
//     "venue": "The Laugh Store",
//     "startDate": "2026-08-10T20:30:00Z",
//     "minPrice": 399,
//     "coverimage": "https://picsum.photos/400/600?random=16"
//   },
//   {
//     "_id": "evt_017",
//     "title": "Classical Dance Night",
//     "category": "performances",
//     "city": "Delhi",
//     "venue": "Triveni Kala Sangam",
//     "startDate": "2026-08-12T18:00:00Z",
//     "minPrice": 499,
//     "coverimage": "https://picsum.photos/400/600?random=17"
//   },
//   {
//     "_id": "evt_018",
//     "title": "Startup Pitch Evening",
//     "category": "socialmixers",
//     "city": "Delhi",
//     "venue": "91Springboard",
//     "startDate": "2026-08-15T17:00:00Z",
//     "minPrice": 299,
//     "coverimage": "https://picsum.photos/400/600?random=18"
//   },
//   {
//     "_id": "evt_019",
//     "title": "Independence Day Celebration Concert",
//     "category": "celebrations",
//     "city": "Delhi",
//     "venue": "Red Fort Grounds",
//     "startDate": "2026-08-15T19:00:00Z",
//     "minPrice": 999,
//     "coverimage": "https://picsum.photos/400/600?random=19"
//   },
//   {
//     "_id": "evt_020",
//     "title": "Weekend Basketball Tournament",
//     "category": "sports",
//     "city": "Delhi",
//     "venue": "Talkatora Stadium",
//     "startDate": "2026-08-18T15:00:00Z",
//     "minPrice": 399,
//     "coverimage": "https://picsum.photos/400/600?random=20"
//   }
// ]

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
                if(page === 1){
                    setInitialLoading(true)
                }else{
                    setIsFetchingMore(true)
                }
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/search`, {
                    params: {
                        page: page,
                        city: location?.city,
                        category: category,
                        limit: 6
                    }
                })
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
        setPage(1)
        setAllEvents([])
    }, [category, location?.city])
    // infinite scroll observer block
    useEffect(() => {
        const hasNextPage = pagination?.currentPage < pagination?.totalPages
        if (!hasNextPage || isFetchingMore) return
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isFetchingMore) {
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
    const isEmpty = !initialLoading && Array.isArray(allevents) && allevents.length === 0
    const heroEvents = allevents?.slice(0, 6)
    const formattedCategory = CATEGORY_LABELS[category] || category
    return (
        <div className='w-full'>
            <Navbar />
            { initialLoading   ? (
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
