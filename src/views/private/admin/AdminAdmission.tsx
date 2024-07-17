import GetNotesSection from "@/components/admin/GetNotesSection";
import UploadNotesSection from "@/components/admin/UploadNotesSection";
import SendEmailSection from "@/components/admin/SendEmailSection";
import { ToastContainer } from "react-toastify";
import GetStudentsAdmitteds from "@/components/admin/GetStudentsAdmitteds";

export default function AdminAdmission() {
  return (
    <div className=" p-4 flex items-center mt-10 h-full">
      <div className="  bg-secondary mx-auto shadow-md p-5 h-full lg:px-20  space-y-8 rounded-md w-full lg:w-4/5">
        <h1 className=" text-xl sm:text-3xl font-semibold text-white text-center mb-6">
          Admisiones
        </h1>
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
          <GetNotesSection />
          <UploadNotesSection />
          <SendEmailSection />
          <GetStudentsAdmitteds />
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
