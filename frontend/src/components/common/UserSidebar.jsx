import { GoArrowLeft } from "react-icons/go"
import { LiaClipboardListSolid } from "react-icons/lia"
import { BiLogOut } from "react-icons/bi"
import { LuGuitar, LuFileSpreadsheet, LuMessageCircleWarning } from "react-icons/lu"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import useLogout from "../../hooks/useLogout"
import nouserimg from "../../assets/user.png"


const UserSidebar = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.Auth.user)
  const { handleLogout } = useLogout()
  return (
    <>
    {/* overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed h-screen inset-0 bg-black/20 transition-opacity duration-500 ease-out backdrop-blur-md  z-[45]"
        />
      )}
      {/* sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-[450px] md:w-[600px] z-[50] bg-white shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${isOpen ? "translate-x-0" : "translate-x-full"} overflow-y-auto`}
      >
        <div className="w-full p-4 border-b flex items-center gap-4 text-[1.3rem] font-[500]">
          <GoArrowLeft onClick={onClose} className="cursor-pointer" />
          Profile
        </div>
        <div className="flex flex-col bg-[#F1F1F2] min-h-full">
          {/* profile */}
          <div className="p-5 flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <img
                src={user?.profilepic?.startsWith("http") ? user.profilepic : nouserimg}
                className="w-[64px] h-[64px] rounded-full object-cover border"
              />
              <div>
                <p className="text-[1.2rem] font-[500]">{user?.name}</p>
                <p className="text-gray-500 text-[0.8rem]">
                  {user?.email || user?.phonenumber}
                </p>
              </div>
            </div>
            <NavLink
              to="/bookings"
              className="bg-white flex gap-3 border items-center rounded-xl py-4 px-4"
            >
              <LiaClipboardListSolid size={22} />
              View all bookings
            </NavLink>
          </div>
          {/* more */}
          <div className="p-5 flex flex-col gap-8">
            <h3 className="font-[500]">More</h3>

            <div className="bg-white rounded-xl">
              <NavLink className="flex gap-3 border-b py-4 px-4">
                <LuMessageCircleWarning size={22} />
                Terms & Conditions
              </NavLink>
              <NavLink className="flex gap-3 py-4 px-4">
                <LuFileSpreadsheet size={22} />
                Privacy Policy
              </NavLink>
            </div>
          </div>
          <div className="p-5">
            <button
              onClick={() => {
                handleLogout()
                onClose()
              }}
              className="bg-white w-full flex gap-3 border items-center rounded-xl py-4 px-4"
            >
              <BiLogOut size={22} />
              Logout
            </button>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default UserSidebar