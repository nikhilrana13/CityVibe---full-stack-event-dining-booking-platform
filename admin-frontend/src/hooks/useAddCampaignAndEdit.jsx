import { useAddCampaignMutation, useUpdateCampaignMutation } from '@/redux/api/CampaignApi';
import React from 'react';
import { toast } from 'react-toastify';

const useAddCampaignAndEdit = ({ IsEdit, campaignId, onSuccess }) => {
    const [AddCampaign, { isLoading: isAddingLoading }] = useAddCampaignMutation()
    const [UpdateCampaign, { isLoading: isUpdatingLoading }] = useUpdateCampaignMutation()
    const loading = isAddingLoading || isUpdatingLoading
    
    const SubmitProduct = async (data, selectedImage) => {
        const formdata = new FormData()

        if (IsEdit) {
            // update campaign fields
            formdata.append("title", data.title);
            formdata.append("startDate", data.startDate);
            formdata.append("endDate", data.endDate);
            formdata.append("displayOnHome", data.displayOnHome);
            formdata.append("usageLimit", data.usageLimit);
            formdata.append("displayPriority", data.displayPriority);
            if (selectedImage instanceof File) {
                formdata.append("bannerImageUrl", selectedImage);
            }
        } else {
            // create campaign field
            formdata.append("title", data.title);
            formdata.append("discountType", data.discountType);
            formdata.append("discountValue", data.discountValue);
            formdata.append("startDate", data.startDate);
            formdata.append("endDate", data.endDate);
            formdata.append("usageLimit", data.usageLimit);
            formdata.append("maxDiscount", data.maxDiscount);
            formdata.append("minOrderAmount", data.minOrderAmount);
            formdata.append("perUserLimit", data.perUserLimit);
            formdata.append("displayOnHome", data.displayOnHome);
            formdata.append("applicableFor", data.applicableFor);
            formdata.append("displayPriority", data.displayPriority);

            if (selectedImage) {
                formdata.append("bannerImageUrl", selectedImage);
            }
        }
        try {
            const response = IsEdit ? await UpdateCampaign({ formdata, id: campaignId }).unwrap() : await AddCampaign(formdata).unwrap()
            if (response?.status === "success") {
                toast.success(response?.message)
                onSuccess?.();
            }
        } catch (error) {
            console.error("failed to add and edit campaign", error)
            const message = error?.data?.message
            toast.error(typeof message === "string" ? message : "Something went wrong");
        }
    }

    return { SubmitProduct, loading };
}

export default useAddCampaignAndEdit;
