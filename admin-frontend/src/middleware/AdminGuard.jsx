import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AdminGuard = () => {
    const token = localStorage.getItem("adminToken")
 if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default AdminGuard