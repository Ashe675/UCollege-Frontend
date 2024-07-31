import { useEffect, useState } from "react";
import { NewProcessFormData, ProcessType } from "../../types/admin/index";
import DatePick from "./DatePick";
import { toUTCDate } from "@/utils/date";
import ErrorMessage from "../ErrorMessage";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProcess } from "@/api/admin/AdminApi";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";

type AddProcessFormProps = {
  process: ProcessType;
};

export default function AddProcessForm({ process }: AddProcessFormProps) {
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
    const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createProcess,
    onSuccess: (data) => {
      toast.success(data),
      queryClient.invalidateQueries({ queryKey: ["process", "active"] });
      queryClient.invalidateQueries({ queryKey: ["process", "all"] });
      setInitialDate(null);
      setFinalDate(null);
      setError("");
      navigate(`/myspace/${PrivateRoutes.ADMIN_CALENDARIZACION}`)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (process) {
      setInitialDate(null);
      setFinalDate(null);
      setError("");
    }
  }, [process]);

  const handleClickSave = () => {
    if (process) {
      if (initialDate && finalDate) {
        if (isNaN(initialDate.getTime())) {
          setError(
            "Fecha de inicio inválida. Por favor, seleccione una fecha válida."
          );
          return;
        }

        if (isNaN(finalDate.getTime())) {
          setError(
            "Fecha final inválida. Por favor, seleccione una fecha válida."
          );
          return;
        }

        if (initialDate < new Date()) {
          setError(
            "La fecha inicial debe ser mayor o igual que la fecha actual"
          );
          return;
        }

        if (finalDate < initialDate) {
          setError("La fecha final debe ser mayor que la fecha inicial");
          return;
        }

        const formattedInitialDate = toUTCDate(initialDate);
        const formattedFinalDate = toUTCDate(finalDate);

        const jsonPayload: NewProcessFormData = {
          processTypeId: process.id,
          startDate: formattedInitialDate,
          finalDate: formattedFinalDate,
        };
        mutate(jsonPayload);
        setError("");
      } else {
        setError("Todos los campos son obligatorios.");
      }
    }
  };

  if(isPending) return <div className=" h-full flex items-center mt-10"><Spinner/></div>

  if (process)
    return (
      <div className=" p-3 flex flex-col gap-4">
        <h3 className=" text-slate-700 text-xl font-bold uppercase">
          Proceso de <span className=" text-tertiary">{process.name}</span>
        </h3>
        <DatePick
          value={initialDate}
          onChange={setInitialDate}
          label="Fecha Inicio"
        />
        <DatePick
          value={finalDate}
          onChange={setFinalDate}
          label="Fecha Final"
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonCustomWithClick
          className=" bg-green-500 hover:bg-green-600 p-2 text-white"
          onClick={handleClickSave}
        >
          Crear Proceso
        </ButtonCustomWithClick>
      </div>
    );
}
