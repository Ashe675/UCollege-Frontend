import AdmissionNav from "@/components/admission/AdmissionNav";
import "react-toastify/ReactToastify.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AdmissionLayout() {
  return (
    <>
      <div className={`h-full bg-primaryBlue absolute top-0 w-full -z-10`}></div>
      <div className=" ">
        <AdmissionNav />
        <Outlet />
      </div>
      <div className="absolute bottom-0 w-full -z-10 ">
        <img src="/wave.svg" />
        <div className=" h-52 sm:h-[300px] md:h-64 xl:h-10 bg-[#172B4D]"></div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
