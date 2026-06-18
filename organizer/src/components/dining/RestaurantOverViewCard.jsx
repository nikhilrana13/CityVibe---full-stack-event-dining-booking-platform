import { useActiveAndInActiveRestaurantMutation, useDeleteRestaurantMutation } from '@/redux/api/DiningApi';
import React, { useState } from 'react'
import { BsTrash2 } from 'react-icons/bs';
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import ButtonLoader from '../common/ButtonLoader';


const RestaurantOverviewCard = ({ restaurant }) => {
  const [ActiveAndInActiveRestaurant, { isLoading: isToggleLoading }] = useActiveAndInActiveRestaurantMutation()
  const [DeleteRestaurant, { isLoading: isDeleteLoading }] = useDeleteRestaurantMutation()

  // Toggle Active/Inactive
  const handleToggle = async (id) => {
    try {
      const response = await ActiveAndInActiveRestaurant({ id, isActive: !restaurant?.isActive, }).unwrap();
      toast.success(response?.message)
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error(error?.data?.message || "Internal server error")
    }
  };
  // // handle delete restaurant
  const handleDeleteRestaurant = async (id) => {
    try {
      const response = await DeleteRestaurant(id).unwrap()
      toast.success(response?.message)
    } catch (error) {
      console.error("failed to delete event", error)
      toast.error(error?.data?.message || "Internal server error")
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
              <p className="font-semibold">{restaurant?.closingTime || "NA"}</p>
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
              disabled={isToggleLoading}
              onClick={() => handleToggle(restaurant?._id)}
              className={`px-6 py-2 rounded-xl text-sm  flex items-center justify-center   font-medium transition ${restaurant?.isActive
                ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
                }`}
            >
              {isToggleLoading ? (
                <ButtonLoader />
              ) : restaurant?.isActive ? (
                "Disable"
              ) : (
                "Enable"
              )}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDeleteRestaurant(restaurant?._id)}
              disabled={isDeleteLoading}
              className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-medium flex items-center justify-center gap-2"
            >
              {isDeleteLoading ? (
                <ButtonLoader />
              ) : (
                <>
                  <BsTrash2 size={16} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantOverviewCard