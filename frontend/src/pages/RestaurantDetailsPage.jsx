import RestaurantDetailCard from '../components/pages/diningPage/RestaurantDetailCard';
import Navbar from '../components/common/Navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/pages/listyourevent/Footer';
import RestaurantDetailShimmer from '../components/pages/diningPage/RestaurantDetailShimmer';
import RestaurantNotfoundFallback from '../components/pages/diningPage/RestaurantNotfoundFallback';
import { Helmet } from 'react-helmet-async';

const RestaurantDetailsPage = () => {
  const [restaurant, setRestaurant] = useState({})
  const [loading, setLoading] = useState(true)
  const [notFound, setNotfound] = useState(false)
  const { id } = useParams()

  //fetch restaurant details 
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true)
        setNotfound(false)
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dining/restaurant/details/${id}`)
        if (response.data) {
          const resData = response?.data?.data?.restaurant
          if (!resData) {
            setNotfound(true)
          } else {
            setRestaurant(resData)
          }
        }
      } catch (error) {
        setNotfound(true)
        console.error("failed to get Restaurant details", error)
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurantDetails()
  }, [id])
  
  return (
    <>
      {
        restaurant && (
          <Helmet key={restaurant?._id || "default"}>
            <title>
              {restaurant?.name ? `${restaurant.name} | Dining` : "CityVibe"}
            </title>

            <meta
              name="description"
              content={
                restaurant?.name
                  ? `Reserve tables at ${restaurant.name} in ${restaurant.city}. Discover restaurants and dining experiences on CityVibe.`
                  : "Discover restaurants and dining experiences on CityVibe."
              }
            />
          </Helmet>
        )
      }
      <div className='w-full'>
        <Navbar />
        <section className='w-full py-10'>
          <div className='mx-auto px-4 gap-4 py-4  max-w-[1200px]'>
            {
              loading ? (
                <RestaurantDetailShimmer />
              ) : notFound ? (
                <RestaurantNotfoundFallback />
              ) : (
                <RestaurantDetailCard restaurant={restaurant} />
              )
            }
          </div>
        </section>
        <Footer />
      </div>
    </>

  );
}

export default RestaurantDetailsPage;
