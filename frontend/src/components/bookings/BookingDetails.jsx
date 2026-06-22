import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingTicketShimmer from './BookingTicketShimmer';
import BookingNotFound from './BookingNotFound';
import { toast } from 'sonner';
import EventBookingDetails from '../events/EventBookingDetails';
import DiningBookingDetail from '../dining/DiningBookingDetail';
import { useCancelDiningBookingMutation, useCancelEventBookingMutation, useGetDiningBookingDetailQuery, useGetEventBookingDetailQuery } from '@/redux/api/BookingApi';


const BookingDetails = () => {
     const {id,type} = useParams()
     const EventBookingDetailsQuery = useGetEventBookingDetailQuery(id,{
      skip: type !== "events"
     })
     const DiningBookingDetailsQuery = useGetDiningBookingDetailQuery(id,{
      skip: type !== "dining"
     })
     const BookingDetailsQuery = type === "events" ? EventBookingDetailsQuery : DiningBookingDetailsQuery
     const booking = BookingDetailsQuery?.data?.data?.booking
     const loading = BookingDetailsQuery?.isLoading 
     const [CancelEventBooking,{isLoading:isCancellingEvent}] = useCancelEventBookingMutation()
     const [CancelDiningBooking,{isLoading:isCancellingDining}] = useCancelDiningBookingMutation()
     const isCancelBook = type === "events"  ? isCancellingEvent : isCancellingDining



    const handleCancelBooking = async(id)=>{
           try {
               const response = type === "events" ? await CancelEventBooking(id).unwrap() : await CancelDiningBooking(id).unwrap()
               toast.success(response?.message)
           } catch (error) {
             console.error("failed to cancel booking",error)
             toast.error(error?.data?.message || "Internal server error")
           }
    }
  
   const notFound = !loading && BookingDetailsQuery.isSuccess && !booking
  return (
    <div className='w-full'>
      {
        loading ? (
          <BookingTicketShimmer />
        ):notFound ? (
          <BookingNotFound />
        ):type === "events" ? (
           <EventBookingDetails booking={booking} CancelBooking={()=>handleCancelBooking(id)} iscancelbook={isCancelBook} />
        ):(
          <DiningBookingDetail booking={booking} CancelBooking={()=>handleCancelBooking(id)} iscancelbook={isCancelBook}  />
        )
      }     
    </div>
  );
}

export default BookingDetails
