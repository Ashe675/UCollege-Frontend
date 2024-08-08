import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import SelectUser from "./SelectUser";
import { Classroom, ClassSectionForm } from "@/types/department_head";
import ButtonSubmit from "../ButtonSubmit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/stores/userStore";
import {
  createNewCurrentSection,
  createNewNextSection,
  getClassesByDepartment,
  getClassroomsByDepartment,
} from "@/api/department_head/DepartmentHeadApi";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";

const daysOfWeek = [
  { name: "Lunes", value: 1 },
  { name: "Martes", value: 2 },
  { name: "Miércoles", value: 3 },
  { name: "Jueves", value: 4 },
  { name: "Viernes", value: 5 },
  { name: "Sábado", value: 6 },
  { name: "Domingo", value: 7 },
];

export default function AddSectionForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
  } = useForm<ClassSectionForm>();
  const user = useUserStore((state) => state.user);
  const toastId = useRef<null | number | string>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const location = useLocation();
  
  const nextPeriod = location.pathname.includes(`/periodo-academico/proximo`) 
  

  const { mutate, isPending } = useMutation({
    mutationFn: nextPeriod ? createNewNextSection  : createNewCurrentSection,
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    },
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({queryKey : ["sections", "department", "current", user.id]})
      reset();
      navigate(`/myspace/${nextPeriod ? PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT :  PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT}`);
    },
  });

  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const handleCheckboxChange = (value: number) => {
    setSelectedDays((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );
  };

  const { data: buildings } = useQuery({
    queryKey: ["buildings", user.id],
    queryFn: getClassroomsByDepartment,
  });

  const { data: classes } = useQuery({
    queryKey: ["classes", user.id],
    queryFn: getClassesByDepartment,
  });

  const building = watch("buildingId");
  const [classrooms, setClassrooms] = useState<Classroom[]>();
  const buildingOptions = buildings;

  useEffect(() => {
    if (!isNaN(building)) {
      if (buildingOptions && building) {
        const options = buildingOptions.find(
          (options) => options.id === +building
        );
        if (options && options.classrooms.length) {
          setClassrooms(options.classrooms);
        } else {
          setClassrooms([]);
        }
      }
    }
  }, [building, buildingOptions]);

  const validateClass = (id: number) => {
    if (isNaN(id)) {
      return "Campo Inválido";
    }
    return true;
  };

  const validateHour = (hour: number) => {
    if (isNaN(hour) || hour > 21 || hour < 5) {
      return "Hora Inválida";
    }
    return true;
  };

  const validateQuota = (quota: number) => {
    if (isNaN(quota) || quota > 50 || quota < 5) {
      return "Cupos Inválidos";
    }
    return true;
  };

  const onSubmit = (formData: ClassSectionForm) => {
    if (formData.teacherId <= 0 || isNaN(formData.teacherId)) {
      return setError("teacherId", {
        type: "min",
        message: "Maestro Invalido",
      });
    }
    toastId.current = toast.loading("Creando Sección...");
    mutate(formData);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      hidden={isPending}
      className="  p-4 space-y-3 lg:space-x-5 h-full w-full grid grid-cols-1 lg:grid-cols-2"
    >
      <div className=" flex flex-col justify-between space-y-3">
        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="classId"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Clase
          </label>
          <select
            id="classId"
            className="p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
            defaultValue={""}
            {...register("classId", {
              required: "La clase es obligatoria",
              validate: validateClass,
            })}
          >
            <option value="">---Seleccione la clase de la sección---</option>
            {classes &&
              classes.classes.map((clase) => (
                <option key={clase.id} value={clase.id}>
                  {clase.name}
                </option>
              ))}
          </select>
          {errors.classId && (
            <ErrorMessage>{errors.classId.message}</ErrorMessage>
          )}
        </div>
        <div className=" space-y-1 flex flex-col">
          <label
            htmlFor="teacherId"
            className=" font-bold block text-center uppercase text-slate-600"
          >
            Docente
          </label>
          <SelectUser setValue={setValue} name="teacherId" />
          {errors.teacherId && (
            <ErrorMessage>{errors.teacherId.message}</ErrorMessage>
          )}
        </div>
        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="buildingId"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Edificio
          </label>
          <select
            id="buildingId"
            className="p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
            defaultValue={""}
            {...register("buildingId", {
              required: "El edificio es obligatorio",
              validate: validateClass,
            })}
          >
            <option value="">---Seleccione el edificio de la sección---</option>
            {buildings &&
              buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.code}
                </option>
              ))}
          </select>
          {errors.buildingId && (
            <ErrorMessage>{errors.buildingId.message}</ErrorMessage>
          )}
        </div>
        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="classroomId"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Aula
          </label>
          <select
            id="classroomId"
            className="p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
            defaultValue={""}
            {...register("classroomId", {
              required: "El aula es obligatoria",
              validate: validateClass,
            })}
          >
            <option value="">---Seleccione el aula de la sección---</option>
            {classrooms &&
              classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.id}>
                  {classroom.code}
                </option>
              ))}
          </select>
          {errors.classroomId && (
            <ErrorMessage>{errors.classroomId.message}</ErrorMessage>
          )}
        </div>
        <div className=" space-y-1 flex flex-col w-36">
          <label
            htmlFor="quota"
            className=" font-bold block text-center uppercase text-slate-600"
          >
            Cupos
          </label>
          <input
            type="number"
            id="quota"
            min={5}
            max={50}
            className=" p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
            {...register("quota", {
              required: "Los cupos son obligatorios",
              validate: validateQuota,
            })}
          />
          {errors.quota && <ErrorMessage>{errors.quota.message}</ErrorMessage>}
        </div>
      </div>
      <div className=" flex flex-col justify-between space-y-3">
        <div className=" flex justify-between gap-3 flex-wrap">
          <div className=" space-y-1 flex flex-col w-36">
            <label
              htmlFor="IH"
              className=" font-bold block text-center uppercase text-slate-600"
            >
              Hora Inicial
            </label>
            <input
              type="number"
              id="IH"
              min={5}
              max={21}
              className=" p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
              {...register("IH", {
                required: "La hora inicial es obligatoria",
                validate: validateHour,
              })}
            />
            {errors.IH && <ErrorMessage>{errors.IH.message}</ErrorMessage>}
          </div>
          <div className=" space-y-1 flex flex-col w-36">
            <label
              htmlFor="FH"
              className=" font-bold block text-center uppercase text-slate-600"
            >
              Hora Final
            </label>
            <input
              type="number"
              id="FH"
              min={5}
              max={21}
              className=" p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
              {...register("FH", {
                required: "La hora final es obligatoria",
                validate: validateHour,
              })}
            />
            {errors.FH && <ErrorMessage>{errors.FH.message}</ErrorMessage>}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="block text-center uppercase text-slate-600 font-bold">
            Días de clase
          </label>
          {daysOfWeek.map((day) => (
            <label
              key={day.value}
              className="inline-flex items-center space-x-2"
            >
              <input
                type="checkbox"
                value={day.value}
                {...register("days", {
                  required: "Tiene que elegir al menos un día.",
                })}
                checked={selectedDays.includes(day.value)}
                onChange={() => handleCheckboxChange(day.value)}
                className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-700">{day.name}</span>
            </label>
          ))}
          <div className="mt-4 text-gray-700">
            <strong>Días seleccionados:</strong> {selectedDays.join(", ")}
          </div>
          {errors.days && <ErrorMessage>{errors.days.message}</ErrorMessage>}
        </div>
        {!isPending && (
          <ButtonSubmit value="Crear Sección" className=" rounded-sm" />
        )}
      </div>
    </form>
  );
}
