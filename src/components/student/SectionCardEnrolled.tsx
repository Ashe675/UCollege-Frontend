import { DataSectionEnrollment } from "@/types/student";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import InfoRowSection from "./InfoRowSection";
import { abbreviateDays } from "@/utils/dictionaries";
import { convertTo12HourFormat } from "@/utils/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEnrollClassByIdSection } from "@/api/student/StudentApi";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/userStore";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from '../../data/routes';

type SectionCardEnrolledProps = {
  section: DataSectionEnrollment;
};

export default function SectionCardEnrolled({
  section,
}: SectionCardEnrolledProps) {
  const user = useUserStore((state) => state.user);
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEnrollClassByIdSection,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.removeQueries({
        queryKey: ["ClasessAvailability", user.id],
      });
      queryClient.removeQueries({
        queryKey: ["sectionsEnrollments", user.id],
      });
      navigate(`/myspace/${PrivateRoutes.STUDENT_ENROLL}`)
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteEnroll = () => {
    mutate(section.sectionId);
  };

  if (isPending)
    return (
      <div className="  w-full h-full flex items-center justify-center mt-20 ">
        <Spinner />
      </div>
    );

  if (section.sectionCode)
    return (
      <div
        className={`"bg-white"
    } shadow-md rounded-md w-full p-3 transition-all  hover:scale-105 cursor-pointer `}
      >
        <h3 className=" font-bold text-slate-600 text-lg uppercase ">
          <span className=" bg-teal-500 text-white p-1 px-2 rounded-md">
            {section.sectionCode}
          </span>
        </h3>
        <div className=" font-semibold mt-3 text-slate-500 uppercase flex flex-col gap-2 justify-between flex-wrap text-sm">
          <InfoRowSection label="Docente">
            {section.teacher.firstName} {section.teacher.middleName}{" "}
            {section.teacher.lastName} {section.teacher.secondLastName}
          </InfoRowSection>
          <InfoRowSection label="Días">
            {abbreviateDays(section.days)}
          </InfoRowSection>
          <InfoRowSection label="Hora Inicial">
            {convertTo12HourFormat(section.HI)}
          </InfoRowSection>
          <InfoRowSection label="Hora Final">
            {convertTo12HourFormat(section.HF)}
          </InfoRowSection>

          <div className=" space-y-2">
            <ButtonCustomWithClick
              onClick={handleDeleteEnroll}
              className=" bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Cancelar Sección
            </ButtonCustomWithClick>
          </div>
        </div>
      </div>
    );
}
