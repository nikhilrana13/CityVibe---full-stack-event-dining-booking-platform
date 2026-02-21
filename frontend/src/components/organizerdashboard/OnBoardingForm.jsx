import { Loader2, UploadCloudIcon } from 'lucide-react'
import React, { useState } from 'react'
import PanDetails from './Onboarding/PanDetails'
import BusinessDetails from './Onboarding/BusinessDetails'
import BankDetails from './Onboarding/BankDetails'
import { FormProvider, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Setuser } from '../../redux/AuthSlice'

const OnBoardingForm = () => {
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      panNumber: "",
      businessName: "",
      businessEmail: "",
      businessPhone: "",
      bankAccountNumber: "",
      ifscCode: "",
      pancardimage: null,
    }
  })
  const { handleSubmit, trigger, watch } = methods;
  const [Step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state)=>state.Auth.user)

  const steps = [
    "PAN details",
    "Business Details",
    "Bank Account"
  ];
  //  step valid validation
  const isStepValid = () => {
    const stepFields = {
      1: ["panNumber", "pancardimage"],
      2: ["businessName", "businessEmail", "businessPhone"],
      3: ["bankAccountNumber", "ifscCode"],
    };
    return stepFields[Step].every((field) => {
      return watch(field) && !methods.formState.errors[field];
    });
  };
  const NextStep = async () => {
    // current step fields validation
    let stepFields = []
    if (Step === 1) stepFields = ["pancardimage", "panNumber"]
    if (Step === 2) stepFields = ["businessName", "businessEmail", "businessPhone"]
    if (Step === 3) stepFields = ["bankAccountNumber", "ifscCode"]
    const valid = await trigger(stepFields);
    if (valid) setStep((prev) => Math.min(prev + 1, 3))
  }
  const prevStep = async () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data) => {
    const formdata = new FormData()
    formdata.append('panNumber', data.panNumber)
    formdata.append("businessName", data.businessName)
    formdata.append("businessEmail", data.businessEmail)
    formdata.append("businessPhone", data.businessPhone)
    formdata.append("bankAccountNumber", data.bankAccountNumber)
    formdata.append("ifscCode", data.ifscCode)
    formdata.append("pancardimage", data.pancardimage[0])
    // for (let pair of formdata.entries()) {
    //   console.log(pair[0] + "" + pair[1])
    // }
    try {
      setLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/organizer/onboarding`, formdata, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      if (response.data) {
        toast.success(response?.data?.message)
        dispatch(Setuser({...user,hasOrganizerAccount:true}))
        navigate("/organizer/pending")
      }
    } catch (error) {
      console.error("failed to onboarding organizer", error)
      toast.error(error?.response?.data?.message || "Internal server error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='flex flex-col h-full justify-center  p-2  sm:p-5 gap-8  items-center'>
      <div className='flex flex-col gap-28 xl:flex-row items-center'>
        {/* left side progress steps */}
        {/*Small Screen Horizontal */}
        <div className="flex lg:hidden w-full justify-between border-b">
          {steps.map((title, index) => {
            const stepNumber = index + 1;
            const isActive = Step === stepNumber;
            return (
              <div
                key={index}
                className="flex flex-col items-center flex-1 pb-3 relative"
              >
                <span className={`text-sm ${isActive ? "text-black font-semibold" : "text-gray-400"
                  }`}>
                  {String(stepNumber).padStart(2, "0")}
                </span>

                <span className={`text-xs text-center ${isActive ? "text-black font-medium" : "text-gray-400"
                  }`}>
                  {title}
                </span>

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                )}
              </div>
            );
          })}
        </div>
        {/* for desktop */}
        <div className='hidden lg:block relative  gap-5'>
          {/* Vertical Line */}
          <div className="absolute left-[-9px] top-1 bottom-0 w-[2px] bg-gray-300"></div>
          <div className='flex  flex-col gap-8'>
            {steps.map((title, index) => {
              const stepNumber = index + 1;
              const isActive = Step === stepNumber;
              const isCompleted = Step > stepNumber;
              return (
                <div key={index} className="relative flex items-start gap-4">
                  {/* Active Indicator Bar */}
                  <div
                    className={`absolute -left-[10px] top-1 w-[4px] h-6 rounded-full transition-all duration-300 ${isActive ? "bg-black" : "bg-transparent"
                      }`}
                  />
                  <span
                    className={`text-sm ${isActive
                      ? "font-semibold text-black"
                      : isCompleted
                        ? "text-black/70"
                        : "text-gray-400"
                      }`}
                  >
                    {String(stepNumber).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm ${isActive
                      ? "font-semibold text-black"
                      : isCompleted
                        ? "text-black/70"
                        : "text-gray-400"
                      }`}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* right side */}
        <div className='flex w-full lg:w-[800px] flex-col gap-2'>
          <div className='flex flex-col gap-5'>
            <h2 className='text-[2rem] font-[500]'>Set up your CityVibe account</h2>
            <div className='w-[100px] h-[1px] bg-gray-300'></div>
            <p className='text-[1.5rem] font-[400]'>
              {Step === 1 ? "Pan Details" : Step === 2 ? "Business Details" : Step === 3 ? "Bank Details" : ""} </p>
          </div>
          {/* form */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {Step === 1 && (
                <PanDetails />
              )}
              {
                Step === 2 && (
                  <BusinessDetails />
                )
              }
              {
                Step === 3 && (
                  <BankDetails />
                )
              }
              <div className='mt-4 flex justify-between'>
                {
                  Step > 1 && <button onClick={prevStep} type='button' className="rounded-xl px-5 border text-sm py-3 transition-all duration-300 bg-gray-200 text-black hover:bg-gray-300  cursor-pointer">
                    Back
                  </button>
                }
                {
                  Step < 3 && <button onClick={NextStep} disabled={!isStepValid() || loading} type='button' className={`rounded-xl px-5 border text-sm py-3 transition-all duration-300 ${isStepValid() ? "bg-black text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>Continue</button>
                }
                {
                  Step === 3 && <button type='submit' disabled={!isStepValid() || loading} className={`rounded-xl px-5 border text-sm py-3 transition-all duration-300 ${isStepValid() && !loading ? "bg-black text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={16} />
                        Submitting...
                      </span>
                    ) : (
                      "Submit"
                    )}
                  </button>
                }
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div >

  )
}

export default OnBoardingForm