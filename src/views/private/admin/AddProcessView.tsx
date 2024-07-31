import AddProcessEnrollForm from "@/components/admin/AddProcessEnrollForm";
import AddProcessForm from "@/components/admin/AddProcessForm";
import ErrorMessage from "@/components/ErrorMessage";
import { PrivateRoutes } from "@/data/routes";
import { PROCESS_TYPES } from "@/data/selectsData";
import { useAppStore } from "@/stores/appStore";
import { ProcessType } from "@/types/admin";
import { IconSquareXFilled } from "@tabler/icons-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProcessView() {
  const setTitle = useAppStore((state) => state.setTitle);
  const [enrollForm, setEnrollForm] = useState(false);
  const [process, setProcess] = useState<ProcessType>();
  const [processType, setProcessType] = useState<string>();
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle("Calendarización - Nuevo Proceso");
  }, [setTitle]);

  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(true);

  const handleToggle = () => {
    setIsGrown(!isGrown);
    setTimeout(() => {
      navigate(`/myspace/${PrivateRoutes.ADMIN_CALENDARIZACION}`);
    }, 500);
  };

  const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setProcessType(value);
    setProcess(undefined);
    if (value) {
      const id = parseInt(value);
      if (isNaN(id)) {
        setError("Tipo de Proceso inválido");
        return;
      }

      const processFound = PROCESS_TYPES.find((process) => process.id === id);

      if (!processFound) {
        setError("Proceso no encontrado");
      } else {
        setProcess(processFound);
        setError("");
        if (id === 3) {
          setEnrollForm(true);
        } else {
          setEnrollForm(false);
        }
      }
    }
  };

  return (
    <div className=" w-full  h-full bg-slate-100 p-5 text-slate-500">
      <div
        className={`${
          isGrown ? "animate-grow" : "animate-shrink"
        } rounded-sm h-full bg-white shadow-md relative flex flex-col pb-2  max-w-5xl mx-auto`}
      >
        <h2 className=" max-sm:text-left uppercase font-bold text-center bg-secondary p-4 text-white rounded-t-sm">
          Creando Nuevo Proceso
        </h2>
        <IconSquareXFilled
          onClick={handleToggle}
          className=" text-red-600 absolute top-3 right-2 hover:cursor-pointer"
          size={30}
        />
        <div className=" p-3 space-y-2">
          <h2 className=" text-slate-700 font-bold text-center text-xl sm:text-3xl text-pretty">
            Selecciona el tipo de proceso que deseas crear
          </h2>
          <select
            name="processType"
            id="processType"
            className=" p-3 w-full max-w-2xl mx-auto block mt-4 border border-slate-200 rounded-md"
            onChange={handleTypeChange}
            value={processType}
          >
            <option value="">--- SELECCIONE UNA OPCION ---</option>
            {PROCESS_TYPES.map((type) => (
              <option value={type.id} key={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div className=" mx-auto w-full max-w-2xl">
          {process &&
            (enrollForm ? (
              <AddProcessEnrollForm process={process} />
            ) : (
              <AddProcessForm process={process} />
            ))}
        </div>
      </div>
    </div>
  );
}
