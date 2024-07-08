import api from "@/lib/axios";
import { IconDownload } from "@tabler/icons-react";
import { isAxiosError } from "axios";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function GetNotesSection() {
  const toastId = useRef<null | number | string>(null)
  const [buttonDeactive, setButtonDeactive] = useState(false)

  // Función para obtener el archivo CSV desde el backend
  async function fetchCSV() {
    const url = "/admission/generate-csv";
    const response = await api.get(url, { responseType: "blob" });
    return response.data;
  }

  // Función para descargar el archivo CSV
  function downloadCSV(data: Blob, filename: string) {
    const blob = new Blob([data], { type: "text/csv" });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }

  // Función principal para manejar la obtención y descarga del archivo CSV
  async function handleGetCSVGrades() {
    try {
      toastId.current = toast.loading("Descargando archivo...", {
        position: "bottom-right",
      });
      setButtonDeactive(true)
      const data = await fetchCSV();
      downloadCSV(data, "notas.csv");
      toast.update(toastId.current!, {
        render: "¡Archivo descargado correctamente!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setButtonDeactive(false)
    } catch (error) {
      handleError(error);
    }
  }

  // Función para manejar errores
  function handleError(error: unknown) {
    if (isAxiosError(error) && error.response) {
      toast.update(toastId.current!, {
        render: "Error al descagar el archivo",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme : 'colored'
      });
    } else {
      toast.update(toastId.current!, {
        render: "Error al descagar el archivo, el servidor no responde",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme : 'colored'
      });
    }
    setButtonDeactive(false)
  }

  return (
    <section className="w-full md:max-w-4xl shadow-md p-3 bg-white mx-auto space-y-4">
      <h2 className="text-xl sm:text-2xl text-slate-700 text-center font-bold">
        Obtener Notas de los Examenes de Admisión
      </h2>
      <button
        onClick={handleGetCSVGrades}
        disabled = {buttonDeactive}
        className={`w-full md:max-w-sm bg-emerald-500 p-2 uppercase font-semibold text-white mx-auto hover:bg-emerald-600 flex justify-center gap-4 rounded-sm ${buttonDeactive && ' bg-gray-200 hover:bg-gray-200' }`}
      >
        Descargar CSV
        <IconDownload stroke={2} />
      </button>
    </section>
  );
}
