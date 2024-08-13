import { Process } from "@/types/admin";
import { formatLatinaDateTime, toUTCDate } from "@/utils/date";
import {
  IconCancel,
  IconDeviceFloppy,
  IconEdit,
  IconPower,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import DatePick from "./DatePick";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activeProcessById, deactiveProcessById, exdendFinalDateProcess } from "@/api/admin/AdminApi";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";


type ProcessDetailProps = {
  process: Process | undefined;
  setProcessSelected: React.Dispatch<
    React.SetStateAction<
      | Process
      | undefined
    >>
};

export default function ProcessDetail({ process, setProcessSelected }: ProcessDetailProps) {
  const [canEdit, setCanEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const { mutate: mutateExtendDate, isPending } = useMutation({
    mutationFn: exdendFinalDateProcess,
    onSuccess: (data) => {
      toast.success(data);
      setError("");
      setCanEdit(false);
      setProcessSelected(undefined)
      queryClient.invalidateQueries({ queryKey: ["process", "active"] });
      queryClient.invalidateQueries({ queryKey: ["process", "all"] });
    },
    onError: (error) => {
      toast.error(error.message);
      setError("");
      setCanEdit(false);
    },
  });


  const { mutate: mutateActiveProcess, isPending : isPendingActivate } = useMutation({
    mutationFn: activeProcessById,
    onSuccess: (data) => {
      toast.success(data);
      setError("");
      setCanEdit(false);
      setProcessSelected(undefined)
      queryClient.invalidateQueries({ queryKey: ["process", "active"] });
      queryClient.invalidateQueries({ queryKey: ["process", "all"] });
    },
    onError: (error) => {
      toast.error(error.message);
      setError("");
      setCanEdit(false);
    },
  });

  const { mutate: mutateDeactivate, isPending : isPendingDeactivate } = useMutation({
    mutationFn: deactiveProcessById,
    onSuccess: (data) => {
      toast.success(data);
      setError("");
      setCanEdit(false);
      setProcessSelected(undefined)
      queryClient.invalidateQueries({ queryKey: ["process", "active"] });
      queryClient.invalidateQueries({ queryKey: ["process", "all"] });
    },
    onError: (error) => {
      toast.error(error.message);
      setError("");
      setCanEdit(false);
    },
  });

  useEffect(() => {
    setCanEdit(false);
  }, [process]);

  const handleClickEdit = () => {
    setCanEdit(true);
  };

  const handleClickSave = () => {
    if (selectedDate && process) {
      if (isNaN(selectedDate.getTime())) {
        setError("Fecha inválida. Por favor, seleccione una fecha válida.");
        return;
      }

      if (
        selectedDate &&
        process &&
        selectedDate <= new Date(process.startDate)
      ) {
        setError("La fecha final debe ser mayor que la fecha inicial");
        return;
      }

      const formattedDate = toUTCDate(selectedDate)
      const jsonPayload = {
        id: process.id,
        finalDate: formattedDate,
      };
      mutateExtendDate(jsonPayload);
    } else {
      setError("Debes de seleccionar una fecha.");
    }
  };

  const handleActivate = () =>{ 
    if(process) mutateActiveProcess(process.id)
  }

  const handleDeactivate = () => {
    if(process) mutateDeactivate(process.id)
  }

  if (isPending || isPendingActivate || isPendingDeactivate)
    return (
      <div className=" bg-slate-200 border flex flex-col justify-start max-h-64 border-dashed space-y-3 border-slate-400 rounded-sm p-3 relative order-1 lg:order-2">
        <Spinner />
      </div>
    );

  if (process)
    return (
      <div className=" bg-slate-200 border flex flex-col min-h-64  border-dashed space-y-3 border-slate-400 rounded-sm p-3 relative order-1 lg:order-2">
        <section
          className={` ${
            process.active ? "bg-white" : "bg-gray-300/90 text-white"
          } w-full max-w-md mx-auto  rounded-sm shadow-sm p-2 relative`}
        >
          <span
            className={` h-7 w-7 absolute rounded-full -right-2 -top-2 shadow-sm ${
              process.active ? "bg-emerald-500" : "bg-gray-400"
            }`}
          ></span>
          <h2 className=" font-bold text-2xl text-center">
            {process.processType.name}
          </h2>
          <div className=" flex flex-col w-full gap-5 mt-8">
            <div
              className={`p-1 pl-3 font-semibold flex justify-between items-center ${
                process.active ? "bg-sky-500" : "bg-gray-400"
              } text-white rounded-lg uppercase text-sm shadow-sm`}
            >
              Fecha Inicio:
              <span className={`p-1 px-2 bg-white rounded-lg ${process.active ? ' text-slate-500 ': ' text-gray-400'} shadow-inner`}>
                {formatLatinaDateTime(process.startDate)}
              </span>
            </div>
            <div
              className={`p-1 pl-3 font-semibold flex justify-between items-center ${
                process.active ? "bg-rose-500" : "bg-gray-400"
              } text-white rounded-lg uppercase text-sm shadow-sm`}
            >
              Fecha Fin:
              <span className={`p-1 px-2 bg-white rounded-lg ${process.active ? ' text-slate-500 ': ' text-gray-400'} shadow-inner`}>
                {formatLatinaDateTime(process.finalDate)}
              </span>
            </div>
          </div>
        </section>
        {canEdit && (
          <section className=" bg-white w-full max-w-md mx-auto rounded-sm flex justify-center items-center flex-col gap-2 shadow-sm  p-3">
            <DatePick value={selectedDate} onChange={setSelectedDate} label="Nueva Fecha Final" />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </section>
        )}
        <div className="  flex gap-3 w-full ">
          {process.active && !canEdit && (
            <button
              className=" bg-orange-500 hover:bg-orange-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
              onClick={handleClickEdit}
            >
              <span>Editar</span>
              <IconEdit stroke={2} />
            </button>
          )}
          {canEdit && (
            <button
              className=" bg-emerald-500 hover:bg-emerald-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
              onClick={handleClickSave}
            >
              <span>Guardar</span>
              <IconDeviceFloppy stroke={2} />
            </button>
          )}
          {!canEdit &&
            (process.active ? (
              <button className=" bg-red-500 hover:bg-red-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold" onClick={handleDeactivate}>
                <span>Desactivar</span>
                <IconPower stroke={2} />
              </button>
            ) : (
              <button className=" bg-emerald-500 hover:bg-emerald-600 p-2 shadow-sm rounded-md justify-between uppercase text-white w-full flex gap-3 font-bold" onClick={handleActivate}>
                <span>Activar</span>
                <IconPower stroke={2} />
              </button>
            ))}
          {canEdit && (
            <button
              className=" bg-red-500 hover:bg-red-600 p-2 shadow-sm rounded-md uppercase justify-between text-white w-full flex gap-3 font-bold"
              onClick={() => {
                setCanEdit(false);
                setError("");
                setSelectedDate(null);
              }}
            >
              <span>Cancelar</span>
              <IconCancel stroke={2} />
            </button>
          )}
        </div>
      </div>
    );
}
