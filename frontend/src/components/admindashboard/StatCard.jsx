import React from 'react';

const StatCard = ({title,value,icon}) => {
  return (
      <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">
          {title}
        </p>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mt-3">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;
