import axios from 'axios';
import { Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'sonner';

const RestaurantOverviewCard = ({restaurant,setRestaurant}) => {
  const [loading, setLoading] = useState(false);

  // Toggle Active/Inactive
  const handleToggle = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/dining/restaurant/toggle/${restaurant._id}`,{
          isActive:!restaurant.isActive
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        // update parent state
        setRestaurant((prev)=>({...prev,isActive:!prev.isActive}))
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };
  // handle delete restaurant
    const handleDeleteRestaurant = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/dining/restaurant/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data) {
                toast.success(response?.data?.message)
                setRestaurant(null);
            }
        } catch (error) {
            console.error("failed to delete event", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        }
    }


  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl mt-6">
    <div className="grid lg:grid-cols-3 gap-6">
    {/* Left - Main Image */}
    <div className="lg:col-span-1">
      <img
        src={restaurant?.images?.[0]}
        alt="restaurant"
        className="w-full h-60 object-cover rounded-2xl"
      />
    </div>
    {/* Middle - Details */}
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-black dark:text-white">
            {restaurant?.name || "NA"}
          </h2>
          <p className="text-sm text-gray-500 capitalize">
            {restaurant?.location || "NA"}, {restaurant?.city || "NA"}
          </p>
        </div>
        <span className={`px-4 py-1 text-xs rounded-full font-semibold
          ${restaurant?.isActive 
            ? "bg-green-500/20 text-green-400" 
            : "bg-red-500/20 text-red-400"}`}>
          {restaurant?.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <p className="text-sm text-gray-500">
        {restaurant?.description}
      </p>
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {restaurant?.cuisine?.map((item, i) => (
          <span key={i} className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-600">
            {item}
          </span>
        ))}
      </div>
      {/* Facilities */}
      <div className="flex flex-wrap gap-2">
        {restaurant?.availablefacility?.map((item, i) => (
          <span key={i} className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-600">
            {item}
          </span>
        ))}
      </div>
      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
        <div>
          <p className="text-xs text-gray-400">Avg Price</p>
          <p className="font-semibold text-black dark:text-white">
            ₹{restaurant?.averagePrice || "NA"}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Opening</p>
          <p className="font-semibold">{restaurant?.openingTime || "NA"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Closing</p>
          <p className="font-semibold">{restaurant?.closingTime|| "NA"}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Slot Interval</p>
          <p className="font-semibold">{restaurant?.slotInterval || "NA"} mins</p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex md:flex-row flex-col gap-3 mt-4">
        <NavLink
          to={`/organizer/edit-restaurant/${restaurant._id}`}
          className="px-6 py-2 rounded-xl bg-indigo-600 text-center hover:bg-indigo-700 text-white text-sm font-medium"
        >
          Edit Restaurant
        </NavLink>
        {/* Toggle Button */}
            <button
              onClick={handleToggle}
              disabled={loading}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition ${
                restaurant?.isActive
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {loading
                ? "Updating..."
                : restaurant?.isActive
                ? "Disable"
                : "Enable"}
            </button>

            {/* Delete Button */}
            <button
              onClick={()=>handleDeleteRestaurant(restaurant?._id)}
              className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default RestaurantOverviewCard