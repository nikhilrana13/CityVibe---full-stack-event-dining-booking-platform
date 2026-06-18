import ScanSection from '@/components/verifytickets/ScanSection'
import React from 'react'


const VerifyTickets = () => {
  return (
    <div className='w-full'>
        <div className='flex px-3 py-4 flex-col gap-5'>
              {/* dashboard header */}
                    <div className="flex gap-8 md:items-center flex-col md:flex-row  md:justify-between">
                      <div className="flex flex-col">
                        <span className="text-[1.5rem]  font-bold text-black dark:text-white">
                          Ticket Verfication
                        </span>
                        <span className="text-sm text-gray-500 font-normal">
                            Scan or enter ticket code to verify entry.
                        </span>
                      </div>
                    </div>
                    {/* scan section */}
                    <ScanSection />
        </div>
    </div>
  )
}

export default VerifyTickets