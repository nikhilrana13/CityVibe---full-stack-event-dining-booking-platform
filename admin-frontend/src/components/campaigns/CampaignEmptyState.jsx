import React from "react";
import { MdCampaign } from "react-icons/md";

const CampaignsEmptyState = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="max-w-lg text-center px-6">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
          <MdCampaign className="text-5xl text-[#7C55FA]" />
        </div>
        {/* Heading */}
        <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-[#191c1e]">
          No Campaigns Yet
        </h3>
        {/* Description */}
        <p className="mt-3 text-[#5f6b62] text-sm sm:text-base leading-relaxed">
          You haven't created any campaigns yet. Launch promotional offers,
          attract new customers, and boost Users engagement across the
          CityVibe.
        </p>
        {/* Badge */}
        <div className="mt-5 inline-flex items-center rounded-full bg-blue-200 border border-blue-100 px-4 py-2 text-sm font-medium text-[#7C55FA]">
          CityVibe Campaign Management
        </div>
      </div>
    </div>
  );
};

export default CampaignsEmptyState;