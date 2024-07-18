import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { NewPasswordFormData } from "@/types/auth";
import ButtonSubmit from "../ButtonSubmit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetPassword } from "@/api/auth/AuthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "@/data/routes";

export default function NewPasswordForm({ token }: { token: string }) {
  const initialValues: NewPasswordFormData = {
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      localStorage.removeItem("AUTH_TOKEN");
      queryClient.invalidateQueries({ queryKey: ["token", token] });
      navigate(PublicRoutes.LOGIN);
    },
  });

  const sendConfirmPassword = (formData: NewPasswordFormData) => {
    mutate({ token, formData });
  };

  const password = watch("password");

  return (
    <form
      noValidate
      onSubmit={handleSubmit(sendConfirmPassword)}
      className=" bg-white mt-10 shadow-sm rounded-sm space-y-5 p-8 py-10 "
    >
      <div className=" space-y-4">
        <label
          htmlFor="password"
          className=" block text-slate-700 text-lg text-bold font-bold uppercase text-center"
        >
          Nueva Contraseña
        </label>
        <input
          id="password"
          type="password"
          className=" border border-slate-300 p-3 w-full rounded-sm"
          placeholder="Ingrese su nueva contraseña"
          {...register("password", {
            required: "La nueva contraseña es oblitaria",
            minLength: {
              value: 8,
              message: "La contraseña debe de tener mínimo 8 caracteres",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>
      <div className=" space-y-4">
        <label
          htmlFor="password_confirmation"
          className=" block text-slate-700 text-lg text-bold font-bold uppercase text-center"
        >
          Confirma tu nueva contraseña
        </label>
        <input
          id="password_confirmation"
          type="password"
          className=" border border-slate-300 p-3 w-full rounded-sm"
          placeholder="Repita su nueva contraseña"
          {...register("password_confirmation", {
            required: "Tienes que confirmar tu nueva contraseña",
            validate: (value) =>
              value === password || "Las contraseñas deben de ser las mismas",
          })}
        />
        {errors.password_confirmation && (
          <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
        )}
      </div>
      <ButtonSubmit value="Restablecer Contraseña" />
    </form>
  );
}
