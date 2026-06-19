import React from 'react';

const OrganizerSkeleton = ({rows = 5}) => {
  return (
    <>
     {[...Array(rows)].map((_, index) => (
        <tr key={index} className="border-t animate-pulse">
          <td className="px-6 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>
           <td className="px-6 py-4">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </td>
          <td className="px-6 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </td>

          <td className="px-6 flex justify-end gap-2  py-4">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
             <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </td>
        </tr>
      ))}
    </>
   
  );
}

export default OrganizerSkeleton;
