import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useCreateRestaurantMutation, useGetRestaurantDetailsQuery, useUpdateRestaurantMutation } from "@/redux/api/DiningApi"
import { toast } from "react-toastify"

export const useRestaurantForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = !!id
     const {data, isLoading: isRestaurantLoading,} = useGetRestaurantDetailsQuery(id,{
        skip: !isEdit
    })
    const [createRestaurant,{ isLoading: isCreating }] = useCreateRestaurantMutation();
    const [ updateRestaurant, { isLoading: isUpdating }] = useUpdateRestaurantMutation();
    const loading = isRestaurantLoading ||  isCreating || isUpdating
   
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
        if(data?.data?.restaurant){
            reset(data?.data?.restaurant)
        }
    }, [data,reset])
    
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
        const response = isEdit ? await updateRestaurant({id,formdata,}).unwrap() : await createRestaurant(formdata).unwrap();
        toast.success(response.message);
        navigate("/organizer/manage-dining");
        } catch (error) {
           toast.error( error?.data?.message || "Something went wrong");
        } 
    }
    return {
        methods,
        loading,
        onSubmit,
        isEdit
    }
} 
