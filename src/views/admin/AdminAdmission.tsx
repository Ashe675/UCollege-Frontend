import GetNotesSection from "@/components/admin/GetNotesSection";
import UploadNotesSection from "../../components/admin/UploadNotesSection";
import SendEmailSection from "@/components/admin/SendEmailSection";
import { ToastContainer } from "react-toastify";


export default function AdminAdmission() {
  return (
    <div className=" bg-secondary min-h-screen p-2 flex items-center">
      <div className=" container bg-white mx-auto p-5 h-full space-y-8 rounded-md">
        <h1 className=" text-2xl sm:text-3xl font-black text-slate-800 text-center mb-6">
          ¡Bienvenido Administrador!
        </h1>
        <GetNotesSection />
        <UploadNotesSection />
        <SendEmailSection />
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </div>
  );
}
