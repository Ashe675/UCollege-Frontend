import React, { useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { Button } from '@mui/material';
import { IconCirclePlusFilled, IconEye } from '@tabler/icons-react';
import CreateRequestModal from '@/components/request/CreateRequest';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios'; 
import { ChangeCenter, ChangeCareer, RepoPayment, ExceptCancel} from '@/types/request';
import ModalCustom from '@/components/ModalCustom'; 
import Spinner from '@/components/spinner/Spinner';


type Solicitud = ChangeCenter |ChangeCareer | RepoPayment |ExceptCancel;

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
    queryFn: async () => {
      const endpoints = [
        `/solicitudes/cancelaciones/${user.id}`,
        `/solicitudes/centros/${user.id}`,
        `/solicitudes/carreras/${user.id}`
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

      return results.flatMap((result) =>
        result.status === 'fulfilled' ? result.value : []
      );
    },
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

      <CreateRequestModal
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        userId={user.id}
      />

      <ModalCustom
        show={openListModal}
        setShow={setOpenListModal}
        title="Mis Solicitudes"
      >
        {isLoading ? (
          <Spinner/>
        ) : isError ? (
          <p>Error al cargar las solicitudes</p>
        ) : solicitudes && solicitudes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {solicitudes.map((solicitud: Solicitud, index: number) => (
              <SolicitudCard key={index} solicitud={solicitud} />
            ))}
          </div>
        ) : (
            <div className=" text-slate-500 font-normal flex justify-center items-center mt-20">
                No se agregaron solicitudes. 
            </div>
        )}
      </ModalCustom>
    </div>
  );
}
