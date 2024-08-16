import { getAcademicHistoryByCode } from "@/api/admission/AdmissionApi";
import HistoryAcademicStudent from "@/components/department_head/HistoryAcademicStudent";
import SearchSection from "@/components/department_head/SearchSection";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { SearchHistory } from "@/types/department_head";
import { IconSearch } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AcademicHistoryView() {
  const mutation = useMutation({
    mutationFn: getAcademicHistoryByCode,
  });

  const [active, setActive] = useState(true);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SearchHistory>();

  const handleSendDNI = (formData: SearchHistory) => {
    mutation.mutate(formData.code);
    setActive(false);
    reset();
  };

  return (
    <div className=" bg-primaryBlue h-full pt-10">
      <div className=" bg-white min-h-96 rounded-md shadow-md p-4 mx-4 lg:mx-10 mb-10">
        <form
          noValidate
          onSubmit={handleSubmit(handleSendDNI)}
          className="flex  pt-4 gap-3 mb-12"
        >
          <SearchSection register={register} errors={errors} />

          <button
            type="submit"
            className=" p-3 bg-tertiary hover:bg-tertiary/90 uppercase cursor-pointer text-white font-bold rounded-full"
          >
            <IconSearch stroke={3} color="#fff" className=" shadow-sm" />
          </button>
        </form>
        {mutation.isPending && (
          <div className=" flex items-center justify-center h-full mt-10 min-h-60">
            <Spinner />
          </div>
        )}
        {active && (
          <div className=" flex items-center justify-center h-full mt-10 min-h-60">
            <h2 className=" text-slate-400 font-bold">
              No hay información que mostrar
            </h2>
          </div>
        )}
        {mutation.data && <HistoryAcademicStudent data={mutation.data} />}
        {mutation.error && (
          <ErrorMessage>{mutation.error.message}</ErrorMessage>
        )}
      </div>
    </div>
  );
}
