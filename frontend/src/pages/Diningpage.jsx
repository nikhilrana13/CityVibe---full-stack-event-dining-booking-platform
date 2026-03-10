import React, { useState } from 'react'
import Navbar from '../components/common/Navbar'
import diningpageimg from "/diningpagelarge.avif"
import diningmobileimg from "/diningpagemobile.avif"
import { useDialog } from '../context/useDialog'
import Footer from '../components/pages/listyourevent/Footer'
import { Helmet } from 'react-helmet-async'


const Diningpage = () => {
  const { setIsEventAndDiningOpen } = useDialog()
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <Helmet>
        <title>
          {location?.city
            ? `Restaurants in ${location.city} | Book Tables & Dining Experiences | CityVibe`
            : "Discover Restaurants & Dining Experiences | CityVibe"}
        </title>
        <meta
          name="description"
          content={
            location?.city
              ? `Explore top restaurants in ${location.city}. Reserve tables, discover cuisines, and enjoy premium dining experiences with CityVibe.`
              : "Discover the best restaurants, cuisines and dining experiences near you with CityVibe."
          }
        />
        <meta
          name="keywords"
          content="restaurants, dining, table reservation, restaurants near me, fine dining, food experiences"
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content={
            location?.city
              ? `Restaurants in ${location?.city} | CityVibe`
              : "Discover Restaurants & Dining | CityVibe"
          }
        />
        <meta
          property="og:description"
          content="Find and reserve tables at the best restaurants and dining experiences near you."
        />
      </Helmet>

      <div className='w-full'>
        <Navbar />
        <section onClick={() => setIsEventAndDiningOpen(true)} className='relative w-full min-h-[60vh] md:min-h-[100vh] cursor-pointer'>
          {!loaded && (
            <div className="w-full h-[60vh] md:h-[100vh] bg-gray-200 animate-pulse" />
          )}
          <picture className={loaded ? "block" : "hidden"}>
            {/* desktop image */}
            <source media="(min-width: 768px)" srcSet={diningpageimg} />
            {/* mobile image */}
            <img src={diningmobileimg} loading='eager' fetchPriority='high' alt="Discover the best restaurants and dining experiences" className='w-full h-full object-cover' onLoad={() => setLoaded(true)} />
          </picture>
        </section>
        {/* hidden SEO content */}
        <div className="sr-only">
          <h1>Discover the Best Dining Experiences</h1>
          <p>
            Explore the best restaurants, cafes, and fine dining experiences near you.
            Find trending restaurants, street food spots, and premium dining places
            in your city with CITYVIBE.
          </p>
          <h2>Popular Dining Categories</h2>
          <ul>
            <li>Best Restaurants Near Me</li>
            <li>Top Cafes and Coffee Shops</li>
            <li>Fine Dining Restaurants</li>
            <li>Street Food Spots</li>
            <li>Family Dining Restaurants</li>
          </ul>
        </div>
        <Footer />
      </div>
    </>

  )
}

export default Diningpage