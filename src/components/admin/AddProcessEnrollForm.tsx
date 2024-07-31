import { Day, NewProcessEnrollFormData, ProcessType } from "@/types/admin";
import { toUTCDate } from "@/utils/date";
import { useEffect, useState } from "react";
import DatePick from "./DatePick";
import ErrorMessage from "../ErrorMessage";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import { differenceInDays } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEnrollProcess } from "@/api/admin/AdminApi";
import { PrivateRoutes } from "@/data/routes";
import { useNavigate } from "react-router-dom";
import Spinner from "../spinner/Spinner";

type AddProcessEnrollFormProps = {
  process: ProcessType;
};

type ProcessDay = {
  startDate: Date | null;
  finalDate: Date | null;
  globalAvarage: number;
};

export default function AddProcessEnrollForm({
  process,
}: AddProcessEnrollFormProps) {
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);
  const [days, setDays] = useState<ProcessDay[]>([]);
  const [showDayForm, setShowDateForm] = useState(false);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {mutate, isPending} = useMutation({
    mutationFn : createEnrollProcess,
    onSuccess : (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ["process", "active"] });
      queryClient.invalidateQueries({ queryKey: ["process", "all"] });
      setInitialDate(null);
      setFinalDate(null);
      setDays([]);
      setShowDateForm(false),
      setError("");
      setTimeout(() => {
        navigate(`/myspace/${PrivateRoutes.ADMIN_CALENDARIZACION}`)
      }, 2000);
    },
    onError : (error) => {
      toast.error(error.message)
    }
  })


  useEffect(() => {
    if (process) {
      setError("");
      setShowDateForm(false);
    }
  }, [process]);

  useEffect(() => {
    setShowDateForm(false);
    setDays([]);
    setError("");
  }, [initialDate, finalDate]);

  const handleClickNext = () => {
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

        // const jsonPayload: NewProcessFormData = {
        //   processTypeId: process.id,
        //   startDate: formattedInitialDate,
        //   finalDate: formattedFinalDate,
        // };

        const diffDays =
        differenceInDays(formattedFinalDate, formattedInitialDate) + 1;

        const daysArray = Array(diffDays).fill(null).map((_, index) => {
          if (index === diffDays-1 &&  index === 0 ) {
            return {
              startDate: initialDate,
              finalDate: finalDate,
              globalAvarage: 0,
            }
          }else if (index === 0) {
            return {
              startDate: initialDate,
              finalDate: null,
              globalAvarage: 0,
            };
          } else if (index === diffDays-1) {
            return {
              startDate: null,
              finalDate: finalDate,
              globalAvarage: 0,
            }
          } else{
            return {
              startDate: null,
              finalDate: null,
              globalAvarage: 0,
            };
          }
        });
       
        setDays(daysArray);

        // console.log("Days", days);

        setShowDateForm(true);
        setError("");
      } else {
        setError("Todos los campos son obligatorios.");
      }
    }
  };

  const handleDayChange = (
    index: number,
    field: string,
    value: Date | number | null
  ) => {
    const newDays = [...days];
    newDays[index] = { ...newDays[index], [field]: value };
    setDays(newDays);
  };

  // console.log("Days", days);

  const handleFormSubmit = () => {
    const allInputsFilled = days.every(
      (day) => day.startDate && day.finalDate && !isNaN(day.globalAvarage) 
    );

    if (!allInputsFilled) {
      setError("Tiene que establecer los días de matricula obligatoriamente.");
      return;
    }

    const payloadDays : Day[] = []

    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      const dayInitialDate = day.startDate!;
      const dayFinalDate = day.finalDate!;
      const dayGobalAvarage = day.globalAvarage!;

      
        if (isNaN(dayInitialDate.getTime())) {
          setError(
            "Fecha de inicio inválida. Por favor, seleccione una fecha válida" +
              ` (día ${i + 1}).`
          );
          return;
        }

        if (isNaN(dayFinalDate.getTime())) {
          setError(
            "Fecha final inválida. Por favor, seleccione una fecha válida" +
              ` (día ${i + 1}).`
          );
          return;
        }

        if (dayInitialDate < initialDate!) {
          setError(
            `La fecha inicial no debe pasarse del rango indicado en el proceso (día ${
              i + 1
            }).`
          );
          return;
        }

        if (dayFinalDate > finalDate!) {
          setError(
            `La fecha final no debe pasarse del rango indicado en el proceso (día ${
              i + 1
            }).`
          );
          return;
        }

        if (dayFinalDate < dayInitialDate) {
          setError(
            `La fecha final debe ser mayor que la fecha inicial (día ${i + 1}).`
          );
          return;
        }

        if (
          isNaN(dayGobalAvarage) ||
          dayGobalAvarage < 0 ||
          dayGobalAvarage > 100
        ) {
          setError(`Índice no válido (día ${i + 1}).`);
          return;
        }

        const formattedDayInitialDate = toUTCDate(dayInitialDate);
        const formattedDayFinalDate = toUTCDate(dayFinalDate);

        payloadDays.push({ startDate : formattedDayInitialDate, finalDate :formattedDayFinalDate, globalAvarage : dayGobalAvarage })
        // console.log(payloadDays)
        setError("");
        
    }

    if(initialDate && finalDate && process){
      const formattedInitialDate = toUTCDate(initialDate);
      const formattedFinalDate = toUTCDate(finalDate);
      const jsonPayload : NewProcessEnrollFormData = {
        startDate : formattedInitialDate,
        finalDate : formattedFinalDate,
        processTypeId : process.id,
        days : payloadDays
      }
      // console.log('PAYLOAD FINAL' ,jsonPayload)
      // console.log(jsonPayload)
      mutate(jsonPayload)
      setError("");
    }else{
      // console.log('ERROR EN ENVIAR BACKEND')
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
        {!showDayForm && (
          <ButtonCustomWithClick
            className=" bg-tertiary hover:bg-tertiary/90 p-2 text-white rounded-sm shadow-sm"
            onClick={handleClickNext}
          >
            Siguiente
          </ButtonCustomWithClick>
        )}
        {showDayForm && days && (
          <div className=" space-y-3">
            <h2 className=" font-semibold text-lg text-slate-700 uppercase">
              Defina los días de matrícula con sus índices.
            </h2>
            <h3 className=" font-semibold text-red-500 uppercase">
              ASEGURESE DE QUE NO HAYAN TRASLAPES DE FECHAS
            </h3>
            {days.map((day, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 mt-4 p-2 border border-dashed border-slate-400 rounded-sm"
              >
                <label className="font-semibold text-slate-600 text-lg">
                  Día {index + 1}
                </label>
                <DatePick
                  value={index === 0 ? initialDate : day.startDate}
                  onChange={(date) => handleDayChange(index, "startDate", date)}
                  label={`Fecha Inicio Día ${index + 1}`}
                  disable={index === 0 ? true : false}
                />
                <DatePick
                  value={index == days.length - 1 ? finalDate : day.finalDate}
                  onChange={(date) => handleDayChange(index, "finalDate", date)}
                  label={`Fecha Final Día ${index + 1}`}
                  disable={index === days.length - 1 ? true : false}
                />
                <label
                  className="font-semibold"
                  htmlFor={`glogalAvarage${index + 1}`}
                >
                  Mínimo índice académico día {index + 1}
                </label>
                <input
                  type="number"
                  id={`glogalAvarage${index + 1}`}
                  placeholder="Índice Académico"
                  className="p-2 border rounded mt-2 w-full"
                  value={day.globalAvarage}
                  onChange={(e) =>
                    handleDayChange(
                      index,
                      "globalAvarage",
                      parseFloat(e.target.value)
                    )
                  }
                  min={0}
                  max={100}
                />
              </div>
            ))}
            <ButtonCustomWithClick
              className="bg-green-500 hover:bg-green-600 p-2 text-white rounded-sm shadow-sm mt-4"
              onClick={handleFormSubmit}
            >
              Crear Proceso
            </ButtonCustomWithClick>
          </div>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
}
