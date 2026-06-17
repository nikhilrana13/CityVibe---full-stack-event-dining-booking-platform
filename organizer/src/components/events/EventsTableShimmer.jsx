const EventsTableShimmer = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <tr key={index} className="border-t animate-pulse">
          {/* Event */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-200 rounded-xl" />
              <div className="flex flex-col gap-2">
                <div className="h-3 w-32 bg-gray-200 rounded" />
                <div className="h-2 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </td>
          {/* Date */}
          <td className="px-6 py-4">
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </td>
          {/* Status */}
          <td className="px-6 py-4">
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </td>
          {/* Tickets */}
          <td className="px-6 py-4">
            <div className="flex flex-col gap-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="w-40 h-2 bg-gray-200 rounded-full" />
            </div>
          </td>

          {/* Start Time */}
          <td className="px-6 py-4">
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </td>

          {/* Category */}
          <td className="px-6 py-4">
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </td>

          {/* Actions */}
          <td className="px-6 py-4 text-right">
            <div className="h-8 w-8 bg-gray-200 rounded-lg inline-block" />
          </td>

        </tr>
      ))}
    </>
  );
};

export default EventsTableShimmer;