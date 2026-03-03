import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { formatDateRange, formatDuration, formatIndianNumber, formatTime, generateSlug } from '../../../lib/utils';
import { Calendar1Icon, Clock, Languages, MapPin, Ticket } from 'lucide-react';
import React from 'react';

const EventDetailCard = ({event}) => {
    // console.log("event",event)
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/events/${event?._id}/${generateSlug(event?.title)}/book`)
    }
    return (
        <> 
            <div className='space-y-8 pb-15 lg:pb-0'>
                <div className='flex flex-col overflow-hidden'>
                    <h1 className='text-[1.3rem] sm:text-[1.7rem] truncate tracking-tight font-[600]'>{event?.title || "NA"}</h1>
                    <span className='flex text-[#6D49FD] truncate text-[0.9rem] sm:text-[1rem] font-[500] items-center gap-2'>
                        {formatDateRange(event?.startDate, event?.endDate)}, {formatTime(event?.starttime)} | <span className='text-gray-500 truncate text-[0.9rem] sm:text-[1rem] font-[500]'>{event?.venue} | {event?.location},<span className='capitalize'>{event?.city}</span></span>
                    </span>
                </div>
                {/* cover image */}
                <div className='w-full aspect-[2/3]  sm:aspect-[16/4]  overflow-hidden relative rounded-2xl border'>
                    {/* Blurred Background */}
                    <img
                        src={event?.coverimage}
                        alt={`${event?.title}blur bg`}
                        className="absolute inset-0 w-full h-full transition-transform duration-300 ease-in-out object-cover blur-[3px] hover:scale-110"
                    />

                    {/* Dark overlay  */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Main Center Image */}
                    <img
                        src={event?.coverimage}
                        alt={`${event.title} cover image`}
                        className="relative z-10 h-full mx-auto  object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                </div>
                {/* description */}
                <div className='flex flex-col gap-5 py-5 lg:flex-row'>
                    {/* about */}
                    <div className='space-y-5 w-full'>
                        <h3 className='text-[1.5rem]  font-[500]'>About</h3>
                        <p className='text-[0.9rem] leading-8  md:max-w-2xl text-gray-600'>
                            {event?.description || "NA"}
                        </p>
                    </div>
                    <div className=''>
                        <div className='lg:border space-y-4 py-6 lg:px-7 w-full lg:w-[400px]  lg:rounded-xl'>
                            <div className='flex flex-col space-y-5'>
                                <div className='flex items-center  gap-3'>
                                    <div className="p-3 bg-white shadow-md rounded-2xl">
                                        <MapPin size={23} className=" text-black" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-[500]'>{event?.location},<span className='capitalize'>{event?.city}</span></span>
                                        <span className='text-gray-600 text-[0.8rem]'>Mohali</span>
                                    </div>
                                </div>
                                <div className='flex items-center  gap-3'>
                                    <div className="p-3 bg-white shadow-md rounded-2xl">
                                        <Calendar1Icon size={23} className=" text-black" />
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-[500]'>Entry Starts at {formatTime(event?.starttime)}</span>
                                        <span className='text-gray-600 text-[0.8rem]'>{formatDateRange(event?.startDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <hr className='lg:flex hidden' />
                            <div className='hidden items-center lg:flex justify-between'>
                                <div className='flex flex-col'>
                                    <span className='font-[500]'>₹{formatIndianNumber(event?.minPrice)} <span className='text-[0.8rem] text-gray-400'>onwards</span></span>
                                </div>
                                <Button onClick={handleClick} className="rounded-xl px-5 py-6">Book Tickets</Button>
                            </div>

                        </div>
                    </div>
                </div>
                {/* things to know */}
                <div className='flex flex-col space-y-5'>
                    <h3 className='text-[1.5rem]  font-[500]'>Things to know</h3>
                    <span className='flex items-center gap-2'>
                        <Languages size={20} className='text-gray-400' />
                        <span className='text-[0.9rem] font-[400]' >Event will be in {event?.language || "English, hindi, punjabi"}</span>
                    </span>
                    <span className='flex items-center gap-2'>
                        <Ticket size={20} className='text-gray-400' />
                        <span className='text-[0.9rem] font-[400]' >Ticket needed for {event?.ticketsneededfor || "all ages"}</span>
                    </span>
                    {event?.duration && (
                         <span className='flex items-center gap-2'>
                        <Clock size={20} className='text-gray-400' />
                        <span className='text-[0.9rem] font-[400]' >Duration {formatDuration(event?.duration)}</span>
                    </span>
                    )}
                </div>
                {/* artists */}
                {event?.artists?.length > 0 && (
                    <div>
                    <h3 className='text-[1.5rem]  font-[500]'>Artists</h3>
                    <div className='flex py-5 gap-4 overflow-y-auto w-full'>
                        {event?.artists?.map((artist)=>{
                            return (
                                  <div key={artist?._id} className="bg-white rounded-3xl py-2 px-2 flex-shrink-0  w-[230px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] 
                    border border-gray-200 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                            {/* Image Container */}
                            <div className="rounded-2xl">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={artist?.artistimage}
                                        alt={artist?.name}
                                        className="w-full h-[200px] object-cover"
                                    />
                                </div>
                            </div>
                            {/* Text Section */}
                            <div className="my-4 text-center">
                                <h3 className="text-[1.1rem] capitalize font-semibold text-gray-900">
                                    {artist?.name}
                                </h3>
                            </div>
                        </div>
                            )
                        })}
                      
                       
                    </div>
                </div>
                )}
             
                {/* Mobile Fixed Bottom Bar */}
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t shadow-lg px-4 py-3 flex justify-between items-center lg:hidden">
                    <div className="flex items-center">
                        <span className="font-semibold text-lg">
                            ₹{formatIndianNumber(event?.minPrice)} <span className="text-xs text-gray-400">onwards</span>
                        </span>
                    </div>
                    <Button onClick={handleClick} className="rounded-xl px-6 py-5">
                        Book Tickets
                    </Button>
                </div>
            </div>
        </>
    );
}

export default EventDetailCard;
