const SidebarShimmer = () => {
    return (
        <aside className="w-full h-full bg-white border-r flex flex-col p-4">
            {/* Top status */}
            <div className="h-5 w-32 rounded bg-gray-200 animate-pulse mb-6" />

            {/* Menu items */}
            <div className="space-y-3">
                {[...Array(7)].map((_, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-md"
                    >
                        <div className="h-6 w-6 rounded bg-gray-200 animate-pulse" />
                        <div className="h-4 w-32 rounded bg-gray-200 animate-pulse" />
                    </div>
                ))}
            </div>

            {/* Logout */}
            <div className="mt-auto border-t pt-4">
                <div className="flex items-center justify-between p-3">
                    <div className="h-4 w-20 rounded bg-gray-200 animate-pulse" />
                    <div className="h-5 w-5 rounded bg-gray-200 animate-pulse" />
                </div>
            </div>
        </aside>
    );
};

export default SidebarShimmer;