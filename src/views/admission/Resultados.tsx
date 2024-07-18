import Hero from "@/components/admission/Hero";
import SearchForm from "../../components/admission/SearchForm";
import { useForm } from "react-hook-form";
import { IconSearch } from "@tabler/icons-react";
import ResultsDetail from "@/components/admission/ResultsDetail";
import { useMutation } from "@tanstack/react-query";
import { getResultById } from "@/api/admission/AdmissionApi";
import { useState } from "react";
import Spinner from "@/components/spinner/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { SearchData } from "@/types/admission";
//import Spinner from "../../components/Spinner/Spinner";

// const results : ResultDetail = {
//   person: {
//     firstName: "Ana",
//     middleName: "María",
//     lastName: "González",
//     secondLastName: "Rodríguez",
//     dni: "87654321",
//     email: "ana.gonzalez@example.com",
//   },
//   results: [
//     {
//       testName: "Matemáticas",
//       code: "MATH101",
//       score: 85,
//       message: "APROBADO",
//     },
//     {
//       testName: "Lenguaje",
//       code: "LANG101",
//       score: 90,
//       message: "APROBADO",
//     },
//     {
//       testName: "Ciencias",
//       code: "SCI101",
//       score: 78,
//       message: "REPROBADO",
//     },
//   ],
//   opinion: {
//     id: 1,
//     message: "Fue admitido para su carrera principal",
//   },
// };

export default function Resultados() {
  const mutation = useMutation({
    mutationFn : getResultById
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
    <Hero
      title="Resultados"
      description="¡Felicidades por haber completado tus exámenes de admisión! Aquí podrás consultar los resultados de tus exámenes y descubrir si has sido admitido a la carrera de tus sueños. Para comenzar, simplemente ingresa tu número de identidad en el buscador a continuación."
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
        {mutation.data && <ResultsDetail results={mutation.data} />}
        {mutation.error && <ErrorMessage>{mutation.error.message}</ErrorMessage>}
      </div>
    </Hero>
  );
}
