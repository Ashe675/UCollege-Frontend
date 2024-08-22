import { getCertificated } from "@/api/student/StudentApi";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import {
  IconCirclePlusFilled,
  IconCircleXFilled,
  IconFileTypePdf,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function StudentEnroll() {
  const setTitle = useAppStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Matricula");
  }, [setTitle]);

  const [buttonDeactive, setButtonDeactive] = useState(false);
  const toastId = useRef<null | number | string>(null);

  // Función para descargar el archivo CSV
  function downloadPDF(data: Blob, filename: string) {
    const blob = new Blob([data], { type: "application/pdf" });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }

  async function handleGetChargeAcademic() {
    try {
      toastId.current = toast.loading("Descargando archivo...");
      setButtonDeactive(true);
      const data = await getCertificated();
      downloadPDF(data, `Certificado_Academico`);
      toast.update(toastId.current!, {
        render: "¡Archivo descargado correctamente!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setButtonDeactive(false);
    } catch (error) {
      toast.update(toastId.current!, {
        render: "No tiene clases matriculadas.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setButtonDeactive(false);
    }
  }

  return (
    <div className=" px-2 md:px-6 pt-8">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to={`/myspace/${PrivateRoutes.STUDENT_ENROLL_ADD_CLASS}`}
          className=" p-3 bg-white shadow-md rounded-md flex gap-2 justify-between items-center transition-all  hover:scale-105 cursor-pointer"
        >
          <h2 className=" text-gray-600 font-bold">Adicionar Asignatura</h2>
          <IconCirclePlusFilled className=" text-emerald-500" size="35px" />
        </Link>
        <Link
          to={`/myspace/${PrivateRoutes.STUDENT_ENROLL_CANCEL_CLASS}`}
          className="p-3 bg-white shadow-md rounded-md flex gap-2 justify-between items-center transition-all  hover:scale-105 cursor-pointer"
        >
          <h2 className=" text-slate-600 font-bold">Cancelar Asignatura</h2>
          <IconCircleXFilled className=" text-rose-500" size="35px" />
        </Link>
        <button
          onClick={handleGetChargeAcademic}
          className=" bg-rose-500 w-full h-full p-5 shadow-md  rounded-md hover:scale-105 transition-all cursor-pointer text-white flex justify-center items-center disabled:bg-slate-500 disabled:scale-100 disabled:cursor-default uppercase font-semibold gap-x-1"
          disabled={buttonDeactive}
        >
          Descargar Certificado
          <IconFileTypePdf stroke={2} className={``} />
        </button>
      </div>
    </div>
  );
}
