import EventDetailCard from '../components/pages/EventPage/EventDetailCard';
import Navbar from '../components/common/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/pages/listyourevent/Footer';
import EventDetailShimmerCard from '../components/pages/EventPage/EventDetailShimmerCard';
import EventNotFoundFallback from '../components/pages/EventPage/EventNotFoundFallback';
import { Helmet } from 'react-helmet-async';

const EventDetailsPage = () => {
  const [event, setEvent] = useState({})
  const [loading, setLoading] = useState(true)
  const [notFound, setNotfound] = useState(false)
  const { id } = useParams()

  //fetch event details 
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true)
        setNotfound(false)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/details/${id}`)
        if (response.data) {
          const eventData = response?.data?.data?.event
          if (!eventData) {
            setNotfound(true)
          } else {
            setEvent(eventData)
          }
        }
      } catch (error) {
        setNotfound(true)
        console.error("failed to get event details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchEventDetails()
  }, [id])
  // console.log("event",event)
  return (
    <>
      <Helmet>
        <title>{event?.title ? `${event.title} | CityVibe` : "CityVibe"}</title>
        <meta
          name="description"
          content={`Book tickets for ${event?.title} happening at ${event?.location}. Discover events on CityVibe.`}
        />
        <meta
          name="description"
          content={
            event?.title
              ? `Book tickets for ${event.title} happening at ${event.location}`
              : "Discover events and dining experiences near you."
          }
        />

      </Helmet>
      <div className='w-full'>
        <Navbar />
        <section className='w-full py-10'>
          <div className='mx-auto px-4 gap-4 py-4 max-w-[1300px]'>
            {
              loading ? (
                <EventDetailShimmerCard />
              ) : notFound ? (
                <EventNotFoundFallback />
              ) : (
                <EventDetailCard event={event} />
              )
            }
          </div>
        </section>
        <Footer />
      </div>
    </>

  );
}

export default EventDetailsPage;
