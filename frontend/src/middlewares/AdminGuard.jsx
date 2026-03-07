import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const AdminGuard = () => {
    const token = localStorage.getItem("adminToken")
 if (!token) {
    return <Navigate to="/cityvibe-admin-panel/login" replace />
  }

  return <Outlet />
}

export default AdminGuard