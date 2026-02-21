import React from 'react'
import { Button } from '../ui/button'
import { NavLink } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Register as a creator',
    description:
      'Onboard within minutes with just your PAN card and bank details.',
  },
  {
    number: '02',
    title: 'Craft your first event',
    description: 'Tell us all about your event, set up custom shows and price tickets just the way you want.',
  },
  {
    number: '03',
    title: 'Publish on CityVibe for free',
    description: 'Submit your event and go live within 24 hours! Commissions will only be charged on tickets sold.',
  },
]

const OnBoarding = () => {
  return (
    <div className='mx-auto max-w-[992px] h-full flex  items-center px-3 sm:p-[30px] md:p-0'>
      <div className='flex flex-col mx-auto lg:flex-row p-2 sm:p-5 gap-8 justify-center items-center'>
        <p className='text-[2rem] hidden md:block font-[400] mb-6'>
          Reach the right audience,<br />
          earn as you grow
        </p>

        <div className='flex flex-col gap-4'>
          {steps.map((step) => (
            <div
              key={step.number}
              className='flex flex-col sm:flex-row gap-4 sm:gap-8 items-center sm:items-start text-center sm:text-left'
            >
              <span className='font-[400] text-[2rem] sm:text-[3.5rem] text-indigo-600'>
                {step.number}
              </span>
              <div className='flex flex-col'>
                <h3 className='font-[400] text-[1rem] sm:text-[1.5rem]'>{step.title}</h3>
                <p className='text-[0.8rem] sm:text-sm  leading-6 w-full md:w-[400px] text-gray-500'>
                  {step.description}
                </p>
              </div>

            </div>
          ))}
            <div className='flex justify-center mt-4'>
             <NavLink to="form" className="px-3 rounded-xl bg-black text-white py-2">Start your journey</NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OnBoarding