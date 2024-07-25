import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef} from "react";
import { addTeacherData } from "@/types/teacher";
import { toast } from "react-toastify";
import { createNewTeacher, getRole } from "@/api/teacher/TeacherApi";

export default function AddTeacherForm() {
  const toastId = useRef<null | number | string>(null)

  const {data} = useQuery({
    queryKey: ["roleName"],
    queryFn: getRole,
  });

  const {mutate, isPending} = useMutation({
    mutationFn: createNewTeacher,
    onError: (error) =>{
      toast.update(toastId.current!, {
        render: error.message,
        type:"error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored"
      });
    },
    onSuccess: (data) => {
      toast.update(toastId.current!,{
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored"
      });
      reset();
    }
  })

  const{
    register,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<addTeacherData>();


  const validateImageFile = (file: FileList | null) => {
    if (!file || !file[0]) {
      return "La foto del certificado de secundaria es obligatoria";
    }
    if (file.length > 1) {
      return "Solo se puede subir un archivo";
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file[0].type)) {
      return "Solo se permiten archivos de tipo imagen (JPEG, PNG, JPG)";
    }
    return true;
  };

  const validateRole = (value: string) => {
    const id = parseInt(value)
    if(isNaN(id)){
      return "Role Inválido";
    }
    return true;
  };

  const validateDepartment = (value: string) => {
    const id = parseInt(value)
    if(isNaN(id)){
      return "Centro Inválido";
    }
    return true;
  };

  const handleSendInscription = (formData: addTeacherData) =>{
    toastId.current = toast.loading("Agregando Docente...", {
      position:"top-center",
    });
    mutate(formData)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSendInscription)}
      noValidate
      hidden = {isPending}
      className=" bg-white rounded-sm shadow-md p-4 space-y-6 mt-5 py-9 mb-12 max-w-md ml-80"
    >
      <div className=" space-y-1 flex flex-col">
        <label
          htmlFor="name"
          className=" font-bold block text-center uppercase text-slate-700"
        >
          Nombres
        </label>
        <input
          type="text"
          id="name"
          placeholder="Ingrese sus nombres"
          className=" p-2"
          {...register("name", {
            required: "Los nombres son obligatorios",
            pattern: {
              value: /^[A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*(?: [A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*)?$/,
              message:
                "EL campo no puede contener números, ni espacios de más, debe ingresar obligatorio el primer nombre, cada nombre debe empezar por mayúscula",
            },
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>
      <div className=" space-y-1 flex flex-col">
        <label
          htmlFor="name"
          className=" block text-center uppercase text-slate-600 font-bold"
        >
          Apellidos
        </label>
        <input
          type="text"
          id="lastName"
          placeholder="Ingrese sus apellidos"
          className=" p-2"
          {...register("lastName", {
            required: "Los apellidos son obligatorios",
            pattern: {
              value: /^[A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*(?: [A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*)?$/,
              message:
                "EL campo no puede contener números, ni espacios de más, debe ingresar obligatorio el primer apellido, cada nombre debe empezar por mayúscula",
            },
          })}
        />
        {errors.lastName && (
          <ErrorMessage>{errors.lastName.message}</ErrorMessage>
        )}
      </div>
      
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="dni"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Identidad
        </label>
        <input
          type="text"
          id="dni"
          placeholder="Ingrese su número de identidad (Ej. 0824200000022)"
          className="p-2"
          {...register("dni", {
            required: "La identidad es obligatoria",
            pattern: {
              value: /^[0-9]{13}$/,
              message:
                "La identidad solo debe de contener números y debe de tener 13 números",
            },
          })}
        />
        {errors.dni && (
          <ErrorMessage>{errors.dni.message}</ErrorMessage>
        )}
      </div>
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="photo"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Foto Personal del docente
        </label>
        <input
          type="file"
          accept="image/*"
          id="photo"
          className="p-2 bg-gray-200 rounded-sm text-slate-600"
          {...register("photo", {
            required: "La foto del docente es obligatoria",
            validate: validateImageFile,
          })}
        />
        {errors.photo && (
          <ErrorMessage>
            {errors.photo.message}
          </ErrorMessage>
        )}
      </div>

      
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="phoneNumber"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Teléfono
        </label>
        <input
          type="text"
          id="phoneNumber"
          placeholder="Ingrese su número de teléfono (Ej. 22332233)"
          className="p-2"
          {...register("phoneNumber", {
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9]{8}$/,
              message: "El teléfono debe de tener 8 números",
            },
          })}
        />
        {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}
      </div>
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="email"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Correo Personal
        </label>
        <input
          type="email"
          id="email"
          placeholder="Ingrese su correo personal (Ej. correo@correo.com)"
          className="p-2"
          {...register("email", {
            required: "El correo personal es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Correo electrónico no válido",
            },
          })}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </div>

      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="regionalCenterId"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Departamento al que pertenece
        </label>
        <select
          id="regionalCenterId"
          className="p-2 text-slate-600"
          defaultValue={""}
          {...register("dept", {
            required: "El centro regional es obligatorio",
            validate : validateDepartment,
          })}
        >
          <option value="">
            ---Seleccione el Departamento al que pertenece---
          </option>
          {/*{regionalCenterOptions?.map((regionalCenterOption) => (
            <option
              key={regionalCenterOption.id}
              value={regionalCenterOption.id}
            >
              {regionalCenterOption.name}
            </option>
          ))}
        {errors.regionalCenterId && (
          <ErrorMessage>{errors.regionalCenterId.message}</ErrorMessage>
        )}*/}
        </select>
      </div>
      
      <div className="space-y-1 flex flex-col">
        <label
          htmlFor="regionalCenterId"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Rol
        </label>
        <select
          id="regionalCenterId"
          className="p-2 text-slate-600"
          defaultValue={""}
          {...register("role", {
            required: "El centro regional es obligatorio",
            validate : validateRole,
          })}
        >
          <option value="">
            ---Seleccione el Rol---
          </option>
          {/*{regionalCenterOptions?.map((regionalCenterOption) => (
            <option
              key={regionalCenterOption.id}
              value={regionalCenterOption.id}
            >
              {regionalCenterOption.name}
            </option>
          ))}
        
        {errors.regionalCenterId && (
          <ErrorMessage>{errors.regionalCenterId.message}</ErrorMessage>
        )}*/}
        </select>
      </div>

      <input
        type="submit"
        value="Guardar Docente"
        className="bg-tertiary w-full p-3 text-white uppercase font-bold hover:bg-tertiary/80 cursor-pointer transition-colors"
      />
    </form>
  );
}
