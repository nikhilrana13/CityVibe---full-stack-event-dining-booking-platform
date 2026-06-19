import React from 'react';

const StatsCardShimmer = () => {
  return (
     <div className="bg-white border rounded-xl p-5 shadow-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>

        <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="h-8 w-20 bg-gray-200 rounded mt-3"></div>
    </div>
  );
}

export default StatsCardShimmer;
