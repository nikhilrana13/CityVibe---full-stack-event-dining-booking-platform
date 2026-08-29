import React from 'react';
import { IoClose } from 'react-icons/io5';
import OfferCard from './OfferCard';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import OfferCardShimmer from './OfferCardShimmer';
import OfferEmptyState from './OfferEmptyState';

const ShowUserOffers = ({ onClose, activeOffers, offerloading,onApply, isApplying, appliedOffer,applyingCampaignId}) => {
  useLockBodyScroll()
    return (
        <div className="fixed inset-0 z-[105] bg-black/60 backdrop-blur-md">
            {/* backdrop */}
            <div onClick={onClose} className="absolute inset-0" />
            {/* modal */}
            <div className="absolute bottom-0 left-0 right-0 lg:top-1/2 lg:left-1/2 lg:bottom-auto lg:w-[500px] lg:-translate-x-1/2 lg:-translate-y-1/2 rounded-t-[32px] lg:rounded-[32px] bg-white p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
                {/* heading */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-[#191c1e]">
                        Available Offers
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400"
                    >
                        <IoClose />
                    </button>
                </div>
                {/* offers list */}
                {
                    offerloading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => {
                                return (
                                    <OfferCardShimmer key={i} />
                                )
                            })}
                        </div>
                    ) : activeOffers?.length > 0 ? (
                        <div className="space-y-4">
                            {activeOffers?.map((campaign) => {
                                return (
                                    <OfferCard key={campaign._id} campaign={campaign} appliedOffer={appliedOffer} onApply={onApply} isApplying={isApplying} applyingCampaignId={applyingCampaignId} />
                                );
                            })}
                        </div>
                    ) : (
                        <OfferEmptyState />
                    )
                }
            </div>
        </div>
    );
}

export default ShowUserOffers;
