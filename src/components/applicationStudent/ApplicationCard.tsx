import React from "react";
import {
  Cancelacion,
  CambioCentro,
  CambioCarrera,
  PagoReposicion,
  CancelacionExcepcional,
} from "@/types/solicitud";

type ApplicationCardProps = {
  solicitud:
    | Cancelacion
    | CambioCentro
    | CambioCarrera
    | PagoReposicion
    | CancelacionExcepcional;
  setProcessSelected: React.Dispatch<
    React.SetStateAction<
      | {
            solicitudId: number;
            teacherId: number;
            active: boolean;
            sectionIds: number;
            justificacion: number;
            fechaPago: string;
            montoPago: string;
            nuevaCarreraId: number;
            centroDestinoId: number;
        }
      | undefined
    >
  >;
};

export default function ApplicationCard({
  solicitud
}: ApplicationCardProps) {
  return (
    <section
      
      className={`rounded-md p-4 shadow-md font-bold w-full transition-all hover:scale-105 max-w-md hover:cursor-pointer hover:shadow-lg relative space-y-3 ${
        solicitud.active ? "bg-white" : "bg-gray-300 text-white"
      }`}
    >
      <span
        className={`${
          solicitud.active ? "bg-green-500 text-white" : "bg-gray-400 text-white"
        } p-2 rounded-full absolute right-3 top-3 text-lg`}
      >
      </span>
      <h2 className="text-xl mr-10">{solicitud.motivo}</h2>
      <div className="lg:pr-10 space-y-3">
      </div>
    </section>
  );
}
