import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { addTeacherData, Department } from "@/types/admin";
import { toast } from "react-toastify";
import { createNewTeacher, getDepts, getRoles } from "@/api/admin/AdminApi";
import { getRoleMessage } from "@/utils/dictionaries";

export default function AddTeacherForm() {
  const toastId = useRef<null | number | string>(null);

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const queryClient = useQueryClient()

  const { data: regionalCenters } = useQuery({
    queryKey: ["regionalCentersFaculty"],
    queryFn: getDepts,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createNewTeacher,
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
      queryClient.invalidateQueries({queryKey : ["teachers"]})
      reset();
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<addTeacherData>();

  const regionalCenter = watch("regionalCenter");
  const [deptos, setDeptos] = useState<Department[]>();
  const regionalCenterOptions = regionalCenters;

  useEffect(() => {
    const regionalId = parseInt(regionalCenter);
    if (!isNaN(regionalId)) {
      if (regionalCenterOptions && regionalCenter) {
        const options = regionalCenterOptions.find(
          (options) => options.id === +regionalCenter
        );
        if (options && options.departamentos.length) {
          setDeptos(options.departamentos);
        } else {
          setDeptos([]);
        }
      }
    }
  }, [regionalCenter, regionalCenterOptions]);

  const validateImageFile = (file: FileList | null) => {
    if (!file || !file[0]) {
      return "La foto del certificado de secundaria es obligatoria";
    }
    if (file.length > 1) {
      return "Solo se puede subir un archivo";
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file[0].type)) {
      return "Solo se permiten archivos de tipo imagen (JPEG, PNG, JPG, WEBP)";
    }
    return true;
  };

  const validateRole = (value: string) => {
    const id = parseInt(value);
    if (isNaN(id)) {
      return "Role Inválido";
    }
    return true;
  };

  const validateDepartment = (value: string) => {
    const id = parseInt(value);
    if (isNaN(id)) {
      return "Centro Inválido";
    }
    return true;
  };

  const handleSendInscription = (formData: addTeacherData) => {
    toastId.current = toast.loading("Agregando Docente...");
    mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSendInscription)}
      noValidate
      hidden={isPending}
      className="  p-4 space-y-3 lg:space-x-3 h-full w-full grid grid-cols-1 lg:grid-cols-2"
    >
      <div className=" flex flex-col justify-between max-lg:space-y-3">
        <div className=" space-y-1 flex flex-col">
          <label
            htmlFor="names"
            className=" font-bold block text-center uppercase text-slate-700"
          >
            Nombres
          </label>
          <input
            type="text"
            id="names"
            placeholder="Ingrese los nombres del docente"
            className=" p-2 border border-slate-200"
            {...register("names", {
              required: "Los nombres son obligatorios",
              pattern: {
                value: /^[A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*(?: [A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*)?$/,
                message:
                  "EL campo no puede contener números, ni espacios de más, debe ingresar obligatorio el primer nombre, cada nombre debe empezar por mayúscula",
              },
            })}
          />
          {errors.names && <ErrorMessage>{errors.names.message}</ErrorMessage>}
        </div>
        <div className=" space-y-1 flex flex-col">
          <label
            htmlFor="lastNames"
            className=" block text-center uppercase text-slate-600 font-bold"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Ingrese los apellidos del docente"
            className=" p-2 border border-slate-200"
            {...register("lastNames", {
              required: "Los apellidos son obligatorios",
              pattern: {
                value: /^[A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*(?: [A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*)?$/,
                message:
                  "EL campo no puede contener números, ni espacios de más, debe ingresar obligatorio el primer apellido, cada nombre debe empezar por mayúscula",
              },
            })}
          />
          {errors.lastNames && (
            <ErrorMessage>{errors.lastNames.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="dni"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Número de Identidad
          </label>
          <input
            type="text"
            id="dni"
            placeholder="Ingrese el número de identidad (Ej. 0824200000022)"
            className="p-2 border border-slate-200"
            {...register("dni", {
              required: "La identidad es obligatoria",
              pattern: {
                value: /^[0-9]{13}$/,
                message:
                  "La identidad solo debe de contener números y debe de tener 13 números",
              },
            })}
          />
          {errors.dni && <ErrorMessage>{errors.dni.message}</ErrorMessage>}
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
            className="p-2 bg-gray-200 rounded-sm text-slate-600 border border-slate-200"
            {...register("photo", {
              required: "La foto del docente es obligatoria",
              validate: validateImageFile,
            })}
          />
          {errors.photo && <ErrorMessage>{errors.photo.message}</ErrorMessage>}
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
            placeholder="Ingrese el número de teléfono (Ej. 22332233)"
            className="p-2 border border-slate-200"
            {...register("phoneNumber", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^[0-9]{8}$/,
                message: "El teléfono debe de tener 8 números",
              },
            })}
          />
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className=" flex flex-col justify-between max-lg:space-y-3 ">
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
            placeholder="Ingrese el correo personal (Ej. correo@correo.com)"
            className="p-2 border border-slate-200"
            {...register("email", {
              required: "El correo personal es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: "Correo electrónico no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="regionalCenter"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Centro Regional
          </label>
          <select
            id="regionalCenter"
            className="p-2 text-slate-600 border border-slate-200"
            defaultValue={""}
            {...register("regionalCenter", {
              required: "El centro regional es obligatorio",
              validate: validateDepartment,
            })}
          >
            <option value="">
              ---Seleccione el Centro Regional al que pertenece---
            </option>
            {regionalCenters?.map((regionalCenter) => (
              <option key={regionalCenter.id} value={regionalCenter.id}>
                {regionalCenter.name}
              </option>
            ))}
          </select>
          {errors.regionalCenter && (
            <ErrorMessage>{errors.regionalCenter.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="dept"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Departamento
          </label>
          <select
            id="dept"
            disabled={!regionalCenter}
            className="p-2 text-slate-600 border border-slate-200"
            {...register("dept", {
              required: "El departamento es obligatorio",
              validate: validateDepartment,
            })}
          >
            <option value="">
              ---Seleccione el Departamento al que pertenece---
            </option>
            {deptos?.map((depto) => (
              <option key={depto.Departament.id} value={depto.Departament.id}>
                {depto.Departament.name}
              </option>
            ))}
          </select>
          {errors.dept && <ErrorMessage>{errors.dept.message}</ErrorMessage>}
        </div>

        <div className="space-y-1 flex flex-col">
          <label
            htmlFor="role"
            className="block text-center uppercase text-slate-600 font-bold"
          >
            Rol
          </label>
          <select
            id="role"
            className="p-2 text-slate-600 border border-slate-200"
            defaultValue={""}
            {...register("role", {
              required: "El rol es obligatorio",
              validate: validateRole,
            })}
          >
            <option value="">---Seleccione el Rol del nuevo docente---</option>
            {roles &&
              roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {getRoleMessage(role.name)}
                </option>
              ))}
          </select>
          {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
        </div>
        {isPending ? (
          ""
        ) : (
          <input
            type="submit"
            value="Guardar Docente"
            className="bg-green-500 w-full p-3 text-white uppercase font-bold hover:bg-green-400 cursor-pointer transition-colors"
          />
        )}
      </div>
    </form>
  );
}
