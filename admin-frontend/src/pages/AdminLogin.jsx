import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { FiEyeOff } from "react-icons/fi"
import { BsEye } from "react-icons/bs"
import ButtonLoader from "@/components/common/ButtonLoader"
import { toast } from "react-toastify"
import { useLoginAdminMutation } from "@/redux/api/AuthApi"
import { useDispatch } from "react-redux"
import { SetUser } from "@/redux/AuthSlice"

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [LoginAdmin, { isLoading }] = useLoginAdminMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        // console.log("Admin login data:",data)
        try {
            const response = await LoginAdmin(data).unwrap()
            toast.success(response?.message)
            const admin = response?.data?.admin
            const token = response?.data?.token
            dispatch(SetUser(admin))
            localStorage.setItem("adminToken", token)
            navigate("/admin/dashboard")
        } catch (error) {
            toast.error(error?.data?.message || "Internal server error")
            console.error("failed to login admin", error)
        } 
    }

    return (
        <div className="min-h-screen bg-[#F7F7F8] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* LOGO */}
                <div className="text-center mb-8">
                    <h1 className="text-[34px] font-black tracking-tight">
                        CITYVIBE
                    </h1>
                    <p className="text-xs tracking-[0.35em] text-gray-500 mt-1">
                        ADMIN PANEL
                    </p>
                </div>
                {/* LOGIN CARD */}
                <div className="bg-white border shadow-lg rounded-2xl p-8">
                    <h2 className="text-xl font-semibold mb-6 text-center">
                        Admin Login
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium">
                                Admin Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="w-full border mt-1 px-3 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm font-medium">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full border mt-1 px-3 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black pr-10"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters required"
                                        }
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-4 text-gray-500"
                                >

                                    {showPassword ? <FiEyeOff size={18} /> : <BsEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        {/* BUTTON */}
                        <button
                           type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition "
                        >
                            {isLoading ? (
                                <>
                                    <ButtonLoader />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
                {/* FOOTER */}
                <p className="text-center text-xs text-gray-400 mt-6">
                    CityVibe Admin Portal
                </p>
            </div>
        </div>

    )
}

export default AdminLogin