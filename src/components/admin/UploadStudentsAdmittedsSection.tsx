import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { IconFileUpload } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { uploadStudentsAdmitteds } from "@/api/admission/AdmissionApi";
import Spinner from "../spinner/Spinner";
import SuccesUpload from "./SuccesUpload";

type Students = {
  csvGrades: FileList;
};

export default function UploadStudentsAdmittedsSection() {
  const mutation = useMutation({
    mutationFn: uploadStudentsAdmitteds,
  });

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Students>();

  const validateCSVFile = (fileList: FileList) => {
    const file = fileList[0];
    if (!file) {
      return "El archivo es requerido";
    }
    if (fileList.length > 1) {
      return "Solo se puede subir un archivo";
    }
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      return "Solo se permiten archivos CSV";
    }
    return true;
  };

  const handleSendGrades = (formData: Students) => {
    const data = formData.csvGrades[0];
    mutation.mutate(data);
    reset();
  };

  return (
    <section className=" w-full md:max-w-4xl shadow-md p-3 bg-white mx-auto space-y-4 rounded-md lg:min-h-52 py-7">
      <h2 className=" text-xl  text-slate-700 text-center font-semibold">
        Ingresar Nuevos Estudiantes Admitidos
      </h2>
      <form
        onSubmit={handleSubmit(handleSendGrades)}
        noValidate
        className=" w-full sm:max-w-lg mx-auto space-y-3"
        hidden={mutation.isPending}
      >
        <div className="  flex flex-col rounded-md">
          <input
            type="file"
            id="csvGrades"
            className=" p-2 bg-gray-300"
            accept=".csv"
            {...register("csvGrades", {
              required: "Se tiene que seleccionar el archivo csv",
              validate: validateCSVFile,
            })}
          />
          <label htmlFor="csvGrades" className=" text-sm">
            Solo se aceptan archivos .csv
          </label>
          {errors.csvGrades && (
            <ErrorMessage>{errors.csvGrades.message}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          hidden={mutation.isPending}
          className={` transition-colors hover:bg-teal-600 cursor-pointer p-2 w-full bg-teal-500 text-center uppercase text-white font-bold flex justify-center gap-3 rounded-sm ${
            mutation.isPending && " bg-gray-200 hover:bg-gray-200"
          }`}
        >
          Ingresar Estudiantes
          <IconFileUpload stroke={2} />
        </button>
      </form>
      {mutation.isPending && (
        <div className=" p-10 max-w-lg mx-auto">
          <Spinner />
        </div>
      )}
      {mutation.error && <ErrorMessage>{mutation.error.message}</ErrorMessage>}
      {mutation.data && <SuccesUpload>{mutation.data}</SuccesUpload>}
    </section>
  );
}
