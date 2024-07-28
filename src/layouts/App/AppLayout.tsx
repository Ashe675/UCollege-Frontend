import { AppSidebar } from "@/components/App/AppSidebar";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserAvatar } from "./UserAvatar";
import { IconMenu2 } from "@tabler/icons-react";
import {  useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useAppStore } from "@/stores/appStore";



export default function AppLayout() {
  const user = useUserStore(state => state.user)
  const title = useAppStore(state => state.title)

  const [show, setShow] = useState(true);
  
  const handleClick = () => setShow(!show);
 

  
    return (
      <>
        <div className=" flex min-h-screen overflow-hidden">
          <AppSidebar
            show={show}
            setShow={setShow}
            role={user.role.name}
            className="h-screen w-full max-w-[270px] bg-slate-100 shadow-md z-20"
          />
          <div
            className={` flex flex-col w-full relative overflow-auto max-sm:pb-5 transition-all duration-500 ease-in-out ${
              show ? "sm:ml-[270px]" : "sm:ml-0"
            }`}
          >
            
            <div className=" w-full flex p-4 text-white font-semibold text-[16px] justify-between items-center">
              <div className=" space-x-4 flex items-center relative">
                <button
                  onClick={handleClick}
                  className={` bg-secondary p-1 rounded-md shadow-sm left-0 absolute  text-white z-30 ${show ? 'max-sm:fixed max-sm:left-5' : ''}`}
                >
                  <IconMenu2 stroke={2} />
                </button>
                <span className=" pl-8 uppercase">{title}</span>
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
