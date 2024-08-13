import {
  getClassroomsByDepartment,
  updateNextSectionById,
  updateSectionById,
} from "@/api/department_head/DepartmentHeadApi";
import { useUserStore } from "@/stores/userStore";
import {
  Classroom,
  ClassSectionForm,
  TeacherDepto,
} from "@/types/department_head";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SelectUser from "./SelectUser";
import ErrorMessage from "../ErrorMessage";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

type EditSectionFormProps = {
  initialValues: ClassSectionForm;
  teacher: Pick<TeacherDepto, "id" | "person">;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditSectionForm({
  initialValues,
  teacher,
  edit,
  setEdit,
}: EditSectionFormProps) {
  const user = useUserStore((state) => state.user);
  const params = useParams();
  const sectionId = params.sectionId!;

  const { data: buildings } = useQuery({
    queryKey: ["buildings", user.id],
    queryFn: getClassroomsByDepartment,
  });

  const toastId = useRef<null | number | string>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    watch,
    reset,
  } = useForm<ClassSectionForm>({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const location = useLocation();

  const nextPeriod = location.pathname.includes(`/periodo-academico/proximo`);
  

  const { mutate, isPending } = useMutation({
    mutationFn: nextPeriod ? updateNextSectionById : updateSectionById,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({
        queryKey: ["sections", "department", "current", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["sections", "department", "future", user.id],
      });
      queryClient.removeQueries({
        queryKey: ["section", "detail", sectionId],
      });
      setEdit(false);
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    },
  });

  const building = watch("buildingId");
  const [classrooms, setClassrooms] = useState<Classroom[]>();
  const buildingOptions = buildings;

  const onSubmit = (formData: ClassSectionForm) => {
    if (formData.teacherId <= 0 || isNaN(formData.teacherId)) {
      return setError("teacherId", {
        type: "min",
        message: "Maestro Invalido",
      });
    }
    toastId.current = toast.loading("Actualizando Sección...");
    mutate({ payload: formData, id: Number(sectionId) });
  };

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

  useEffect(() => {
    if (initialValues?.classroomId) {
      reset();
      setValue("classroomId", initialValues.classroomId);
    }
  }, [initialValues, setValue, reset]);

  const validateClass = (id: number) => {
    if (isNaN(id)) {
      return "Campo Inválido";
    }
    return true;
  };

  if (buildings && classrooms)
    return (
      <form
        noValidate
        id="editSectionForm"
        onSubmit={handleSubmit(onSubmit)}
        hidden={isPending}
        className="space-y-3"
      >
        <div className=" space-y-1 flex flex-col">
          <label
            htmlFor="teacherId"
            className=" font-bold block  uppercase text-slate-600"
          >
            Docente
          </label>
          <SelectUser
            setValue={setValue}
            name="teacherId"
            initialState={teacher}
            disable={edit}
          />
          {errors.teacherId && (
            <ErrorMessage>{errors.teacherId.message}</ErrorMessage>
          )}
        </div>
        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="buildingId"
            className="block  uppercase text-slate-600 font-bold"
          >
            Edificio
          </label>
          <select
            id="buildingId"
            className="p-3 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
            disabled={edit}
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
            className="block  uppercase text-slate-600 font-bold"
          >
            Aula
          </label>
          <select
            disabled={edit}
            id="classroomId"
            defaultValue={initialValues?.classroomId || ""}
            className="p-3 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6"
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
      </form>
    );
}
