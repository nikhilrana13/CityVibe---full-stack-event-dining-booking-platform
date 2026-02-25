import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

export const useRestaurantForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id

    const [loading, setLoading] = useState(false)

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            location: "",
            city: "",
            address: "",
            cuisine: [],
            averagePrice: 100,
            openingTime: "",
            closingTime: "",
            availablefacility: [],
            contactnumbers: [""],
            images: [],
            slotInterval: 15,
            lunchStart: "",
            lunchEnd: "",
            dinnerStart: "",
            dinnerEnd: "",
        }
    })

    const { reset } = methods
    // Fetch restaurant if edit
    useEffect(() => {
        if (!isEdit) return

        const fetchRestaurant = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/dining/restaurant/details/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                reset(res.data.data.restaurant)
            } catch (err) {
                toast.error("Failed to load restaurant")
            }
        }

        fetchRestaurant()
    }, [id, isEdit, reset])

    //  Submit handler
    const onSubmit = async (data) => {
        const formdata = new FormData()
        Object.keys(data).forEach((key) => {
            if (key === "cuisine" || key === "availablefacility" || key === "contactnumbers") {
                formdata.append(key, JSON.stringify(data[key]))
            } else if (key === "images") {
                const existingImages = []
                const newImages = []
                data.images?.forEach((img) => {
                    if (typeof img === "string") {
                        existingImages.push(img)
                    } else {
                        newImages.push(img)
                    }
                })
                // send existing separately
                if (isEdit) {
                    formdata.append("existingImages", JSON.stringify(existingImages))
                }
                // send only new files
                newImages.forEach((file) => {
                    formdata.append("images", file)
                })
            } else {
                formdata.append(key, data[key])
            }
        })

        try {
            setLoading(true)
            const url = isEdit
                ? `/api/dining/restaurant/update/${id}`
                : `/api/dining/restaurant/create`
            const method = isEdit ? "put" : "post"
            const res = await axios({
                method,
                url: `${import.meta.env.VITE_BACKEND_URL}${url}`,
                data: formdata,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            toast.success(res.data.message)
            navigate("/organizer/manage-dining")
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    return {
        methods,
        loading,
        onSubmit,
        isEdit
    }
} 
