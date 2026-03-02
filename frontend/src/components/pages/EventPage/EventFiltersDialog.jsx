import React, { useEffect, useState } from 'react';

const EventFiltersDialog = ({ onClose,sortBy,setSortBy}) => {
    const [isVisible, setIsVisible] = useState(false)
    const [tempsort,setTempsort] = useState(sortBy)

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 10)
    }, [])
    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => {
            onClose()
        }, 500)
    }

    const handleApply = ()=>{
        setSortBy(tempsort)
        handleClose()
    }

    const options = [
        { label: "Relevant", value: "relevant" },
        { label: "Price : Low to High", value: "lowtohigh" },
        { label: "Price : High to Low", value: "hightolow" },
    ];
    return (
        <>
            <div className="fixed inset-0 z-50  flex items-center justify-center overflow-y-auto ">
                {/* BACKDROP */}
                <div className={`fixed inset-0 bg-black/40 backdrop-blur-xl transition-opacity duration-500 ease-out backdrop-saturate-150 ${isVisible ? "opacity-100" : "opacity-0"} `}
                    onClick={handleClose}
                />
                {/* dialog */}
                <div className={`relative z-[70]  max-w-2xl w-[80%] px-5 py-6 space-y-8 bg-white dark:bg-[#161a2d] rounded-2xl shadow-2xl overflow-y-auto transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible
                    ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}>
                    <h3 className='text-[1.2rem] font-[500]'>Filter By</h3>
                    <div className='flex w-full min-h-[60vh]'>
                        <div className='w-[20%]'>
                            <div className='px-5 bg-gradient-to-r from-[#E1DCF8] to-[#EEECF4] py-4'>
                                <span className='text-sm font-[500]'>Sort By</span>
                            </div>
                        </div>
                        <div className='w-[80%]  rounded-r-xl rounded-b-md bg-[#F1F1F2]'>
                            <div className="space-y-4 p-4">
                                {options.map((option) => (
                                    <label key={option.value} className="flex items-center gap-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="sortBy"
                                            value={option.value}
                                            checked={tempsort === option.value}
                                            onChange={(e)=>setTempsort(option.value)}
                                            className="w-5 h-5 border-2 cursor-pointer  accent-black"
                                        />
                                        <span className="text-black font-[600] text-[15px]">
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-around items-center mt-8">
                        <button onClick={()=>{setSortBy(""),setTempsort("")}} className="text-[1rem] font-[400] border-b-2 border-dotted border-black">
                            Clear filters
                        </button>
                        <button onClick={handleApply} className="bg-black text-white px-8 py-3 rounded-xl font-medium">
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div >

        </>
    );
}

export default EventFiltersDialog;
