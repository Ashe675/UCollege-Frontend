import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { Button } from '@mui/material';
import { IconCirclePlusFilled, IconEye } from '@tabler/icons-react';
import { CreateRequestModal } from '../../../components/solicitud/ModalCrearSolicitud';
import { useQuery } from '@tanstack/react-query';
import api from "@/lib/axios";
import { Cancelacion, CambioCentro, CambioCarrera, PagoReposicion, CancelacionExcepcional } from '@/types/solicitud';
import { Modal } from "flowbite-react";

type Solicitud = Cancelacion | CambioCentro | CambioCarrera | PagoReposicion | CancelacionExcepcional;

const fetchSolicitudes = async (): Promise<Solicitud[]> => {
  const endpoints = [
    '/solicitudes/cancelaciones',
    '/solicitudes/centros',
    '/solicitudes/carreras'
  ];

  const results = await Promise.allSettled(
    endpoints.map(endpoint => 
      api.get(endpoint)
        .then(res => res.data)
        .catch(error => {
          console.log(`Error fetching ${endpoint}:`, error);
          return [];
        })
    )
  );

  console.log('results', results);

  return results.flatMap((result, index) => 
    result.status === 'fulfilled' ? result.value : []
  );
};

const SolicitudCard: React.FC<{ solicitud: Solicitud }> = ({ solicitud }) => {
  const getEstadoColor = (estado: string) => {
    switch (estado.toUpperCase()) {
      case 'APROBADA':
        return 'text-green-600 bg-green-100';
      case 'PENDIENTE':
        return 'text-yellow-600 bg-yellow-100';
      case 'RECHAZADA':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <h3 className="font-bold text-lg mb-2">{solicitud.motivo}</h3>
      <p className="text-gray-600 mb-2">Justificación: {solicitud.motivo}</p>
      <p className={`inline-block px-2 py-1 rounded-full ${getEstadoColor(solicitud.active.toString() || 'PENDIENTE')}`}>
        {solicitud.active || 'PENDIENTE'}
      </p>
    </div>
  );
};

export default function ApplicationView() {
  const user = useUserStore((state) => state.user);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);

  const { data: solicitudes, isLoading, isError } = useQuery({
    queryKey: ['solicitudes', user.id],
    queryFn: fetchSolicitudes,
    enabled: openListModal,
  });

  return (
    <div className='px-2 md:px-6 pt-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        <Button 
          onClick={() => setOpenCreateModal(true)} 
          className='p-3 bg-white shadow-md rounded-md flex gap-2 justify-between items-center transition-all hover:scale-105 cursor-pointer'
        >
          <h2 className='text-gray-600 font-bold'>Generar Nueva Solicitud</h2>
          <IconCirclePlusFilled className='text-emerald-500' size='35px' />
        </Button>
        <Button 
          onClick={() => setOpenListModal(true)} 
          className='p-3 bg-white shadow-md rounded-md flex gap-2 justify-between items-center transition-all hover:scale-105 cursor-pointer'
        >
          <h2 className='text-slate-600 font-bold'>Ver Solicitudes Realizadas</h2>
          <IconEye className='text-blue-500' size='35px' />
        </Button>
      </div>

      <CreateRequestModal openModal={openCreateModal} setOpenModal={setOpenCreateModal} userId={user.id} />

      <Modal
        show={openListModal}
        onClose={() => setOpenListModal(false)}
        size="xl"
      >
        <Modal.Header>Mis Solicitudes</Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <p>Cargando solicitudes...</p>
          ) : isError ? (
            <p>Error al cargar las solicitudes</p>
          ) : solicitudes && solicitudes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {solicitudes.map((solicitud: Solicitud, index: number) => (
                <SolicitudCard key={index} solicitud={solicitud} />
              ))}
            </div>
          ) : (
            <p>No se encontraron solicitudes o no tienes permisos para verlas.</p>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}