import {  RequestChangeCareer } from "@/types/coordinator";
import { Estado, getStatusColor } from "@/utils/dictionaries";
import { Dispatch } from "react";

type RequestCardProps = {
  request: RequestChangeCareer ;
  setSetRequestSelected: Dispatch<React.SetStateAction<RequestChangeCareer | undefined>>;
};

export default function RequestCareerCard({
  request,
  setSetRequestSelected,
}: RequestCardProps) {
  const handleClick = () => {
    setSetRequestSelected(request);
  };

  return (
    <div
      className=" bg-white p-3 w-full shadow-md rounded-md space-y-2 text-slate-600 relative cursor-pointer hover:scale-105 transition-all "
      onClick={handleClick}
    >
      <span
        className={` size-5 shadow-sm absolute -top-1 -right-1 rounded-full ${getStatusColor(
          request.estado as Estado
        )}`}
      ></span>
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
  );
}