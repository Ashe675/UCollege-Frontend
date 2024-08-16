import { getChargeAcademicExcel } from "@/api/coordinator/CoordinatorApi";
import { IconFileSpreadsheet } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function ChargeAcademicEXCELCard() {
  const [buttonDeactive, setButtonDeactive] = useState(false);
  const toastId = useRef<null | number | string>(null);

  // Función para descargar el archivo CSV
  function downloadPDF(data: Blob, filename: string) {
    const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
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
      const data = await getChargeAcademicExcel();
      downloadPDF(data, `Carga_Academica`);
      toast.update(toastId.current!, {
        render: "¡Archivo descargado correctamente!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setButtonDeactive(false);
    } catch (error) {
      toast.update(toastId.current!, {
        render: (error as Error).message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setButtonDeactive(false);
    }
  }

  return (
    <button
      onClick={handleGetChargeAcademic}
      disabled={buttonDeactive}
      className=" bg-emerald-500 w-full h-full p-5 shadow-md rounded-md hover:scale-105 transition-all cursor-pointer text-white flex justify-center items-center flex-col disabled:bg-slate-500 disabled:scale-100 disabled:cursor-default"
    >
      <IconFileSpreadsheet
        stroke={2}
        className={`size-[170px] xl:size-[200px] `}
      />
      <h2 className=" text-4xl font-black p-0 m-0">EXCEL</h2>
    </button>
  );
}
