import { SectionSpace } from "@/types/teacher";
import InfoSectionTab from "./InfoSectionTab";
import { abbreviateDays } from "@/utils/dictionaries";
import { convertTo12HourFormat } from "@/utils/date";
import MembersSectionTable from "./MembersSectionTable";
import { useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { isTeacher } from "@/utils/user";

type TabStudentsSectionProps = {
  section: SectionSpace;
};

export default function TabStudentsSection({
  section,
}: TabStudentsSectionProps) {
  const [showWaitingList, setShowWaitingList] = useState(false);
  const user = useUserStore((state) => state.user);

  return (
    <div className=" h-full flex flex-col pb-2">
      <section className=" p-3 bg-white rounded-md shadow-sm grid grid-cols-1 md:grid-cols-2 gap-x-3">
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
      {isTeacher(user.role.name) && !!section.waitingListStudents.length && (
        <div className=" w-full gap-4 flex py-3">
          {showWaitingList && (
            <button
              className="bg-cyan-500 p-2 rounded-md hover:bg-cyan-600 font-bold text-white uppercase text-sm"
              onClick={() => setShowWaitingList(false)}
            >
              Ver Matriculados
            </button>
          )}
          {!showWaitingList && (
            <button
              className="bg-yellow-500 p-2 rounded-md hover:bg-yellow-600 font-bold text-white uppercase text-sm"
              onClick={() => setShowWaitingList(true)}
            >
              Ver Lista de Espera
            </button>
          )}
        </div>
      )}
      <section className=" flex w-full h-full mt-2 shadow-sm rounded-md">
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
