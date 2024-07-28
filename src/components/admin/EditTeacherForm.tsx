import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { EditTeacherData, EditTeacherFormData } from "@/types/admin";
import { toast } from "react-toastify";
import { updateTeacher } from "@/api/admin/AdminApi";
import { useNavigate, useParams } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";

export default function EditTeacherForm({
  initialValues,
  canEdit,
  setCanEdit
}: {
  initialValues: EditTeacherData;
  canEdit : boolean;
  setCanEdit: React.Dispatch<React.SetStateAction<boolean>> 
}) {
  const toastId = useRef<null | number | string>(null);
  const initialTeacherData: EditTeacherFormData = {
    names: (initialValues.firstName + " " + (initialValues.middleName ? initialValues.middleName : '') ).trim(),
    lastNames: (initialValues.lastName + " " + (initialValues.secondLastName ? initialValues.secondLastName : '')).trim(),
    roleId: initialValues.role.id,
    email: initialValues.email,
    phoneNumber: initialValues.phoneNumber,
  };
  
  const params = useParams()
  const teacherCode = params.teacherCode!
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: updateTeacher,
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setCanEdit(true)
    },
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      reset();
      queryClient.removeQueries({queryKey : ["teachers", teacherCode]})
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      navigate(`/myspace/${PrivateRoutes.ADMIN_DOCENTES}/${teacherCode}`)
      setCanEdit(false)
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EditTeacherFormData>({ defaultValues: initialTeacherData });

  const handleSendInscription = (formData: EditTeacherFormData) => {
    toastId.current = toast.loading("Actualizando Docente...");
    mutate({formData, teacherCode });
  };

  if(isPending) setCanEdit(false)

  if(initialValues)  
  return (
    <form
      onSubmit={handleSubmit(handleSendInscription)}
      noValidate
      id="formEditTeacher"
      className="p-0 space-y-3 lg:pr-3 h-full w-full flex flex-col justify-between"
    >
      <div className="space-y-1 flex flex-col ">
        <div className=" flex  justify-between  items-center space-x-2">
          <label
            htmlFor="names"
            className=" font-bold block text-center uppercase text-slate-700"
          >
            Nombres
          </label>
          <input
            disabled={!canEdit}
            type="text"
            id="names"
            placeholder="Ingrese los nombres del docente"
            className={` max-w-[320px] p-2 border rounded-sm border-slate-200 w-full ${
              canEdit ? "" : " bg-slate-200"
            }`}
            {...register("names", {
              required: "Los nombres son obligatorios",
              pattern: {
                value: /^[A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*(?: [A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*)?$/,
                message:
                  "EL campo no puede contener números, ni espacios de más, debe ingresar obligatorio el primer nombre, cada nombre debe empezar por mayúscula",
              },
            })}
          />
        </div>
        {errors.names && <ErrorMessage>{errors.names.message}</ErrorMessage>}
      </div>
      <div className=" space-y-1 flex flex-col">
        <div className=" flex justify-between items-center space-x-2">
          <label
            htmlFor="lastNames"
            className=" block text-center uppercase text-slate-600 font-bold"
          >
            Apellidos
          </label>
          <input
            disabled={!canEdit}
            type="text"
            id="lastName"
            placeholder="Ingrese los apellidos del docente"
            className={` max-w-[320px] p-2 border rounded-sm border-slate-200 w-full ${
              canEdit ? "" : " bg-slate-200"
            }`}
            {...register("lastNames", {
              required: "Los apellidos son obligatorios",
              pattern: {
                value: /^[A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*(?: [A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*)?$/,
                message:
                  "EL campo no puede contener números, ni espacios de más, debe ingresar obligatorio el primer apellido, cada nombre debe empezar por mayúscula",
              },
            })}
          />
        </div>

        {errors.lastNames && (
          <ErrorMessage>{errors.lastNames.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-1 flex flex-col">
        <div className=" flex justify-between items-center space-x-2">
          <label
            htmlFor="phoneNumber"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Teléfono
          </label>
          <input
            disabled={!canEdit}
            type="text"
            id="phoneNumber"
            placeholder="Ingrese el número de teléfono (Ej. 22332233)"
            className={`  max-w-[320px] p-2 border rounded-sm border-slate-200 w-full ${
              canEdit ? "" : " bg-slate-200"
            }`}
            {...register("phoneNumber", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{8}$/,
                message: "El teléfono debe de tener 8 números",
              },
            })}
          />
        </div>

        {errors.phoneNumber && (
          <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
        )}
      </div>
      <div className="space-y-1 flex flex-col">
        <div className=" flex justify-between items-center space-x-2">
          <label
            htmlFor="email"
            className="block  uppercase text-slate-600 font-bold"
          >
            Correo Personal
          </label>
          <input
            disabled={!canEdit}
            type="email"
            id="email"
            placeholder="Ingrese el correo personal (Ej. correo@correo.com)"
            className={` max-w-[320px] p-2 border rounded-sm border-slate-200 w-full ${
              canEdit ? "" : " bg-slate-200"
            }`}
            {...register("email", {
              required: "El correo personal es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Correo electrónico no válido",
              },
            })}
          />
        </div>
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
    </form>
  );
}
