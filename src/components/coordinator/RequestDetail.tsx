import { RequestCancelClass } from "@/types/coordinator";
import { Estado, getStatusColor } from "@/utils/dictionaries";
import { IconFileSearch } from "@tabler/icons-react";
import ButtonCustomWithClick from "../ButtonCustomWithClick";

type RequestDetailProps = {
  request: RequestCancelClass;
  handleAccept: () => void;
  handleDenny: () => void;
  pendingAccept: boolean;
  pendingDenny: boolean;
};

export default function RequestDetail({
  handleAccept,
  handleDenny,
  pendingAccept,
  pendingDenny,
  request,
}: RequestDetailProps) {
  return (
    <div className=" bg-white p-3 w-full shadow-md rounded-md space-y-3 text-slate-600 relative ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 space-y-2">
        <span
          className={` size-5 shadow-sm absolute -top-1 -right-1 rounded-full ${getStatusColor(
            request.estado as Estado
          )}`}
        ></span>
        <div className=" w-full space-y-2">
          <div className=" p-2 flex w-full justify-between pr-5 bg-slate-200 rounded-md font-semibold">
            Estudiante : <span>{request.studentName}</span>
          </div>
          <div className=" p-2 flex w-full justify-between pr-5 bg-slate-200 rounded-md font-semibold">
            Número de cuenta : <span>{request.identificationCode}</span>
          </div>
          <div className=" p-2 flex w-full justify-between pr-5 bg-slate-200 rounded-md font-semibold">
            Correo Institucional : <span>{request.institutionalEmail}</span>
          </div>
        </div>
        <div className=" w-full flex flex-col justify-between space-y-2">
          <div className="bg-slate-200 rounded-md">
            <div className=" font-semibold p-2">Clases a cancelar: </div>
            <div className=" flex gap-2 flex-wrap px-2 pb-4">
              {request.classesToCancel.map((section) => (
                <span
                  key={section.classCode}
                  className=" bg-indigo-600 px-2 py-1 text-sm font-semibold text-white rounded-full"
                >
                  <span>{section.className} - </span>
                  <span>{section.code}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="">
            <a
              target="_blank"
              href={request.archivos[0] || ""}
              download={"evidencia.pdf"}
              className=" font-semibold uppercase text-sm items-center bg-cyan-500 text-white p-2 hover:bg-cyan-600 cursor-pointer rounded-md  w-full flex gap-2"
            >
              Ver Evidencia <IconFileSearch stroke={2} />
            </a>
          </div>
        </div>
      </div>

      <div className=" p-2">
        <div className=" bg-blue-900 text-white font-semibold rounded-t-md text-center p-1 uppercase">
          Justificación
        </div>
        <div className="bg-slate-200 rounded-b-md p-2">
          {request.justificacion}
        </div>
      </div>

      <div className=" w-full flex justify-between gap-3 mt-5">
        <ButtonCustomWithClick
          disabled={pendingAccept || pendingDenny || request.estado !== 'PENDIENTE'}
          onClick={handleDenny}
          className=" p-2 rounded-md   text-white bg-red-500 hover:bg-red-600"
        >
          Rechazar
        </ButtonCustomWithClick>
        <ButtonCustomWithClick
          disabled={pendingAccept || pendingDenny || request.estado !== 'PENDIENTE'}
          onClick={handleAccept}
          className=" p-2 rounded-md  text-white bg-green-500 hover:bg-green-600"
        >
          Aceptar
        </ButtonCustomWithClick>
      </div>
    </div>
  );
}
