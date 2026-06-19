const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-6">
                
                <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#6a4dff] animate-bounce"></span>
                    <span
                        className="h-3 w-3 rounded-full bg-[#8b5cf6] animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                    ></span>
                    <span
                        className="h-3 w-3 rounded-full bg-[#6a4dff] animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                    ></span>
                </div>

                <div className="text-center">
                    <h2 className="font-semibold text-lg text-gray-900">
                        CityVibe
                    </h2>
                    <p className="text-sm text-gray-500">
                        Preparing your organizer dashboard...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FullPageLoader