import React from 'react';

const DashboardSkeleton = () => {
  return (
   <div className="p-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({length:7}).map((_,i)=>(
        <div
          key={i}
          className="h-[110px] bg-gray-200 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}

export default DashboardSkeleton;
