import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserLogin } from "@/api/auth/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserLoginForm } from "@/types/auth";
import { PublicRoutes } from "@/data/routes";

export default function LoginForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginForm>();
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn : UserLogin,
    onError : (error) => {
      toast.error(error.message, { position : 'top-center' })
    },
    onSuccess : (user) => {
      queryClient.invalidateQueries({queryKey : ['user']});
      if(user && user.verified) navigate(`/`)
      if(user && !user.verified) navigate(PublicRoutes.SELECT_CAREER, { state : { userId : user.id} })
    }
  })


  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      className=" bg-white rounded-sm shadow-md p-4 space-y-6 mt-5 py-9  sm:mb-0"
    >
      <div className=" space-y-1 flex flex-col">
        <label
          htmlFor="institutionalEmail"
          className=" font-bold block text-center uppercase text-slate-700"
        >
          Correo Electrónico:
        </label>
        <input
          id="institutionalEmail"
          type="email"
          placeholder="Ingrese su correo institucional (Ej. correo@correo.com)"
          className=" p-2"
          {...register("institutionalEmail", {
            required: "El correo electrónico es obligatorio",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Correo electrónico no válido",
            },
          })}
        />
        {errors.institutionalEmail && <ErrorMessage>{errors.institutionalEmail.message}</ErrorMessage>}
      </div>

      <div className=" space-y-1 flex flex-col">
        <label
          htmlFor="password"
          className=" font-bold block text-center uppercase text-slate-700"
        >
          Contraseña:
        </label>
        <input
          id="password"
          type="password"
          placeholder="Ingrese su contraseña"
          className=" p-2"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Iniciar Sesión"
        className="bg-tertiary w-full p-3 text-white uppercase font-bold hover:bg-tertiary/80 cursor-pointer transition-colors"
      />
    </form>
  );
}
