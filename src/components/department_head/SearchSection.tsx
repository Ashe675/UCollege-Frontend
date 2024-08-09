import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { SearchHistory } from "@/types/department_head";

type SearchFormProps = {
  register: UseFormRegister<SearchHistory>;
  errors: FieldErrors<SearchHistory>;
};

export default function SearchSection({ register, errors }: SearchFormProps) {
  return (
    <>
      <div className=" w-full relative">
        <input
          type="search"
          className=" px-6 p-2 text-slate-600 w-full rounded-full border-2 border-slate-400 focus:border-tertiary focus:outline-none"
          placeholder="Ingrese el número de cuenta del estudiante Ej.(20201030923)"
          {...register("code", {
            required: "Tiene que ingresar el número de cuenta.",
            pattern: {
              value: /^[0-9]{11}$/,
              message:
                "El número de cuenta solo debe de contener 11 números",
            },
          })}
        />
        {errors.code && <ErrorMessage className=" absolute px-0 py-0 bg-transparent -bottom-12 text-pretty sm:-bottom-14 md:-bottom-8 text-xs sm:text-sm md:text-center md:px-4">{errors.code.message}</ErrorMessage>}
      </div>
    </>
  );
}