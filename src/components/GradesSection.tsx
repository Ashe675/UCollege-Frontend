import { SectionSpace } from "@/types/teacher";
import GradeStudentTable from "./teacher/GradeStudentTable";
import ButtonCustomWithClick from "./ButtonCustomWithClick";
import { IconBrandTelegram } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendEmailsWithGrades } from "@/api/teacher/TeacherApi";
import { toast } from "react-toastify";
import Spinner from "./spinner/Spinner";
import { useUserStore } from "@/stores/userStore";
import { isTeacher } from "@/utils/user";

type GradesSectionProps = {
  section: SectionSpace;
};

export default function GradesSection({ section }: GradesSectionProps) {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const { mutate, isPending } = useMutation({
    mutationFn: sendEmailsWithGrades,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["space", "section", section.id.toString()],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSendEmails = () => {
    mutate(section.id);
  };

  return (
    <div className=" h-full w-full flex  flex-col gap-y-3 justify-between py-2">
      {isTeacher(user.role.name) && (
        <>
          {isPending && <Spinner />}
          {!isPending && (
            <div className=" shadow-md ">
              <GradeStudentTable
                students={section.matriculados}
                sectionId={section.id}
                isAvailable={
                  !section.isSubmitGradeActive || section.allNotesNotificated
                }
              />
            </div>
          )}
          {!section.isSubmitGradeActive && (
            <div className=" text-slate-600">
              No hay proceso de entrega de notas activo.
            </div>
          )}
          {section.allNotesNotificated && section.isSubmitGradeActive && !!section.matriculados.length && (
            <div className=" text-slate-600">
              La notas ya fueron notificadas a los estudiantes.
            </div>
          )}
          {!isPending &&
            section.allNotesUpload &&
            !section.allNotesNotificated &&
            section.isSubmitGradeActive &&
            !!section.matriculados.length && (
              <div className=" w-full rounded-md justify-center flex">
                <ButtonCustomWithClick
                  onClick={handleSendEmails}
                  className=" bg-tertiary p-2 text-pretty text-sm font-bold text-white flex gap-1 px-3 max-w-96 shadow-md rounded-sm justify-center hover:bg-tertiary/90"
                >
                  Enviar notas por email
                  <IconBrandTelegram stroke={2} />
                </ButtonCustomWithClick>
              </div>
            )}
        </>
      )}
    </div>
  );
}
