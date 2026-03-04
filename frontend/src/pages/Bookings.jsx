import { useNavigate } from 'react-router-dom';
import BookNavbar from '../components/pages/EventPage/BookNavbar';
import React from 'react';

const Bookings = () => {
    const navigate = useNavigate()
    
  return (
    <div className='w-full'>
        <BookNavbar title={"Review your bookings"} handleBack={()=>navigate("/")} showBack />
    </div>
  );
}

export default Bookings;
