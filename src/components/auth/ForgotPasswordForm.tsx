import { useForm } from "react-hook-form";
import ButtonSubmit from "../ButtonSubmit";
import ErrorMessage from "../ErrorMessage";
import { ForgotPasswordData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { sendInstructions } from "@/api/auth/AuthApi";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";

export default function ForgotPasswordForm() {
  const { mutate, isPending } = useMutation({
    mutationFn: sendInstructions,
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ForgotPasswordData>();

  const handleSendInstructions = (formData: ForgotPasswordData) => {
    mutate(formData);
    reset();
  };

  return (
    <form
      noValidate
      className=" bg-white mt-10 shadow-sm rounded-sm space-y-5 p-8 py-10"
      onSubmit={handleSubmit(handleSendInstructions)}
    >
      <div className=" space-y-4">
        <label
          htmlFor="institutionalEmail"
          className=" block text-slate-700 text-lg text-bold font-bold uppercase text-center"
        >
          Correo Institucional
        </label>
        <input
          id="institutionalEmail"
          type="email"
          className=" border border-slate-300 p-3 w-full rounded-sm"
          placeholder="Ingrese su correo institucional (Ej. example@unah.hn)"
          {...register("institutionalEmail", {
            required: "El Correo institucional es oblitario",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Correo electrónico no válido",
            },
          })}
        />
        {errors.institutionalEmail && (
          <ErrorMessage>{errors.institutionalEmail.message}</ErrorMessage>
        )}
      </div>
      {isPending ? (
        <div className=" mt-7">
            <Spinner />
        </div>
      ) : (
        <ButtonSubmit value="Enviar Instrucciones" className="" />
      )}
    </form>
  );
}
