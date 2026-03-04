import React from 'react';

const Loader = () => {
  return (
     <div className="flex items-center justify-center min-h-[60vh]">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-r-purple-600 border-b-transparent border-l-transparent animate-spin"></div>
      </div>
    </div>
  );
}

export default Loader;
