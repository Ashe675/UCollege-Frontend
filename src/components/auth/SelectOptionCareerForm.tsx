import {
  OptionsCareerStudent,
  RegionalCenterFacultyCareerId,
} from "@/types/auth";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import ButtonSubmit from "../ButtonSubmit";
import ButtonCustom from "../ButtonCustom";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "@/data/routes";
import { useMutation } from "@tanstack/react-query";
import { selectCareerStudent } from "@/api/enroll/EnrollApi";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";

export default function SelectOptionCareerForm({
  options,
}: {
  options: OptionsCareerStudent["options"];
}) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<RegionalCenterFacultyCareerId>();

  const validateOption = (value: string) => {
    const id = parseInt(value)
    if(isNaN(id) || id < 1 ){
      return "Opción Inválida";
    }
    return true;
  };

  const {mutate, isPending} = useMutation({
    mutationFn : selectCareerStudent,
    onError : (error) => {
        toast.error(error.message)
    },
    onSuccess : (data) => {
        toast.success(data)
        navigate('/')
    }
  })

  const navigate = useNavigate()

  const handleSendOption = (formData: RegionalCenterFacultyCareerId) => mutate(formData)

  if(isPending) return <Spinner/>

  return (
    <form
      noValidate
      onSubmit={handleSubmit(handleSendOption)}
      className=" bg-white w-full shadow-sm rounded-md space-y-4 p-5 mt-4"
    >
      <div className=" space-y-2">
        <label htmlFor="optionId" className=" block text-center font-bold uppercase text-slate-600">Carrera</label>
        <select
        className=" p-3 border border-slate-300 rounded-sm w-full"
          id="regionalCenterFacultyCareerId"
          {...register("optionId", {
            required: "Seleccione una opción",
            validate : validateOption
          })}
        >
          <option className=" p-2" value="">---Seleccione una opción---</option>
          {options.map((option) => (
            <option className=" p-2" key={option.id} value={option.id}>
              {option.regionalCenter_Faculty_Career.career.name}
            </option>
          ))}
        </select>
        {errors.optionId && <ErrorMessage>{errors.optionId.message}</ErrorMessage>}
      </div>
      <ButtonSubmit value="Enviar" />
      <div onClick={()=> navigate(PublicRoutes.LOGIN)}><ButtonCustom className=" bg-red-600 hover:bg-red-500">Ahora No</ButtonCustom></div>
    </form>
  );
}
