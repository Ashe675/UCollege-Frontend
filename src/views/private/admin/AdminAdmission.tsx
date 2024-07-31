import GetNotesSection from "@/components/admin/GetNotesSection";
import UploadNotesSection from "@/components/admin/UploadNotesSection";
import SendEmailSection from "@/components/admin/SendEmailSection";
import { ToastContainer } from "react-toastify";
import GetStudentsAdmitteds from "@/components/admin/GetStudentsAdmitteds";
import UploadStudentsAdmittedsSection from "@/components/admin/UploadStudentsAdmittedsSection";

export default function AdminAdmission() {
  return (
    <div className=" w-full  h-full bg-slate-100 p-5 text-slate-500 pt-10">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10">
        <GetNotesSection />
        <UploadNotesSection />
        <SendEmailSection />
        <GetStudentsAdmitteds />
        <UploadStudentsAdmittedsSection/>
      </div>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
