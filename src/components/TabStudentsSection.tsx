import { SectionSpace } from "@/types/teacher";
import InfoSectionTab from "./InfoSectionTab";
import { abbreviateDays } from "@/utils/dictionaries";
import { convertTo12HourFormat } from "@/utils/date";
import MembersSectionTable from "./MembersSectionTable";
import { useRef, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { isTeacher } from "@/utils/user";
import { getStudentsEnrollmentsExcel } from "@/api/teacher/TeacherApi";
import { toast } from "react-toastify";

type TabStudentsSectionProps = {
  section: SectionSpace;
};

export default function TabStudentsSection({
  section,
}: TabStudentsSectionProps) {
  const [showWaitingList, setShowWaitingList] = useState(false);
  const user = useUserStore((state) => state.user);

  const toastId = useRef<null | number | string>(null);
  const [buttonDeactive, setButtonDeactive] = useState(false);

  // Función para descargar el archivo CSV
  function downloadEXCEL(data: Blob, filename: string) {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
  }

  async function handleGetEnrollments() {
    try {
      toastId.current = toast.loading("Descargando archivo...");
      setButtonDeactive(true);
      const data = await getStudentsEnrollmentsExcel(section.id);
      downloadEXCEL(data, `Estudiantes_Matriculados_Seccion_${section.code}`);
      toast.update(toastId.current!, {
        render: "¡Archivo descargado correctamente!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setButtonDeactive(false);
    } catch (error) {
      toast.update(toastId.current!, {
        render: (error as Error).message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setButtonDeactive(false);
    }
  }

  return (
    <div className=" h-full flex flex-col pb-2">
      <section className=" p-3 bg-white rounded-md shadow-md grid grid-cols-1 md:grid-cols-2 gap-x-3">
        <div className=" flex justify-around flex-col">
          <InfoSectionTab title="Clase" info={section.class.name} />
          <InfoSectionTab title="Sección" info={section.code} />
          <InfoSectionTab title="Aula" info={section.classroom.code} />
          <InfoSectionTab
            title="Edificio"
            info={section.classroom.building.code}
          />
          <InfoSectionTab
            title="Días"
            info={abbreviateDays(
              section.section_Day.map((day) => day.day.name)
            )}
          />
        </div>
        <div className=" flex justify-around flex-col">
          <InfoSectionTab
            title="Hora Inicial"
            info={convertTo12HourFormat(section.IH)}
          />
          <InfoSectionTab
            title="Hora Final"
            info={convertTo12HourFormat(section.FH)}
          />
          <InfoSectionTab
            title="Maestro"
            info={
              section.teacher.person.firstName +
              " " +
              (section.teacher.person.middleName
                ? section.teacher.person.middleName
                : "") +
              " " +
              section.teacher.person.lastName +
              " " +
              (section.teacher.person.secondLastName
                ? section.teacher.person.secondLastName
                : "")
            }
          />
          <InfoSectionTab
            title="Unidades Valorativas"
            info={section.class.UV + ""}
          />
          <InfoSectionTab
            title="Centro"
            info={section.classroom.building.regionalCenter.name}
          />
        </div>
      </section>
      <div className=" w-full gap-4 flex py-2 pt-3">
        {!showWaitingList &&
          !!section.matriculados.length &&
          isTeacher(user.role.name) && (
            <button
              className="bg-green-500 p-2 rounded-sm hover:bg-green-600 font-bold text-white uppercase text-sm disabled:bg-slate-400 disabled:cursor-default"
              onClick={handleGetEnrollments}
              disabled={buttonDeactive}
            >
              Descargar Listado Estudiantes
            </button>
          )}
        {isTeacher(user.role.name) && !!section.waitingListStudents.length && (
          <>
            {showWaitingList && (
              <button
                className="bg-cyan-500 p-2 rounded-sm hover:bg-cyan-600 font-bold text-white uppercase text-sm"
                onClick={() => setShowWaitingList(false)}
              >
                Ver Matriculados
              </button>
            )}
            {!showWaitingList && (
              <button
                className="bg-orange-500 p-2 rounded-sm hover:bg-orange-600 font-bold text-white uppercase text-sm"
                onClick={() => setShowWaitingList(true)}
              >
                Ver Lista de Espera
              </button>
            )}
          </>
        )}
      </div>
      <section className=" flex w-full h-full mt-1 shadow-md rounded-md">
        {!showWaitingList && (
          <MembersSectionTable
            teacher={section.teacher}
            students={section.matriculados}
          />
        )}
        {showWaitingList && (
          <MembersSectionTable
            teacher={section.teacher}
            students={section.waitingListStudents}
          />
        )}
      </section>
    </div>
  );
}
