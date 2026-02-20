import { compose } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetchOrganizer = (shouldfetch = false) => {
    const [organizer, setOrganizer] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!shouldfetch) return
        const fetchOrganizer = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/organizer/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log("response", response.data)
                if (response.data) {
                    setOrganizer(response?.data?.data?.organizer)
                }
            } catch (error) {
                console.error("failed to fetch organizer", error)
                setOrganizer(null)
            } finally {
                setLoading(false)
            }
        }
        fetchOrganizer()
    }, [shouldfetch])

    return { organizer, loading }
}

export default useFetchOrganizer