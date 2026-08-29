import { Clock3, Percent, Tag } from 'lucide-react';
import React from 'react';
import ApplyButton from './ApplyButton';
import { FormatValidity } from '@/utils/Helpers';

const OfferCard = ({campaign, appliedOffer, onApply, isApplying,applyingCampaignId}) => {
  const {_id,title,discountType,discountValue,minOrderAmount,endDate} = campaign;
  const isApplied = String(appliedOffer) === String(_id);
  const isThisOfferApplying = isApplying && String(applyingCampaignId) === String(_id);
  const isPercentage = discountType === "percentage";
  const discountLabel = isPercentage ? `${discountValue}%` : `₹${discountValue}`;
  const description = `Get ${isPercentage ? `${discountValue}% off` : `₹${discountValue} off`} on bookings above ₹${minOrderAmount}`;
  const validityLabel = FormatValidity(endDate);

  const handleApply = () => {
    if (isThisOfferApplying) return;
    if(isApplied){
        onApply(null)
        return;
    }
    onApply(_id);
  };
  

    return (
        <div
            key={campaign?._id}
            className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_1px_2px_rgba(15,15,35,0.04)] transition-all duration-200 hover:border-indigo-100 hover:shadow-[0_8px_24px_-8px_rgba(79,70,229,0.18)] sm:flex-row">
            {/* Discount panel */}
            <div
                className="relative flex shrink-0 flex-row items-center justify-between gap-3  bg-indigo-50/70 px-5 py-4 sm:w-36 sm:flex-col sm:items-start sm:justify-center sm:gap-1.5 sm:px-4 sm:py-5 md:w-40">
                <div className="flex items-center gap-1.5 sm:flex-col sm:items-start sm:gap-1">
                    <span className="flex items-baseline gap-1 text-[26px] font-extrabold leading-none tracking-tight text-indigo-700 sm:text-3xl">
                        {discountLabel}
                        <span className="text-sm font-bold text-indigo-700/80 sm:text-base">OFF</span>
                    </span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-500/80 sm:mt-0.5">
                    Limited time offer
                </span>
                {/* Ticket-style divider */}
                <span aria-hidden="true"
                    className="absolute right-0 top-3 bottom-3 hidden w-px bg-[repeating-linear-gradient(to_bottom,theme(colors.indigo.200)_0px,theme(colors.indigo.200)_4px,transparent_4px,transparent_9px)] sm:block"
                />
                <span aria-hidden="true"
                    className=" absolute bottom-0 left-3 right-3 h-px bg-[repeating-linear-gradient(to_right,theme(colors.indigo.200)_0px,theme(colors.indigo.200)_4px,transparent_4px,transparent_9px)] sm:hidden"
                />
            </div>
            {/* Info panel */}
            <div className="flex flex-1 flex-col justify-between gap-3 px-5 py-4 sm:py-5">
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[15px] font-semibold leading-snug text-gray-900 sm:text-base">
                            {title}
                        </h3>
                        <span className="mt-0.5 hidden shrink-0 items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-500 sm:inline-flex">
                            {isPercentage ? (
                                <Percent className="h-3 w-3" strokeWidth={2.5} />
                            ) : (
                                <Tag className="h-3 w-3" strokeWidth={2.5} />
                            )}
                            Min ₹{minOrderAmount}
                        </span>
                    </div>
                    <p className="text-[13px] leading-relaxed text-gray-500">{description}</p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
                        <span className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[11px] font-medium text-gray-500 sm:hidden">
                            {isPercentage ? (
                                <Percent className="h-3 w-3" strokeWidth={2.5} />
                            ) : (
                                <Tag className="h-3 w-3" strokeWidth={2.5} />
                            )}
                            Min ₹{minOrderAmount}
                        </span>
                        {validityLabel && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400">
                                <Clock3 className="h-3 w-3" strokeWidth={2.5} />
                                {validityLabel}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <ApplyButton isApplied={isApplied} isApplying={isThisOfferApplying} onClick={handleApply}
                    />
                </div>
            </div>
        </div>
    );
}

export default OfferCard;
