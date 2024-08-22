import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { IconDeviceFloppy, IconCancel } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import {
  Cancelacion,
  CambioCentro,
  CambioCarrera,
  PagoReposicion,
  CancelacionExcepcional,
} from '@/types/solicitud';
import {
  createExceptApp,
  createRepPaymentApp,
  createChangeCarerrApp,
  createChangeCenterApp,
  createCancelApp
} from "@/api/solicitud/SolicitudApi";
import Spinner from '@/components/spinner/Spinner';
import ErrorMessage from '@/components/ErrorMessage';

type CreateRequestModal = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
};

const type_solicitudes = [
  'Cancelacion',
  'Cambio de centro',
  'Cambio de carrera',
  'Pago de reposicion',
  'Cancelacion Excepcional'
] as const;

type SolicitudType = typeof type_solicitudes[number];

export function CreateRequestModal({
  openModal,
  setOpenModal,
  userId
}: CreateRequestModal) {
  const [selectedRequest, setSelectedRequest] = useState<SolicitudType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [reason, setReason] = useState<string>("");

  const handleSuccess = (message: string) => {
    toast.success(message);
    setError(null);
    setSelectedRequest(null);
  };

  const handleError = (error: unknown) => {
    toast.error(error instanceof Error ? error.message : "Error desconocido");
    setError("Error al procesar la solicitud.");
  };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const handleCreateSolicitud = async () => {
    if (!reason || !file || !selectedRequest) {
      toast.error("Debe proporcionar una justificación, un archivo y seleccionar un tipo de solicitud.");
      setError("Debe proporcionar una justificación, un archivo y seleccionar un tipo de solicitud.");
      return;
    }

    setLoading(true);
    try {
      let result;
      const commonPayload = {
        justificacion: reason,
        archivo: file,
        userId,
        active: true,
        motivo: selectedRequest
      };

      switch (selectedRequest) {
        case 'Cancelacion Excepcional':
          result = await createExceptApp({ ...commonPayload, sectionIds: 0 } as CancelacionExcepcional);
          break;
        case 'Pago de reposicion':
          result = await createRepPaymentApp({ ...commonPayload, montoPago: 0, solicitudId: 0 } as PagoReposicion);
          break;
        case 'Cambio de carrera':
          result = await createChangeCarerrApp({ ...commonPayload, nuevaCarreraId: 0, solicitudId: 0, teacherId: 0 } as CambioCarrera);
          break;
        case 'Cambio de centro':
          result = await createChangeCenterApp({ ...commonPayload, centroDestinoId: 0, solicitudId: 0, teacherId: 0 } as CambioCentro);
          break;
        case 'Cancelacion':
          result = await createCancelApp({ ...commonPayload, solicitudId: 0, teacherId: 0 } as Cancelacion);
          break;
        default:
          throw new Error("Tipo de solicitud desconocido.");
      }
      if (result.success) {
        handleSuccess(`Solicitud de ${selectedRequest} creada con éxito.`);
      } else {
        handleError(result.error);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSolicitud = (solicitud: SolicitudType) => {
    setSelectedRequest(solicitud);
  };

  if (loading) {
    return (
      <div className="bg-slate-200 border flex flex-col justify-start max-h-64 border-dashed space-y-3 border-slate-400 rounded-sm p-3 relative order-1 lg:order-2">
        <Spinner />
      </div>
    );
  }

  return (
    <Modal
      show={openModal}
      size='md'
      onClose={() => setOpenModal(false)}
      className={openModal ? 'animate-grow' : 'animate-shrink'}
      popup
    >
      <Modal.Header className={`bg-white`}>
        <div className='flex items-center space-x-2'>
          {selectedRequest && (
            <IconButton onClick={() => setSelectedRequest(null)}>
              <ChevronLeftIcon className='h-5 w-5 text-gray-600' />
            </IconButton>
          )}
          <h2 className='text-lg font-bold text-gray-600'>
            {selectedRequest ? selectedRequest : 'Generar Nueva Solicitud'}
          </h2>
        </div>
      </Modal.Header>
      <Modal.Body className={`bg-white rounded-sm`}>
        {selectedRequest ? (
          <div className="flex flex-col gap-3 w-full">
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
                setSelectedRequest(null);
                setError(null);
              }}
            >
              <span>Cancelar</span>
              <IconCancel stroke={2} />
            </button>
          </div>
        ) : (
          <>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400' />
              <h3 className='mb-5 text-lg font-normal text-gray-500'>
                ¿Qué tipo de solicitud deseas realizar?
              </h3>
              <div className='flex flex-col justify-center gap-4'>
                {type_solicitudes.map((solicitud, index) => (
                  <Button
                    key={index}
                    color='primary'
                    onClick={() => handleSolicitud(solicitud)}
                  >
                    {solicitud}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Modal.Body>
    </Modal>
  );
}