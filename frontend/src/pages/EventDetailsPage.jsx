import EventDetailCard from '../components/pages/EventPage/EventDetailCard';
import Navbar from '../components/common/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/pages/listyourevent/Footer';
import EventDetailShimmerCard from '../components/pages/EventPage/EventDetailShimmerCard';
import EventNotFoundFallback from '../components/pages/EventPage/EventNotFoundFallback';

const EventDetailsPage = () => {
     const [event,setEvent] = useState({})
     const [loading,setLoading] = useState(true)
     const [notFound,setNotfound] = useState(false)
     const {id} = useParams()

    //fetch event details 
    useEffect(()=>{
        const fetchEventDetails = async()=>{
          try {
            setLoading(true)
            setNotfound(false)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/details/${id}`)
            if(response.data){
              const eventData = response?.data?.data?.event
              if(!eventData){
                setNotfound(true)
              }else{
                 setEvent(eventData)
              }
            }
          } catch (error) {
            setNotfound(true)
            console.error("failed to get event details",error)
          }finally{
           setLoading(false)
          }
        }
        fetchEventDetails()
    },[id])
    // console.log("event",event)
  return (
    <div className='w-full'>
        <Navbar />
        <section className='w-full py-10'>
          <div className='mx-auto px-4 gap-4 py-4 max-w-[1300px]'>
            {
              loading ? (
                <EventDetailShimmerCard />
              ):notFound ? (
                 <EventNotFoundFallback />
              ):(
                <EventDetailCard event={event} />
              )
            }
          </div>
        </section>
        <Footer />
    </div>
  );
}

export default EventDetailsPage;
