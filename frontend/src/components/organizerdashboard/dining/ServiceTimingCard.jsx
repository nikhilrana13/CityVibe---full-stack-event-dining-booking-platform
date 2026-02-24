import React from 'react'

const ServiceTimingCard = ({restaurant}) => {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Service Timings</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                    <p className="text-gray-400">Lunch</p>
                    <p>{restaurant.lunchStart} - {restaurant.lunchEnd}</p>
                </div>
                <div>
                    <p className="text-gray-400">Dinner</p>
                    <p>{restaurant.dinnerStart} - {restaurant.dinnerEnd}</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceTimingCard