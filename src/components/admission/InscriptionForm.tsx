import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { createInscription, getRegionalCenters } from "@/api/admission/AdmissionApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { RegionalCareers } from "@/types/admission";
import { InscriptionData } from '../../types/admission/index';
import { toast } from "react-toastify";

export default function InscriptionForm() {
  const toastId = useRef<null | number | string>(null)

  const { data } = useQuery({
    queryKey: ["regionalCenters"],
    queryFn: getRegionalCenters,
  });

  const { mutate, isPending } = useMutation({
    mutationFn : createInscription,
    onError : (error) =>{
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme : 'colored'
      });
    },
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme : 'colored'
      });
      reset();
    }
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<InscriptionData>();

  const regionalCenter = watch("regionalCenterId");
  const [careers, setCareers] = useState<RegionalCareers>();
  const regionalCenterOptions = data;

  useEffect(() => {
    const regionalId = parseInt(regionalCenter)
    if(!isNaN(regionalId)){
      if (regionalCenterOptions && regionalCenter) {
        const options = regionalCenterOptions[+regionalCenter - 1];
        if (options.regionalCentersCareer.length) {
          setCareers(options.regionalCentersCareer);
        } else {
          setCareers([]);
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
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file[0].type)) {
      return "Solo se permiten archivos de tipo imagen (JPEG, PNG, JPG)";
    }
    return true;
  };

  const validFirstCareer = (value: string) => {
    const id = parseInt(value)
    if(isNaN(id)){
      return "Carrera Inválida";
    }
    if (parseInt(careerSecond) === id) {
      return "La carrera primaria y la secundaria deben de ser distintas";
    }
    return true;
  };

  const validSecondCareer = (value: string) => {
    const id = parseInt(value)
    if(isNaN(id)){
      return "Carrera Inválida";
    }
    if (parseInt(career) === id) {
      return "La carrera primaria y la secundaria deben de ser distintas";
    }
    return true;
  };

  const validateCenter = (value: string) => {
    const id = parseInt(value)
    if(isNaN(id)){
      return "Centro Inválido";
    }
    return true;
  };

  const handleSendInscription = (formData: InscriptionData) => {
    toastId.current = toast.loading("Inscribiendose...", {
      position: "top-center",
    });
    mutate(formData);
  };

  const careerSecond = watch("secondaryCareerId");
  const career = watch("principalCareerId");

  return (
    <form
      onSubmit={handleSubmit(handleSendInscription)}
      noValidate
      hidden = {isPending}
      className=" bg-white rounded-sm shadow-md p-4 space-y-6 mt-5 py-9 mb-12"
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
          htmlFor="regionalCenterId"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Centro Regional
        </label>
        <select
          id="regionalCenterId"
          className="p-2 text-slate-600"
          defaultValue={""}
          {...register("regionalCenterId", {
            required: "El centro regional es obligatorio",
            validate : validateCenter,
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
        )}
      </div>
      <div className=" space-y-1 flex flex-col">
        <label
          htmlFor="principalCareerId"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Carrera Principal
        </label>
        <select
          disabled={!regionalCenter}
          id="principalCareerId"
          className="p-2 text-slate-600"
          {...register("principalCareerId", {
            required: "La carrera principal es obligatoria",
            validate: validFirstCareer,
          })}
        >
          <option value="">---Seleccione su carrera principal---</option>
          {careers?.map((career) => (
            <option value={career.career.id} key={career.career.id}>
              {career.career.name}
            </option>
          ))}
        </select>
        {errors.principalCareerId && (
          <ErrorMessage>{errors.principalCareerId.message}</ErrorMessage>
        )}
      </div>
      <div className=" space-y-1 flex flex-col">
        <label
          htmlFor="secondaryCareerId"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Carrera Secundaria
        </label>
        <select
          disabled={!regionalCenter}
          id="secondaryCareerId"
          className="p-2 text-slate-600"
          {...register("secondaryCareerId", {
            required: "La carrera secundaria es obligatoria",
            validate: validSecondCareer,
          })}
        >
          <option value="">---Seleccione su carrera secundaria---</option>
          {careers?.map((career) => (
            <option value={career.career.id} key={career.career.id}>
              {career.career.name}
            </option>
          ))}
        </select>
        {errors.secondaryCareerId && (
          <ErrorMessage>{errors.secondaryCareerId.message}</ErrorMessage>
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
          placeholder="Ingrese su Número de Identidad - Ej. (0110100012345)"
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
          htmlFor="photoCertificate"
          className="block text-center uppercase text-slate-600 font-bold"
        >
          Foto del Certificado de Secundaria
        </label>
        <input
          type="file"
          accept="image/*"
          id="photoCertificate"
          className="p-2 bg-gray-200 rounded-sm text-slate-600"
          {...register("photoCertificate", {
            required: "La foto del certificado de secundaria es obligatoria",
            validate: validateImageFile,
          })}
        />
        {errors.photoCertificate && (
          <ErrorMessage>
            {errors.photoCertificate.message}
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
          placeholder="Ingrese su número de teléfono - Ej. (99557711)"
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
          placeholder="Ingrese su correo personal"
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

      <input
        type="submit"
        value="Inscribirse"
        className="bg-tertiary w-full p-3 text-white uppercase font-bold hover:bg-tertiary/80 cursor-pointer transition-colors"
      />
    </form>
  );
}
