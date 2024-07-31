import { getProcessActives, getProcessAll } from "@/api/admin/AdminApi";
import ProcessDetail from "@/components/admin/ProcessDetail";
import ProcessList from "@/components/admin/ProcessList";
import ButtonCustomWithClick from "@/components/ButtonCustomWithClick";
import Spinner from "@/components/spinner/Spinner";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { Process } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function ProcessView() {
  const [processList, setProcessList] = useState<Process[]>();
  const [activeList, setActiveList] = useState(true);
  const setTitle = useAppStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Calendarización");
  }, [setTitle]);

  const {
    data: activeProcesses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["process", "active"],
    queryFn: getProcessActives,
    retry: 2,
  });

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
    activeList ? setProcessList(activeProcesses) : setProcessList(allProcesses);
  }, [activeList, activeProcesses, allProcesses]);

  const [processSelected, setProcessSelected] = useState<Process>();

  useEffect(() => {
    setProcessSelected(undefined);
  }, [activeProcesses, activeList, allProcesses]);

  if (error || errorAllProcess) return <Navigate to={"/"} />;

  return (
    <div className=" w-full  h-full bg-slate-100 p-5 text-slate-500">
      <div className="flex justify-end w-full bg-transparent gap-5">
        <Link
          className="bg-indigo-600 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md  hover:bg-indigo-700 transition-colors"
          to={`/myspace/${PrivateRoutes.ADMIN_CALENDARIZACION_CALENDARIO}`}
        >
          Ver Calendario
        </Link>
        <Link
          className="bg-tertiary text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md  hover:bg-tertiary/90 transition-colors"
          to={`/myspace/${PrivateRoutes.ADMIN_ADD_PROCESS}`}
        >
          Registrar Nuevo Proceso
        </Link>
      </div>
      {(isLoading || isLoadingAllProcess) && (
        <div className="  w-full h-5/6 flex items-center ">
          <Spinner />
        </div>
      )}
      {processList && (
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 flex-wrap-reverse">
          <div className=" order-2 lg:order-1">
            {
              <div className=" flex justify-between bg-gray-400 rounded-b-xl">
                <ButtonCustomWithClick
                  className={` ${
                    activeList
                      ? " bg-secondary text-white"
                      : "bg-gray-400 text-gray-100"
                  }  p-2 rounded-b-xl`}
                  onClick={() => {
                    setActiveList(true);
                  }}
                >
                  Procesos Activos
                </ButtonCustomWithClick>
                <ButtonCustomWithClick
                  className={` ${
                    !activeList
                      ? " bg-secondary text-white"
                      : "bg-gray-400 text-gray-100"
                  }  p-2 rounded-b-xl`}
                  onClick={() => setActiveList(false)}
                >
                  Todos
                </ButtonCustomWithClick>
              </div>
            }
            {processList && (
              <ProcessList
                processes={processList}
                setProcessSelected={setProcessSelected}
              />
            )}
          </div>
          {processSelected && (
            <ProcessDetail
              process={processSelected}
              setProcessSelected={setProcessSelected}
            />
          )}
        </div>
      )}
    </div>
  );
}
