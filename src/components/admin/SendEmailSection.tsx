import { sendEmailsGrades } from "@/api/admission/AdmissionApi";
import { IconBrandTelegram } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage";
import SuccesUpload from "./SuccesUpload";

export default function SendEmailSection() {

  const mutation = useMutation({
    mutationFn: sendEmailsGrades,
  });

  const handleCLickSendEmails = () => {
    
    mutation.mutate();
   
  };

  return (
    <>
      <section className=" w-full md:max-w-4xl shadow-md p-3 bg-white mx-auto space-y-4 rounded-sm">
        <h2 className=" text-xl text-slate-700 text-center font-semibold">
          Enviar Resultados Por Email
        </h2>
        <button
          onClick={handleCLickSendEmails}
          disabled = {mutation.isPending}
          className= {`w-full md:max-w-sm bg-blue-500 p-2 uppercase font-semibold text-white mx-auto hover:bg-blue-600 flex justify-center gap-4 rounded-sm ${mutation.isPending && ' bg-gray-200 hover:bg-gray-200' }`}
        >
          Enviar Emails
          <IconBrandTelegram stroke={2} />
        </button>
        {mutation.isPending && (
          <div className=" p-10 max-w-lg mx-auto">
            <Spinner />
          </div>
        )}
        {mutation.error && (
          <ErrorMessage>{mutation.error.message}</ErrorMessage>
        )}
        {mutation.data && <SuccesUpload>{mutation.data}</SuccesUpload>}
      </section>
    </>
  );
}
