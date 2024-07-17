import { AppSidebar } from "@/components/App/AppSidebar";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserAvatar } from "./UserAvatar";
import { IconMenu2 } from "@tabler/icons-react";
import {  useState } from "react";
import { useUserStore } from "@/stores/userStore";



export default function AppLayout() {
  const user = useUserStore(state => state.user)
  
  const [show, setShow] = useState(true);
  
  const handleClick = () => setShow(!show);
 

  
    return (
      <>
        <div className=" flex min-h-screen">
          <AppSidebar
            show={show}
            setShow={setShow}
            role={user.role.name}
            className="h-screen w-full max-w-[270px] bg-slate-100 shadow-md z-20"
          />
          <div
            className={` flex flex-col w-full relative  pb-5 transition-all duration-500 ease-in-out ${
              show ? "sm:ml-[270px]" : "sm:ml-0"
            }`}
          >
            
            <div className=" w-full flex p-5 text-white font-semibold text-lg justify-between items-center text-[17px]">
              <div className=" space-x-4 flex items-center relative">
                <button
                  onClick={handleClick}
                  className=" bg-secondary p-1 rounded-md shadow-sm left-0 absolute text-white z-30"
                >
                  <IconMenu2 stroke={2} />
                </button>
                <span className=" pl-8">INICIO</span>
              </div>
              <div className=" flex gap-2 items-center">
                <UserAvatar />
                {user.person.firstName} {user.person.lastName}
              </div>
            </div>
            <Outlet />
            <div className=" h-1/2 w-full bg-slate-200 absolute bottom-0 -z-10"></div>
          </div>
        </div>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
}
