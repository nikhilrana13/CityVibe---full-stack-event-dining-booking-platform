import { Check, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import BasicInfo from './BasicInfo';
import DateAndVenue from './DateAndVenue';
import AddTickets from './AddTickets';
import AddArtist from './AddArtist';
import ReviewForm from './ReviewForm';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const steps = [
    "Basic Info",
    "Date & Venue",
    "Tickets",
    "Add Artist",
    "Review",
];
const CreateEventForm = () => {
    const [Step, SetStep] = useState(1)
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            category: "",
            startDate: "",
            endDate: "",
            city: "",
            location: "",
            venue: "",
            coverimage: null,
            tickets: [
                {
                    name: "",
                    price: "",
                    totalQuantity: 1,
                    description: "",
                    paxCount: 1,
                    perPerson: true
                }
            ],
            artists: [
                {
                    name: "",
                    artistimage: null,
                    bio: "",
                }
            ],
            totalSeats: 100
        }
    })
    const { handleSubmit, trigger, watch, getValues } = methods
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const category = watch("category")
    const artistCategories = ["music", "comedy", "performances"]
    const shouldShowArtistStep = artistCategories.includes(category)
    const visibleSteps = shouldShowArtistStep ? steps : steps.filter((step) => step !== "Add Artist")

    const NextStep = async () => {
        // current step fields validation
        let stepFields = [];
        const values = getValues()
        if (Step === 1) stepFields = ["title", "description", "coverimage", "category"]
        if (Step === 2) stepFields = ["startDate", "starttime", "location", "city", "venue", "totalSeats"]
        if (Step === 3) stepFields = values.tickets.flatMap((_, i) => [
            `tickets.${i}.name`,
            `tickets.${i}.price`,
            `tickets.${i}.totalQuantity`,
        ])
        if (Step === 4 && shouldShowArtistStep)
            stepFields = values.artists.flatMap((_, i) => [
                `artists.${i}.name`,
                `artists.${i}.artistimage`,
            ]);

        const valid = await trigger(stepFields);
        if (!valid) return;
        if (Step === 3 && !shouldShowArtistStep) {
            SetStep(5); // skip artist
        } else {
            SetStep((prev) => Math.min(prev + 1, 5));
        }
    }
    const prevStep = async () => {
        SetStep((prev) => Math.max(prev - 1, 1))
    }
    const onSubmit = async (data) => {
        const formdata = new FormData()
        formdata.append("title", data.title)
        formdata.append("description", data.description)
        formdata.append("coverimage", data.coverimage[0])
        formdata.append("category", data.category)
        formdata.append("tickets", JSON.stringify(data.tickets || []))
        // Send artists JSON without image
        formdata.append("artists", JSON.stringify(data.artists.map(a => ({ name: a.name, bio: a.bio }))));
        // Send artist images separately
        data.artists.forEach((artist) => {
            formdata.append("artistimage", artist.artistimage);
        });
        formdata.append("startDate", data.startDate)
        formdata.append("endDate", data.endDate)
        formdata.append("starttime", data.starttime)
        formdata.append("city", data.city)
        formdata.append("location", data.location)
        formdata.append("venue", data.venue)
        formdata.append("totalSeats", data.totalSeats)
        formdata.append("language", data.language)
        formdata.append("duration", data.duration)
        // for (let pair of formdata.entries()) {
        //     console.log(pair[0] + " " + pair[1])
        // }
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/event/create-event`, formdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.data) {
                toast.success(response?.data?.message)
                navigate("/organizer/manage-events")
            }
        } catch (error) {
            console.error("failed to create event", error)
            toast.error(error?.response?.data?.message || "Internal server error")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='w-full px-4 py-3'>
            <div className=' min-h-screen bg-gradient-to-br rounded-xl from-[#0f0c29] via-[#14132b] to-[#1b1b3a] text-white px-4 py-10'>
                {/* header  */}
                <div className="max-w-5xl mx-auto text-center mb-10">
                    <h1 className="text-3xl font-semibold">Create New Event</h1>
                    <p className="text-gray-400 mt-2">
                        Tell us the basics about your urban experience.
                    </p>
                    {/* Important Note */}
                    <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm rounded-xl p-3">
                        ⚠️ Please fill all event details carefully. Once published, event details
                        cannot be edited. If any changes are required, you will need to delete
                        the event and create a new one.
                    </div>
                </div>
                {/* Step Indicator */}
                <div className="max-w-4xl mx-auto flex items-center gap-3 overflow-y-auto justify-between mb-12 relative">
                    {visibleSteps.map((step, index) => {
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
                        {Step === 1 && <BasicInfo />}
                        {Step === 2 && <DateAndVenue />}
                        {Step === 3 && <AddTickets />}
                        {Step === 4 && shouldShowArtistStep && <AddArtist />}
                        {Step === 4 && !shouldShowArtistStep && <ReviewForm />}
                        {Step === 5 && <ReviewForm />}
                        {/* Footer Buttons */}
                        <div className="flex 2xl:px-14 flex-col gap-4 sm:flex-row sm:justify-between mt-10">
                            {
                                Step > 1 && <button onClick={prevStep} type='button' className="px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
                                    Back
                                </button>
                            }
                            {
                                Step < 5 && <button onClick={NextStep} type='button' className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/40">
                                    Continue
                                </button>
                            }
                            {
                                Step === 5 &&
                                <button type='submit' disabled={loading} className={`px-8 py-3 rounded-xl transition shadow-lg shadow-indigo-500/40  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} `}>
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin" size={16} />
                                            Publishing...
                                        </span>
                                    ) : (
                                        "Publish"
                                    )}
                                </button>
                            }
                        </div>
                    </form>
                </FormProvider>

            </div>
        </div>
    )
}

export default CreateEventForm