import { useEffect, useState } from "react";
import { IconEdit, IconDeviceFloppy, IconCancel } from "@tabler/icons-react";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage";
import { useDropzone } from "react-dropzone";
import {
  Cancelacion,
  CambioCentro,
  CambioCarrera,
  PagoReposicion,
  CancelacionExcepcional,
} from "@/types/solicitud";
import {
  createExceptApp,
  createRepPaymentApp,
  createChangeCarerrApp,
  createChangeCenterApp,
  createCancelApp
} from "@/api/solicitud/SolicitudApi";

type AppsProps = {
  solicitud: Cancelacion | CambioCentro | CambioCarrera | PagoReposicion | CancelacionExcepcional;
};

export default function AppsComponent({ solicitud }: AppsProps) {
  const [canEdit, setCanEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [reason, setReason] = useState<string>("");

  const handleSuccess = (message: string) => {
    toast.success(message);
    setError(null);
    setCanEdit(false);
  };

  const handleError = (error: unknown) => {
    toast.error(error instanceof Error ? error.message : "Error desconocido");
    setError("Error al procesar la solicitud.");
    setCanEdit(false);
  };

  // Configuración del useDropzone
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]); // Suponiendo que solo se selecciona un archivo
    },
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const handleCreateSolicitud = async () => {
    if (!reason || !file) {
      toast.error("Debe proporcionar una justificación y un archivo.");
      setError("Debe proporcionar una justificación y un archivo.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if ('justificacion' in solicitud && 'sectionIds' in solicitud) {
        // Solicitud de cancelación excepcional
        result = await createExceptApp({ ...solicitud });
        if (result.success) {
          handleSuccess("Solicitud de cancelación excepcional creada con éxito.");
        } else {
          handleError(result.error);
        }
      } else if ('montoPago' in solicitud) {
        // Solicitud de reposición de pago
        result = await createRepPaymentApp({ ...solicitud });
        if (result.success) {
          handleSuccess("Solicitud de reposición de pago creada con éxito.");
        } else {
          handleError(result.error);
        }
      } else if ('nuevaCarreraId' in solicitud) {
        // Solicitud de cambio de carrera
        result = await createChangeCarerrApp({ ...solicitud });
        if (result.success) {
          handleSuccess("Solicitud de cambio de carrera creada con éxito.");
        } else {
          handleError(result.error);
        }
      } else if ('centroDestinoId' in solicitud) {
        // Solicitud de cambio de centro
        result = await createChangeCenterApp({ ...solicitud });
        if (result.success) {
          handleSuccess("Solicitud de cambio de centro creada con éxito.");
        } else {
          handleError(result.error);
        }
      } else if ('detalle' in solicitud) {
        // Solicitud de cancelación
        result = await createCancelApp({ ...solicitud });
        if (result.success) {
          handleSuccess("Solicitud de cancelación creada con éxito.");
        } else {
          handleError(result.error);
        }
      } else {
        throw new Error("Tipo de solicitud desconocido.");
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCanEdit(false);
  }, [solicitud]);

  const handleClickEdit = () => {
    setCanEdit(true);
  };

  if (loading) {
    return (
      <div className="bg-slate-200 border flex flex-col justify-start max-h-64 border-dashed space-y-3 border-slate-400 rounded-sm p-3 relative order-1 lg:order-2">
        <Spinner />
      </div>
    );
  }

  if (!solicitud) {
    return null;
  }

  return (
    <div className="bg-slate-200 border flex flex-col min-h-64 border-dashed space-y-3 border-slate-400 rounded-sm p-3 relative order-1 lg:order-2">
      <section
        className={`w-full max-w-md mx-auto rounded-sm shadow-sm p-2 relative ${
          solicitud.active ? "bg-white" : "bg-gray-300/90 text-white"
        }`}
      >
        <span
          className={`h-7 w-7 absolute rounded-full -right-2 -top-2 shadow-sm ${
            solicitud.active ? "bg-emerald-500" : "bg-gray-400"
          }`}
        ></span>
        <h2 className="font-bold text-2xl text-center">
          {solicitud.motivo}
        </h2>
        <div className="flex flex-col w-full gap-5 mt-8">
          <div
            className={`p-1 pl-3 font-semibold flex justify-between items-center ${
              solicitud.active ? "bg-sky-500" : "bg-gray-400"
            } text-white rounded-lg uppercase text-sm shadow-sm`}
          >
            Detalles:
            <span className="p-1 px-2 bg-white rounded-lg text-slate-500 shadow-inner">
              {solicitud.motivo}
            </span>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-3 w-full">
        {solicitud.active && !canEdit && (
          <button
            className="bg-orange-500 hover:bg-orange-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
            onClick={handleClickEdit}
          >
            <span>Editar</span>
            <IconEdit stroke={2} />
          </button>
        )}
        {canEdit && (
          <>
            <textarea
              placeholder="Proporcione una justificación"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="border p-2 rounded-md"
            />
            <div {...getRootProps()} className="border p-4 rounded-md cursor-pointer">
              <input {...getInputProps()} />
              {acceptedFiles.length > 0 ? (
                <p>{acceptedFiles[0].name}</p>
              ) : (
                <p>Arrastra y suelta un archivo aquí, o haz clic para seleccionar uno</p>
              )}
            </div>
            <button
              className="bg-emerald-500 hover:bg-emerald-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
              onClick={handleCreateSolicitud}
            >
              <span>Crear Solicitud</span>
              <IconDeviceFloppy stroke={2} />
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
              onClick={() => {
                setCanEdit(false);
                setError(null);
              }}
            >
              <span>Cancelar</span>
              <IconCancel stroke={2} />
            </button>
          </>
        )}
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}
