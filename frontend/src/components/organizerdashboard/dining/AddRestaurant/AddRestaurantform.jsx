import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ResBasicInfo from './ResBasicInfo';
import AmenitiesAndContact from './AmenitiesAndContact';
import { Check, Loader2 } from 'lucide-react';
import TimingAndSlots from './TimingAndSlots';
import AddImages from './AddImages';
import RestaurantReview from './RestaurantReview';
import axios from 'axios';
import { toast } from 'sonner';

const steps = [
    "Basic Info",
    "Amenities & Contact",
    "Timing & Slots",
    "Images",
    "Review",
];
const AddRestaurantform = () => {
    const [Step, SetStep] = useState(1)
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            location: "",
            city: "",
            address: "",
            cuisine: [],
            averagePrice: 100,
            openingTime: "",
            closingTime: "",
            availablefacility: [],
            contactnumbers: [""],
            images: [],
            slotInterval: 15,
            lunchStart: "",
            lunchEnd: "",
            dinnerStart: "",
            dinnerEnd: "",
        }
    })
    const { handleSubmit, trigger, watch, getValues } = methods
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const NextStep = async () => {
        // current step fields validation
        let stepFields = [];
        if (Step === 1) stepFields = ["name", "description", "location", "city", "address", "averagePrice"]
        if (Step === 2) stepFields = ["contactnumbers"]
        if (Step === 3) stepFields = [
            "openingTime",
            "closingTime",
            "lunchStart",
            "lunchEnd",
            "dinnerStart",
            "dinnerEnd"
        ]
        if (Step === 4) stepFields = ["images"]
        const valid = await trigger(stepFields);
        if (!valid) return;
        SetStep((prev) => Math.min(prev + 1, 5));
    }
    const prevStep = async () => {
        SetStep((prev) => Math.max(prev - 1, 1))
    }

    const onSubmit = async (data) => {
        const formdata = new FormData()
        formdata.append("name", data.name)
        formdata.append("description", data.description)
        formdata.append("location", data.location)
        formdata.append("city", data.city)
        formdata.append("address", data.address)
        formdata.append("averagePrice", data.averagePrice)
        formdata.append("openingTime", data.openingTime)
        formdata.append("closingTime", data.closingTime)
        formdata.append("lunchStart", data.lunchStart)
        formdata.append("slotInterval", data.slotInterval)
        formdata.append("lunchEnd", data.lunchEnd)
        formdata.append("dinnerStart", data.dinnerStart)
        formdata.append("dinnerEnd", data.dinnerEnd)
        formdata.append("cuisine", JSON.stringify(data.cuisine))
        formdata.append("availablefacility", JSON.stringify(data.availablefacility))
        formdata.append("contactnumbers", JSON.stringify(data.contactnumbers))
        data.images.forEach((file) => {
            formdata.append("images", file)
        })
        // for(let pair of formdata.entries()){
        //     console.log(pair[0] + " " + pair[1])
        // }
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dining/restaurant/create`, formdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data) {
                toast.success(response?.data?.message)
                navigate("/organizer/manage-dining")
            }
        } catch (error) {
            console.error("failed to Add restaurant", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full px-4 py-3'>
            <div className=' min-h-screen bg-gradient-to-br rounded-xl from-[#0f0c29] via-[#14132b] to-[#1b1b3a] text-white px-4 py-10'>
                {/* header */}
                <div className="max-w-5xl mx-auto text-center mb-10">
                    <h1 className="text-3xl font-semibold">Create Restaurant Listing</h1>
                    <p className="text-gray-400 mt-2">
                        Set up your restaurant profile to showcase your space, cuisine, and dining experience.
                    </p>
                </div>
                {/* step indicator */}
                <div className="max-w-4xl mx-auto flex items-center gap-3 overflow-y-auto justify-between mb-12 relative">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isActive = Step === stepNumber;
                        const isCompleted = Step > stepNumber;
                        return (
                            <div key={index} className="flex  flex-col items-center w-full">
                                <div
                                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                                     ${isCompleted
                                            ? "bg-green-500"
                                            : isActive
                                                ? "bg-indigo-600 shadow-lg shadow-indigo-500/40"
                                                : "bg-gray-700"
                                        }
                                       `}
                                >
                                    {isCompleted ? <Check size={16} /> : stepNumber}
                                </div>
                                <span
                                    className={`mt-2 whitespace-nowrap text-xs ${isActive ? "text-white" : "text-gray-400"
                                        }`}
                                >
                                    {step}
                                </span>
                            </div>
                        );
                    })}
                </div>
                {/* form */}
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {Step === 1 && <ResBasicInfo />}
                        {Step === 2 && <AmenitiesAndContact />}
                        {Step === 3 && <TimingAndSlots />}
                        {Step === 4 && <AddImages />}
                        {Step === 5 && <RestaurantReview />}
                        {/* footer */}
                        <div className="flex 2xl:px-14 flex-col gap-4 sm:flex-row sm:justify-between mt-10">
                            {
                                Step > 1 && (
                                    <button onClick={() => prevStep()} type='button' className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                                        Back
                                    </button>
                                )
                            }
                            {
                                Step < 5 && (
                                    <button onClick={() => NextStep()} type='button' className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/40">
                                        Continue
                                    </button>
                                )
                            }
                            {
                                Step === 5 &&
                                <button type='submit' disabled={loading} className={`px-8 py-3 rounded-xl transition shadow-lg shadow-indigo-500/40  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} `}>
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" size={16} />
                                            Publishing...
                                        </span>) : ("Publish")} </button>
                            }
                        </div>
                    </form>
                </FormProvider>

            </div>
        </div>
    )
}

export default AddRestaurantform