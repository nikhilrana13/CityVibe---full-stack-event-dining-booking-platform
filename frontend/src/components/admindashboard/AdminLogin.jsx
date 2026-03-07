import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    // API CALL READY FUNCTION
    const onSubmit = async (data) => {
        // console.log("Admin login data:",data)
        try {
            setLoading(true)
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/admin-login`, data)
            if (response.data) {
                toast.success(response?.data?.message)
                const admin = response?.data?.data?.admin
                const token = response?.data?.data?.token
                localStorage.setItem("adminToken", token)
                if (admin.role === "admin") {
                    navigate("/cityvibe-admin-panel/dashboard")
                } else {
                    toast.error("Unauthorized admin")
                    navigate("/cityvibe-admin-panel/login")
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Internal server error")
            console.error("failed to login admin", error)
        } finally {
            setLoading(false)
        }
    }
    // if admin already login redirect to dashboard
    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (token) {
            navigate("/cityvibe-admin-panel/dashboard")
        }
    }, [])

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

                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
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