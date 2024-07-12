import Hero from "@/components/admission/Hero";
import SearchForm from "../../components/admission/SearchForm";
import { useForm } from "react-hook-form";
import { SearchData } from "@/types/admission";
import { IconSearch } from "@tabler/icons-react";
import ExamsDetails from "@/components/admission/ExamsDetails";
import { useMutation } from "@tanstack/react-query";
import { getInscriptionById } from "@/api/admission/AdmissionApi";
import Spinner from "../../components/spinner/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useState } from "react";

export default function Examenes() {
  const mutation = useMutation({
    mutationFn : getInscriptionById
  })

  const [active, setActive] = useState(true)

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SearchData>();

  const handleSendDNI = (formData: SearchData) => {
    mutation.mutate(formData.dni)
    setActive(false)
    reset();
  };

  return (
    <>
      <div style={{textAlign:"justify"}}>
      <Hero
      title="Exámenes"
      description="Bienvenido a la sección de Exámenes de Admisión. Aquí puedes verificar fácilmente qué exámenes necesitas realizar. Para comenzar, simplemente ingresa tu número de identidad en el buscador a continuación. Nuestro sistema te mostrará toda la información relevante sobre tus exámenes, incluyendo los puntajes para aprobarlos fechas, horarios y ubicaciones."
      className=" md:max-w-5xl pb-8"
    >
      <div className=" bg-white mt-10 min-h-96 rounded-sm shadow-sm p-4">
        <form
          noValidate
          onSubmit={handleSubmit(handleSendDNI)}
          className="flex  pt-4 gap-3 mb-12"
        >
          <SearchForm register={register} errors={errors} />

          <button
            type="submit"
            className=" p-3 bg-tertiary hover:bg-tertiary/90 uppercase cursor-pointer text-white font-bold rounded-full"
          >
            <IconSearch stroke={3} color="#fff" />
          </button>
        </form>
        
        {mutation.isPending && (<div className=" flex items-center justify-center h-full mt-10 min-h-60">
          <Spinner />
        </div>)}
        {active && <div className=" flex items-center justify-center h-full mt-10 min-h-60">
          <h2 className=" text-slate-400 font-bold">No hay información que mostrar</h2>
        </div>}
        {mutation.data && <ExamsDetails inscription={mutation.data} />}
        {mutation.error && <ErrorMessage>{mutation.error.message}</ErrorMessage>}
      </div>
    </Hero>
      </div>
    </>
  );
}
