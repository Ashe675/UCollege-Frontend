import { FieldErrors, UseFormRegister } from "react-hook-form";
import type { SearchData } from "@/types/admission";
import ErrorMessage from "../ErrorMessage";

type SearchFormProps = {
  register: UseFormRegister<SearchData>;
  errors: FieldErrors<SearchData>;
};

export default function SearchForm({ register, errors }: SearchFormProps) {
  return (
    <>
      <div className=" w-full relative">
        <input
          type="search"
          className=" px-6 p-2 text-slate-600 w-full rounded-full border-2 border-slate-400 focus:border-tertiary focus:outline-none"
          placeholder="Ingrese su Identidad Ej.(0110100012345)"
          {...register("dni", {
            required: "Tiene que ingresar su identidad",
            pattern: {
              value: /^[0-9]{13}$/,
              message:
                "La identidad solo debe de contener números y debe de tener 13 números",
            },
          })}
        />
        {errors.dni && <ErrorMessage className=" absolute px-0 py-0 bg-transparent -bottom-12 text-pretty sm:-bottom-14 md:-bottom-8 text-xs sm:text-sm md:text-center md:px-4">{errors.dni.message}</ErrorMessage>}

      </div>
    </>
  );
}
