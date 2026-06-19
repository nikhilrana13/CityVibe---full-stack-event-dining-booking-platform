import React from 'react';

const StatsCard = ({statsdata}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {statsdata?.map(({ title, value, icon: Icon,}) => (
                <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">

                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">
                            {title}
                        </p>
                        <div className="text-gray-400">
                         <Icon size={20} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-semibold mt-3">
                        {value}
                    </h2>
                </div>
            ))}
        </div>

    );
}

export default StatsCard;
