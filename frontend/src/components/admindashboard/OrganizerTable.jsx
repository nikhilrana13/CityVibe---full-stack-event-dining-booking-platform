import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"
import OrganizerSkeleton from '../../components/admindashboard/OrganizerSkeleton';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { Loader2 } from "lucide-react";


const OrganizerTable = () => {
  const [organizers, setOrganizers] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [page, setPage] = useState(1)
  const [actionLoading, setActionLoading] = useState({
    id: null,
    type: null,
  })

  const fetchOrganizers = async () => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/organizers?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      )
      if (res.data) {
        setOrganizers(res?.data?.data.organizers || [])
        setPagination(res?.data?.data?.pagination)
      }
    } catch (err) {
      console.error("Failed to fetch organizers", err)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchOrganizers()
  }, [page])


  const handleVerifyOrganizer = async (id, status) => {
    try {
      setActionLoading({ id: id, type: status })
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/organizer/verify`,
        {
          organizerId: id,
          status: status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`
          }
        }
      )
      if (response.data) {
        toast.success(response?.data?.message)
        fetchOrganizers()
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Action failed")
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
          loading ? (
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
                    {org.isApproved ? (
                      <span className="text-green-600 font-medium">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex justify-end  gap-2">
                    {!org.isApproved && (
                      <>
                        <button
                          disabled={actionLoading.id === org._id}
                          onClick={() => handleVerifyOrganizer(org._id, "approved")}
                          className="px-3 py-1 bg-green-600 text-white rounded-md flex items-center gap-2"
                        >
                          {
                            actionLoading.id === org._id && actionLoading.type === "approved"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : "Approve"
                          }
                        </button>
                        <button
                          disabled={actionLoading.id === org._id}
                          onClick={() => handleVerifyOrganizer(org._id, "rejected")}
                          className="px-3 py-1 bg-red-600 text-white rounded-md flex items-center gap-2"
                        >
                          {
                            actionLoading.id === org._id && actionLoading.type === "rejected"
                              ? <Loader2 className="w-4 h-4 animate-spin" />
                              : "Reject"
                          }
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
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
        !loading && (
          pagination?.totalPages > 1 && (
            <div className="w-full bg-[#f8f9fc] dark:bg-[#101322] border-t-[#cfd3e7] dark:border-t-[#2a2d3d] py-4 px-6 items-center  border-t flex justify-between">
              <div className='flex items-center gap-2'>
                <span className="text-[#747474] text-[0.9rem] sm:text-[0.8rem] font-[600]">
                  Showing {start || "NA"}-{end || "NA"} of{" "}
                  {pagination?.totalorganizers || 0}  Organizers
                </span>
              </div>
              {/* page button */}
              <div>
                <Pagination className="flex gap-2">
                  <PaginationContent>
                    <PaginationItem
                      className={`${page === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                        }  `}
                    >
                      <PaginationPrevious
                        onClick={() => {
                          if (page > 1) {
                            setPage((prev) => prev - 1);
                          }
                        }}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink className="p-3">
                        {pagination?.currentPage} of {pagination?.totalPages}
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem
                      className={`${page === pagination.totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : " cursor-pointer"
                        }  `}
                    >
                      <PaginationNext
                        onClick={() => {
                          if (page < pagination?.totalPages) {
                            return setPage((prev) => prev + 1);
                          }
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          )
        )
      }
    </div >
  )

}

export default OrganizerTable