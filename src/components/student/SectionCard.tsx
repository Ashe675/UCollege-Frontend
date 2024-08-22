import { SectionData } from "@/types/student";
import { convertTo12HourFormat } from "../../utils/date";
import { abbreviateDays } from "../../utils/dictionaries";
import InfoRowSection from "./InfoRowSection";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteEnrollClassByIdSection,
  enrollStudentBySectionId,
} from "@/api/student/StudentApi";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/userStore";
import Spinner from "../spinner/Spinner";

type SectionCardProps = {
  section: SectionData;
  setShowSections: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SectionCard({
  section,
  setShowSections,
}: SectionCardProps) {
  const user = useUserStore((state) => state.user);

  const queryClient = useQueryClient();

  const { mutate: mutateEnroll, isPending: isPendingEnroll } = useMutation({
    mutationFn: enrollStudentBySectionId,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.removeQueries({
        queryKey: ["ClasessAvailability", user.id],
      });
      setShowSections(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEnrollClassByIdSection,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.removeQueries({
        queryKey: ["ClasessAvailability", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["sectionsEnrollments", user.id],
      });
      setShowSections(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteEnroll = () => {
    mutate(section.id);
  };

  const handleEnrollStudent = () => {
    mutateEnroll(section.id);
  };

  if (isPending || isPendingEnroll)
    return (
      <div className="  w-full h-full flex items-center justify-center  ">
        <Spinner />
      </div>
    );

  return (
    <div
      className={`  ${
        section.quotes === 0 ? "bg-slate-300" : "bg-white"
      } shadow-md rounded-md w-full p-3 transition-all  hover:scale-105 cursor-pointer `}
    >
      <h3 className=" font-bold text-slate-600 text-lg uppercase ">
        <span className=" bg-teal-500 text-white p-1 px-2 rounded-md">
          {section.code}
        </span>
      </h3>
      {section.quotes === 0 && (
        <div className=" text-red-500 font-semibold pt-2 text-sm">
          SECCIÓN LLENA
        </div>
      )}
      {section.inEnrollment && (
        <div className=" text-green-500 font-semibold pt-2 text-sm">
          YA SE ENCUENTRA MATRICULADO/A EN ESTA SECCIÓN
        </div>
      )}
      {section.inWaitingList && (
        <div className=" text-amber-500 font-semibold pt-2 text-sm">
          SECCIÓN EN LISTA DE ESPERA
        </div>
      )}
      <div className=" font-semibold mt-3 text-slate-500 uppercase flex flex-col gap-2 justify-between flex-wrap text-sm">
        <InfoRowSection label="Docente">
          {section.teacher.firstName} {section.teacher.middleName}{" "}
          {section.teacher.lastName} {section.teacher.secondLastName}
        </InfoRowSection>
        <InfoRowSection label="Días">
          {abbreviateDays(section.days)}
        </InfoRowSection>
        <InfoRowSection label="Hora Inicial">
          {convertTo12HourFormat(section.IH)}
        </InfoRowSection>
        <InfoRowSection label="Hora Final">
          {convertTo12HourFormat(section.FH)}
        </InfoRowSection>
        <InfoRowSection label="Cupos">{section.quotes}</InfoRowSection>
        {section.waitingList > 0 && (
          <InfoRowSection label="Lista de espera">
            {section.waitingList}
          </InfoRowSection>
        )}
        <div className=" space-y-2">
          {!(section.inEnrollment || section.inWaitingList) && (
            <ButtonCustomWithClick
              className=" bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600"
              onClick={handleEnrollStudent}
            >
              {section.quotes === 0
                ? "Agregar Sección a lista de espera"
                : "Matricular Sección"}
            </ButtonCustomWithClick>
          )}
          {(section.inEnrollment || section.inWaitingList) && (
            <ButtonCustomWithClick
              onClick={handleDeleteEnroll}
              className=" bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Cancelar Sección
            </ButtonCustomWithClick>
          )}
        </div>
      </div>
    </div>
  );
}
