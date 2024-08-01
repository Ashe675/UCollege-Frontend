import { getProcessAll } from "@/api/admin/AdminApi";
import { BigCalendar } from "@/components/admin/BigCalendar";
import Spinner from "@/components/spinner/Spinner";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

export default function CalendarProcessView() {
  const setTitle = useAppStore((state) => state.setTitle);
  const {
    data: allProcesses,
    isLoading: isLoadingAllProcess,
    error: errorAllProcess,
  } = useQuery({
    queryKey: ["process", "all"],
    queryFn: getProcessAll,
    retry: 2,
  });

  useEffect(() => {
    setTitle("Calendarización - Calendario");
  }, [setTitle]);

  if ( errorAllProcess) return <Navigate to={"/"} />;

  return (
    <div className=" w-full  h-full bg-slate-100 p-5 text-slate-500">
      <div className="flex justify-end w-full bg-transparent gap-5">
        <Link
          className="bg-indigo-600 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md  hover:bg-indigo-700 transition-colors"
          to={`/myspace/${PrivateRoutes.ADMIN_CALENDARIZACION}`}
        >
          Ver Procesos
        </Link>
        <Link
          className="bg-tertiary text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md  hover:bg-tertiary/90 transition-colors"
          to={`/myspace/${PrivateRoutes.ADMIN_ADD_PROCESS}`}
        >
          Registrar Nuevo Proceso
        </Link>
      </div>
      {(isLoadingAllProcess) && (
        <div className="  w-full h-5/6 flex items-center ">
          <Spinner />
        </div>
      )}
     {allProcesses &&  <BigCalendar process={allProcesses} />}
    </div>
  );
}
