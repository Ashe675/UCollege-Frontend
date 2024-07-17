import AuthNavbar from "@/components/auth/AuthNavbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


export default function AuthLayout() {
  return (
    <>
    <div className={`h-full bg-secondary w-full`}></div>
    <div className="bg-secondary min-h-screen">
      <AuthNavbar />
      <Outlet />
    </div>
    
    <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
  </>
  )
}
