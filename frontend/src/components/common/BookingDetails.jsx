import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import EventBookingDetails from './EventBookingDetails';
import DiningBookingDetails from './DiningBookingDetails';
import BookingTicketShimmer from './BookingTicketShimmer';
import BookingNotFound from './BookingNotFound';
import { toast } from 'sonner';

const BookingDetails = () => {
     const [loading,setLoading] = useState(true)
     const [booking,setBooking] = useState({})
     const [iscancelbook,setIsCancelBook] = useState(false)
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

    const handleCancelBooking = async(id)=>{
        try {
           setIsCancelBook(true)
           const url = type === "events" ? "/api/event/cancelbooking" : "/api/restaurant/cancelbooking"
           const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}${url}/${id}`,{},{
            headers:{
              Authorization:`Bearer ${localStorage.getItem("token")}`
            }
           })
          //  console.log("response",response?.data)
           if(response.data){
            toast.success(response?.data?.message)
            const updatedBooking = response?.data?.data?.booking
            setBooking((prev)=>({...prev,bookingStatus:updatedBooking?.bookingStatus}))
           }
        } catch (error) {
          toast.error(error?.response?.data?.message || "Internal server error")
          console.error("failed to cancel booking",error)
        }finally{
          setIsCancelBook(false)
        }
    }

  
   const notFound = (!booking || Object.keys(booking).length === 0)
  return (
    <div className='w-full'>
      {
        loading ? (
          <BookingTicketShimmer />
        ):notFound ? (
          <BookingNotFound />
        ):type === "events" ? (
           <EventBookingDetails booking={booking} CancelBooking={()=>handleCancelBooking(id)} iscancelbook={iscancelbook} />
        ):(
          <DiningBookingDetails booking={booking} CancelBooking={()=>handleCancelBooking(id)} iscancelbook={iscancelbook}  />
        )
      }     
    </div>
  );
}

export default BookingDetails
