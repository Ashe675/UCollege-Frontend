import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { addTeacher } from "@/api/auth/AuthApi";
import { toast } from "react-toastify";
import { Teacher } from "@/types/teacher";

export default function AddTeacher() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Teacher>();

  const {mutate} = useMutation({
    mutationFn : addTeacher,
    onError : (error) => {
      toast.error(error.message, { position : 'top-center' })
    }
  })
 

  const handleAddTeacher = (formData: Teacher) => mutate(formData);

  return (
    <>
      <div>
          <form onSubmit={handleSubmit(handleAddTeacher)}
            noValidate
            className="bg-white rounded-sm shadow-md p-4 space-y-6 mt-5 py-6 mx-auto max-w-md rounded-md">
              <div className="space-y-1 flex flex-col">
                <label htmlFor="nombre" className=" font-bold block text-center uppercase text-slate-700">Nombre Completo</label>
                <input id ="nombre" 
                  type = "text" 
                  placeholder = "Ingrese el nombre del docente"
                  className = "p-2 border border-gray-300"
                  {...register("name", {
                    required: "Debe ingresar el Nombre del docente",
                    pattern: {
                      value: /^[A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*(?: [A-ZÀ-Ÿ][a-zA-ZÀ-ÿ]*)?$/,
                      message:
                        "EL campo no puede contener números cada nombre debe empezar por mayúscula",
                    },
                  })}
                  />
                  {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                  )}
              </div>
              <div className="space-y-1 flex flex-col">
                <label htmlFor="nombre" className=" font-bold block text-center uppercase text-slate-700">Número de Empleado</label>
                <input id ="nombre" 
                  type = "text" 
                  placeholder = "Ingrese el Número de Empleado"
                  className = "p-2 border border-gray-200"
                  {...register("numberEmployee", {
                    required: "Debe Ingresar el Número de Empleado",
                  })}
                  />
                  {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                  )}
              </div>
              <div className="space-y-1 flex flex-col">
                <label
                  htmlFor="regionalCenterId"
                  className="block text-center uppercase text-slate-600 font-bold"
                >
                  Centro Regional
                </label>
                <select name="" id="regionalCenterId"
                  className="p-2 text-slate-600">
                  <option value="1">CU</option>
                </select>
                {/*<select
                  id="regionalCenterId"
                  className="p-2 text-slate-600"
                  defaultValue={""}
                  {...register("regionalCenter", {
                    required: "El centro regional es obligatorio",
                  })}
                >
                  <option value="">
                    ---Seleccione el centro regional donde desea estudiar---
                  </option>
                  {regionalCenterOptions?.map((regionalCenterOption) => (
                    <option
                      key={regionalCenterOption.id}
                      value={regionalCenterOption.id}
                    >
                      {regionalCenterOption.name}
                    </option>
                  ))}
                </select>
                {errors.regionalCenterId && (
                  <ErrorMessage>{errors.regionalCenterId.message}</ErrorMessage>
                )}*/}
              </div>
              <div className="space-y-1 flex flex-col">
                <label
                  htmlFor="photoCertificate"
                  className="block text-center uppercase text-slate-600 font-bold"
                >
                  Ingrese una foto personal
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="photoCertificate"
                  className="p-2 bg-gray-200 rounded-sm text-slate-600"
                  {...register("photo", {
                    required: "La foto es obligatoria",
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
                  htmlFor="department"
                  className="block text-center uppercase text-slate-600 font-bold"
                >
                  Departamento al que pertenece
                </label>
                <select name="" id="regionalCenterId"
                  className="p-2 text-slate-600">
                  <option value="1">CU</option>
                </select>
                {/*<select
                  id="regionalCenterId"
                  className="p-2 text-slate-600"
                  defaultValue={""}
                  {...register("regionalCenter", {
                    required: "El centro regional es obligatorio",
                  })}
                >
                  <option value="">
                    ---Seleccione el centro regional donde desea estudiar---
                  </option>
                  {regionalCenterOptions?.map((regionalCenterOption) => (
                    <option
                      key={regionalCenterOption.id}
                      value={regionalCenterOption.id}
                    >
                      {regionalCenterOption.name}
                    </option>
                  ))}
                </select>
                {errors.regionalCenterId && (
                  <ErrorMessage>{errors.regionalCenterId.message}</ErrorMessage>
                )}*/}
              </div>
              <input
                type="submit"
                value="Inscribirse"
                className="bg-tertiary w-full p-3 text-white uppercase font-bold hover:bg-tertiary/80 cursor-pointer transition-colors"
              />
        </form>
      </div>
    </>
  );
}
