import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, IconButton } from '@mui/material';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { IconDeviceFloppy, IconCancel } from "@tabler/icons-react";
import { toast } from "react-toastify";
import {
  ChangeCenter,
  ChangeCareer,
  RepoPayment,
  ExceptCancel,
} from '@/types/request';
import {
  createExceptApp,
  createRepPaymentApp,
  createChangeCarerrApp,
  createChangeCenterApp,
} from "@/api/solicitud/SolicitudApi";
import Spinner from '@/components/spinner/Spinner';
import ErrorMessage from '@/components/ErrorMessage';
import ModalCustom from '@/components/ModalCustom';

const type_solicitudes = [
  'Cambio de centro',
  'Cambio de carrera',
  'Pago de reposicion',
  'Cancelacion Excepcional'
] as const;

type SolicitudType = typeof type_solicitudes[number];

type CreateRequestFormValues = {
  reason: string;
  file: FileList;
}

export default function CreateRequestModal({
  openModal,
  setOpenModal,
  userId
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
}) {
  const [selectedRequest, setSelectedRequest] = useState<SolicitudType | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateRequestFormValues>();
  const [loading, setLoading] = useState(false);

  const handleSuccess = (message: string) => {
    toast.success(message);
    reset();
    setSelectedRequest(null);
  };

  const handleError = (error: unknown) => {
    toast.error(error instanceof Error ? error.message : "Error desconocido");
  };

  const handleCreateSolicitud = async (data: CreateRequestFormValues) => {
    const { reason, file } = data;
    if (!selectedRequest) {
      toast.error("Debe seleccionar un tipo de solicitud.");
      return;
    }

    setLoading(true);
    try {
      let result;
      const commonPayload = {
        justificacion: reason,
        archivo: file[0],
        userId,
        active: true,
        motivo: selectedRequest
      };

      switch (selectedRequest) {
        case 'Cancelacion Excepcional':
          result = await createExceptApp({ ...commonPayload, sectionIds: 0 } as ExceptCancel);
          break;
        case 'Pago de reposicion':
          result = await createRepPaymentApp({ ...commonPayload, montoPago: 0, solicitudId: 0 } as RepoPayment);
          break;
        case 'Cambio de carrera':
          result = await createChangeCarerrApp({ ...commonPayload, nuevaCarreraId: 0, solicitudId: 0, teacherId: 0 } as ChangeCareer);
          break;
        case 'Cambio de centro':
          result = await createChangeCenterApp({ ...commonPayload, centroDestinoId: 0, solicitudId: 0, teacherId: 0 } as ChangeCenter);
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
    reset();
  };

  if (loading) {
    return (
      <div className="bg-slate-200 border flex flex-col justify-start max-h-64 border-dashed space-y-3 border-slate-400 rounded-sm p-3 relative order-1 lg:order-2">
        <Spinner />
      </div>
    );
  }

  return (
    <ModalCustom
      show={openModal}
      setShow={setOpenModal}
      title={
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
      }
    >
      {selectedRequest ? (
        <form onSubmit={handleSubmit(handleCreateSolicitud)} className="flex flex-col gap-3 w-full">
          <div className="space-y-1 flex flex-col">
            <textarea
              placeholder="Proporcione una justificación"
              {...register("reason", {
                required: "La justificación es obligatoria",
              })}
              className="border p-2 rounded-md"
            />
            {errors.reason && <ErrorMessage>{errors.reason.message}</ErrorMessage>}
          </div>

          <div className="space-y-1 flex flex-col">
            <input
              type="file"
              {...register("file", {
                required: "Debe proporcionar un archivo",
              })}
              className="border p-2 rounded-md"
            />
            {errors.file && <ErrorMessage>{errors.file.message}</ErrorMessage>}
          </div>

          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
          >
            <span>Crear Solicitud</span>
            <IconDeviceFloppy stroke={2} />
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
            onClick={() => {
              setSelectedRequest(null);
              reset();
            }}
          >
            <span>Cancelar</span>
            <IconCancel stroke={2} />
          </button>
        </form>
      ) : (
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
      )}
    </ModalCustom>
  );
}
