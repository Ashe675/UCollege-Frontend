import { getOptionsCareesStudent } from "@/api/auth/AuthApi"
import SelectOptionCareerForm from "@/components/auth/SelectOptionCareerForm"
import SpinnerFull from "@/components/spinner/SpinnerFull"
import { PublicRoutes } from "@/data/routes"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useLocation } from "react-router-dom"

export default function SelectCareerView() {
  const location = useLocation()

  const { data, isError, isLoading } = useQuery({
    queryKey : ['optionsStudent', location.state?.userId || 0 ],
    queryFn : getOptionsCareesStudent,
    retry: false
  })

  if(!location.state?.userId) return <Navigate to={PublicRoutes.LOGIN} />
  if(isError) return <Navigate to={PublicRoutes.LOGIN}/>

  if(isLoading) return <SpinnerFull/>

  if(data)
  return (
    <div className="container mx-auto max-w-xl mt-10 p-4 sm:p-8">
      <h1 className=" font-black text-white text-4xl sm:text-5xl">¡Bienvenido a {data.regionalCenter}</h1>
      
      <p className=" text-white font-light text-xl mt-4">
        Selecciona la carrera a la que deseas <span className=" text-primary font-bold">pertenecer</span>.
      </p>
      <SelectOptionCareerForm options={data.options} />
    </div>
  )
}
