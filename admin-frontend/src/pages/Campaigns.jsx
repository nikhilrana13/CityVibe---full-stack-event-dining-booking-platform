import CampaignsTable from '@/components/campaigns/CampaignsTable';
import { useGetAllCampaignsQuery } from '@/redux/api/CampaignApi';
import React, { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';

const Campaigns = () => {
    const [ShowModel,setShowModel] = useState(false)
    const {data,isLoading,isError} = useGetAllCampaignsQuery()
    const campaigns = data?.data?.campaigns || []
    

  return (
    <div className='w-full px-5 py-5 flex flex-col gap-3'>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          {/* Left */}
          <div className="max-w-2xl">
            <span className="text-gray-500 font-bold tracking-widest uppercase text-xs mb-2 block">
              CityVibe Campaign Management
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191c1e] mb-2">
              Campaign Hub
            </h2>
            <p className="text-[#3d4a3d] text-sm sm:text-base leading-relaxed">
              Create, manage, and monitor promotional campaigns to drive customer engagement and increase bookings across CityVibe.          
              </p>
          </div>
          {/* Button */}
          <div className="w-full md:w-auto">
            <button onClick={()=>setShowModel(true)} className="w-full md:w-auto bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6] text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition">
              <MdAddCircle className="text-xl" />
              Create Campaign
            </button>
          </div>
        </div>
        {/* campaign table */}
        <div className="w-full bg-[#f3f4f6] rounded-xl p-2 overflow-hidden">
          <CampaignsTable campaigns={campaigns} Loading={isLoading} isError={isError} />
        </div>
         
    </div>
  );
}

export default Campaigns;
