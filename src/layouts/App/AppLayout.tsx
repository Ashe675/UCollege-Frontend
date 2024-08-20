import { AppSidebar } from "@/components/App/AppSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserAvatar } from "./UserAvatar";
import { IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useAppStore } from "@/stores/appStore";
import { PrivateRoutes } from "@/data/routes";
import { useSocketStore } from "@/stores/socketStore";

export default function AppLayout() {
  const user = useUserStore((state) => state.user);
  const title = useAppStore((state) => state.title);
  const navigate = useNavigate();
  const location = useLocation();

  const {connect, disconnect, socket } = useSocketStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect, user]);

  useEffect(() => {
    if(socket && user.id){
      socket.on("connect", () =>{
        socket.emit("connectedUser", user.id.toString())
      })
      socket.on("disconnect", () =>{
        socket.emit("disconnectedUser", user.id.toString())
      })
      
      return () => {
        socket.off("connect", () => {});
        socket.off("disconnect", () => {});
      }
    }
  }, [socket, user.id])

  const [show, setShow] = useState(true);

  const handleClickAvatar = () => {
    navigate(PrivateRoutes.PROFILE + `/${user.id}`);
  };

  const handleClick = () => setShow(!show);

  return (
    <>
      <div className=" flex min-h-screen overflow-hidden ">
        <AppSidebar
          show={show}
          setShow={setShow}
          role={user.role.name}
          className="h-screen w-full max-w-[270px] bg-slate-100 shadow-md z-20"
        />
        <div
          className={` flex flex-col w-full min-h-screen  relative  transition-all duration-500 ease-in-out ${
            location.pathname.includes("perfil") ? "bg-primaryBlue" : ""
          } ${show ? "sm:ml-[270px]" : "sm:ml-0"}`}
        >
          <div
            className={` w-full gap-1 flex p-4 ${
              location.pathname.includes("perfil")
                ? "bg-transparent z-5"
                : "bg-primaryBlue"
            } text-white font-semibold text-[16px] justify-between items-center`}
          >
            <div className=" space-x-4 flex items-center relative">
              <button
                onClick={handleClick}
                className={` bg-secondary p-1 rounded-md shadow-sm left-0 absolute  text-white z-30 ${
                  show ? "max-sm:fixed max-sm:left-5" : ""
                }`}
              >
                <IconMenu2 stroke={2} />
              </button>
              <span className=" pl-8 uppercase">{title}</span>
            </div>
            <div
              className=" flex gap-2 items-center cursor-pointer z-10"
              onClick={handleClickAvatar}
            >
              <UserAvatar />
              {user.person.firstName} {user.person.lastName}
            </div>
          </div>
          <div className=" h-full w-full  bg-slate-100">
            <Outlet />
          </div>
        </div>
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </div>
    </>
  );
}
