import React from 'react';

const RestaurantBookHeader = ({restaurant}) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b z-50">
      <div className="max-w-6xl mx-auto overflow-y-auto flex items-center gap-4 py-4 px-6">
        {/* restaurant image */}
        <img
          src={restaurant?.images?.[0]}
          alt={restaurant?.name}
          className="w-14 h-14 rounded-lg object-cover"
        />
        {/* info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            {restaurant?.name}
          </h2>
          <p className="text-sm text-gray-500 truncate max-w-xl">
            ₹{restaurant?.averagePrice} for two | {restaurant?.address}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RestaurantBookHeader;
