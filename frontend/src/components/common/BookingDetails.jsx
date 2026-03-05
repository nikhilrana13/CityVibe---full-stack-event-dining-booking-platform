import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EventBookingDetails from './EventBookingDetails';
import DiningBookingDetails from './DiningBookingDetails';
import BookingTicketShimmer from './BookingTicketShimmer';
import BookingNotFound from './BookingNotFound';

const BookingDetails = () => {
     const [loading,setLoading] = useState(true)
     const [booking,setBooking] = useState({})
     const {id,type} = useParams()
    //  fetch booking details
    useEffect(()=>{
          const fetchBookingDetails = async()=>{
            try {
                setLoading(true)
                 const url = type === "events" ? "/api/event/booking" : "/api/restaurant/booking"
                 const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}${url}/${id}`,{
                     headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                 })
                 if(response.data){
                    setBooking(response?.data?.data?.booking)
                 }  
            } catch (error) {
                console.error("failed to get booking details",error)
            }finally{
              setLoading(false)
            }
          }
          if(type) fetchBookingDetails()
    },[id,type])

  
   const notFound = (!booking || Object.keys(booking).length === 0)
  return (
    <div className='w-full'>
      {
        loading ? (
          <BookingTicketShimmer />
        ):notFound ? (
          <BookingNotFound />
        ):type === "events" ? (
           <EventBookingDetails booking={booking} />
        ):(
          <DiningBookingDetails booking={booking} />
        )
      }     
    </div>
  );
}

export default BookingDetails
