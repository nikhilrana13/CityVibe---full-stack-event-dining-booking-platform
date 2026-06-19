import { useGetOrganizersQuery, useVerifyOrganizerMutation } from "@/redux/api/OrganizerApi"
import React, { useState, useEffect } from "react"
import OrganizerSkeleton from "./OrganizerSkeleton"
import ButtonLoader from "../common/ButtonLoader"
import { toast } from "react-toastify"


const OrganizerTable = () => {
    const [page, setPage] = useState(1)
    const [actionLoading, setActionLoading] = useState({
        id: null,
        type: null,
    })
    const organizerQuery = useGetOrganizersQuery(page)
    const organizers = organizerQuery?.data?.data?.organizers ?? []
    const pagination = organizerQuery?.data?.data?.pagination ?? {}
    const [VerifyOrganizer] = useVerifyOrganizerMutation()

    const handleVerifyOrganizer = async (id, status) => {
        try {
            setActionLoading({ id: id, type: status })
            const response = await VerifyOrganizer({ id, status }).unwrap()
            toast.success(response?.message)
            // console.log("mutation response", response);

        } catch (error) {
            console.error("failed to verify organizer", error)
            toast.error(error?.data?.message || "Internal server error")
        } finally {
            setActionLoading({ id: null, type: null })
        }
    }

    const start = pagination?.currentPage ? (pagination.currentPage - 1) * pagination.limit + 1 : 0
    const end = Math.min(pagination?.currentPage * pagination?.limit, pagination?.totalorganizers)
    return (
        <div className="bg-white rounded-xl border overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">PAN</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 ">Actions</th>
                    </tr>
                </thead>
                {
                    organizerQuery?.isLoading ? (
                        <tbody>
                            <OrganizerSkeleton />
                        </tbody>
                    ) : organizers?.length > 0 ? (
                        <tbody>
                            {organizers?.map((org) => (
                                <tr key={org._id} className="border-t hover:bg-gray-50">
                                    <td className="p-4">{org?.user?.name}</td>
                                    <td className="p-4">{org?.user?.email}</td>
                                    <td className="p-4">{org?.panNumber}</td>
                                    <td className="p-4">
                                        {org.verificationStatus === "approved" && (
                                            <span className="text-green-600 font-medium">
                                                Approved
                                            </span>
                                        )}
                                        {org.verificationStatus === "pending" && (
                                            <span className="text-yellow-600 font-medium">
                                                Pending
                                            </span>
                                        )}
                                        {org.verificationStatus === "rejected" && (
                                            <span className="text-red-600 font-medium">
                                                Rejected
                                            </span>
                                        )}

                                    </td>
                                    <td className="p-4 flex justify-end  gap-2">
                                        {org.verificationStatus === "pending" && (
                                            <>
                                                <button
                                                    disabled={actionLoading.id === org._id}
                                                    onClick={() => handleVerifyOrganizer(org._id, "approved")}
                                                    className="px-3 py-1 bg-green-600 text-white rounded-md flex items-center justify-center gap-2"
                                                >
                                                    {
                                                        actionLoading.id === org._id && actionLoading.type === "approved"
                                                            ? <ButtonLoader />
                                                            : "Approve"
                                                    }
                                                </button>
                                                <button
                                                    disabled={actionLoading.id === org._id}
                                                    onClick={() => handleVerifyOrganizer(org._id, "rejected")}
                                                    className="px-3 py-1 bg-red-600 text-white rounded-md flex items-center justify-center gap-2"
                                                >
                                                    {
                                                        actionLoading.id === org._id && actionLoading.type === "rejected"
                                                            ? <ButtonLoader />
                                                            : "Reject"
                                                    }
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : organizerQuery?.isError ? (
                        <tbody>
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-red-500">
                                    Error loading organizers.Please try again
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan="8" className="text-center py-10 text-gray-500">
                                    No Organizers found
                                </td>
                            </tr>
                        </tbody>
                    )
                }
            </table >
            {/* Pagination */}
            {
                !organizerQuery?.isLoading && (
                    pagination?.totalPages > 1 && (
                        <div className="w-full bg-[#f8f9fc] dark:bg-[#101322] border-t-[#cfd3e7] dark:border-t-[#2a2d3d] py-4 px-6 items-center  border-t flex justify-between">
                            <div className='flex items-center gap-2'>
                                <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                                    Showing {start || "NA"}-{end || "NA"} of{" "}
                                    {pagination?.totalorganizers || 0}  Organizers
                                </span>
                            </div>
                            {/* page button */}
                            <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3">
                                {/* Prev */}
                                <button
                                    onClick={() => page > 1 && setPage((prev) => prev - 1)}
                                    disabled={page === 1}
                                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-xl font-medium bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6]text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300">
                                    ←
                                    <span className="hidden sm:inline ml-1">Prev</span>
                                </button>

                                {/* Page Info */}
                                <span className="text-[#3d4a3d] text-xs sm:text-sm font-semibold">
                                    {pagination?.currentPage} / {pagination?.totalPages}
                                </span>
                                {/* Next */}
                                <button
                                    onClick={() =>
                                        page < pagination?.totalPages && setPage((prev) => prev + 1)
                                    }
                                    disabled={page === pagination?.totalPages}
                                    className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-xl font-medium bg-gradient-to-r from-[#6a4dff] to-[#8b5cf6]text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-[1.02] disabled:opacity-40 disabled:hover:scale-100 transition-all duration-300"
                                >
                                    <span className="hidden sm:inline mr-1">Next</span>
                                    →
                                </button>

                            </div>

                        </div>
                    )
                )
            }
        </div >
    )

}

export default OrganizerTable