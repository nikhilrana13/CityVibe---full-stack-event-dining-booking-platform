import React, { useEffect, useState } from 'react';
import BookNavbar from './BookNavbar';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader2, Minus, Plus } from 'lucide-react';
import Loader from '../../../components/common/Loader';
import EventNotFoundFallback from './EventNotFoundFallback';
import { useSelector } from 'react-redux';
import { useDialog } from '../../../context/useDialog';
import { toast } from 'sonner';
import { formatIndianNumber, } from '@/utils/Helpers';

const BookEventTickets = () => {
  const user = useSelector((state)=>state.Auth.user)
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookloading,setBookLoading] = useState(false)
  const [cart, setCart] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()
  const {setIsLoginOpen,setLoginRedirect} = useDialog()
  const location = useLocation()

  // fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/details/${id}`)
        // console.log("response", response.data)
        if (response.data) {
          const eventData = response?.data?.data?.event
          setEvent(eventData)
        }
      } catch (error) {
        console.error("failed to get event details", error)
      } finally {
       setLoading(false)
      }
    }
    fetchEventDetails()
  }, [id])
  const ticket = event?.ticket || []

  const increaseQuantity = (ticketId) => {
    setCart((prev) => ({ ...prev, [ticketId]: (prev[ticketId] || 0) + 1 }))
  }
  const descreaseQuantity = (ticketId) => {
    setCart(prev => {
      const newQty = (prev[ticketId] || 0) - 1
      if (newQty <= 0) {
        const updated = { ...prev }
        delete updated[ticketId]
        return updated
      }
      return { ...prev, [ticketId]: newQty }
    })
  }
  const totalTickets = Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const totalPrice = ticket.reduce((sum, t) => {
    const qty = cart[t._id] || 0
    return sum + qty * t.price
  }, 0)
  const handleBack = () => {
    navigate(`/events/${event?._id}/${generateSlug(event?.title)}`)
  }
  // handle checkout 
  const handleCheckout = async()=>{
     if(!user){
      setLoginRedirect(location.pathname + location.search)
      setIsLoginOpen(true)
      return
     }
     const tickets = Object.entries(cart).map(([ticketId,qty])=>({
      ticketId,
      quantity:qty
     }))
     try {
      setBookLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/event/create-booking`,{
        eventId:event?._id,
        tickets
      },{ headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`
      }})
      if(response.data){
         const checkOutUrl = response?.data?.data?.url 
         window.location.href = checkOutUrl
      }
     } catch (error) {
       console.error("failed to booking event",error)
       toast.error(error?.response?.data?.message || "Internal server error")
     }finally{
      setBookLoading(false)
     }
  }
  // console.log("cart",cart)
  const NoEventfound = !event
  return (
    <div className='w-full'>
      {
        loading ? (
          <Loader />
        ) : NoEventfound ? (
          <EventNotFoundFallback />
        ) : (
          <>
            <BookNavbar title={event?.title} startDate={event?.startDate} starttime={event?.starttime} handleBack={handleBack} city={event?.city} showBack />
            <section className='bg-[#F9F9FA] min-h-[100vh] w-full pb-24'>
              <div className='flex flex-col w-full  md:max-w-2xl  mx-auto p-5 justify-center items-center  space-y-3'>
                <div className='flex w-full gap-3 items-center'>
                  <h3 className='text-[1.3rem] whitespace-nowrap text-[#121D34] font-[500]'>CHOOSE TICKETS</h3>
                  <div className='w-full border bg-gray-500 h-[1px]' />
                </div>
                {/* ticket card */}
                {ticket?.length > 0 ? (
                     ticket?.map((ticket) => {
                      const qty = cart[ticket._id] || 0
                      return (
                        <div key={ticket?._id} className='bg-white border w-full p-3 rounded-xl flex flex-col'>
                          <div>
                            <h4 className='text-[0.9rem] font-[500] text-[#121D34] '>{ticket?.name} </h4>
                            <div className='flex items-center border-b py-3 justify-between'>
                              <span className='text-[#121D34]'>₹{formatIndianNumber(ticket?.price)}</span>
                              {qty > 0 ? (
                                <div className='flex items-center gap-3 bg-black text-white px-4 py-2 rounded-md'>
                                  <span onClick={() => descreaseQuantity(ticket?._id)} className='cursor-pointer'>
                                    <Minus size={16} />
                                  </span>
                                  <span>{qty}</span>
                                  <span onClick={() => increaseQuantity(ticket?._id)} className='cursor-pointer'>
                                    <Plus size={16} />
                                  </span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => increaseQuantity(ticket._id)}
                                  className='px-8 text-[0.8rem] rounded-md font-[500] bg-[#F3F3F5] py-2'
                                >
                                  ADD
                                </button>
                              )}
                            </div>
                          </div>
                          {/* description */}
                          <p className='text-gray-500 mt-1  text-[0.8rem]'>{ticket?.description}</p>
                        </div>
                      )
                    })
                  ):(
                     <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                      <h3 className="text-lg font-medium text-[#121D34]">
                        Tickets not available
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Tickets for this event are currently unavailable.
                      </p>
                    </div>
                  )
                }
              </div>
              {totalTickets > 0 && (
                <div className="fixed  bottom-0 left-0 right-0 flex justify-center items-center  bg-white border-t shadow-lg p-4 mx-auto">
                  <div className='flex w-full max-w-2xl justify-between'>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        {totalTickets} Ticket{totalTickets > 1 ? "s" : ""}
                      </span>
                      <span className="font-semibold text-lg">
                        ₹{formatIndianNumber(totalPrice)}
                      </span>
                    </div>
                    <button
                      disabled={bookloading}
                      onClick={handleCheckout}
                      className="bg-[#0C172F] text-white px-7 py-3 rounded-xl font-medium disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {bookloading ? <Loader2 className='w-5 h-5 mx-auto animate-spin' /> : `Proceed  • ₹ ${formatIndianNumber(totalPrice)}`}
                    </button>
                  </div>
                </div>
              )}
            </section>
          </>
        )
      }
    </div>
  );
}

export default BookEventTickets;
