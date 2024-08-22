import { SectionWithDetails } from "@/types/department_head";
import InfoRowSection from "../student/InfoRowSection";
import { abbreviateDays } from "@/utils/dictionaries";
import { convertTo12HourFormat } from "@/utils/date";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";

type SectionCardInfoProps = {
  section: SectionWithDetails;
  next: boolean;
};

export default function SectionCardInfo({
  section,
  next,
}: SectionCardInfoProps) {
  return (
    <Link
      to={
        next
          ? `/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT_VIEW_SECTION}/${section.id}`
          : `/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT_VIEW_SECTION}/${section.id}`
      }
      className={`  ${
        section.quotasAvailability === 0 ? "bg-slate-300" : "bg-white"
      } shadow-md rounded-md w-full p-3 transition-all  hover:scale-105 cursor-pointer `}
    >
      <h3 className="bg-teal-500 uppercase text-white text-md font-bold p-2 mb-2 rounded-md">
        {section.class.name}
      </h3>
      <h3 className=" font-bold text-slate-600 text-md uppercase ">
        <span className=" bg-teal-500 text-white p-1 px-2 rounded-md">
          {section.code}
        </span>
      </h3>
      {section.quotasAvailability === 0 && (
        <div className=" text-red-500 font-semibold pt-2 text-sm">
          SECCIÓN LLENA
        </div>
      )}
      <div className=" font-semibold mt-3 text-slate-500 uppercase flex flex-col gap-2 justify-between flex-wrap text-sm">
        <InfoRowSection label="Docente">
          {section.teacher.person.firstName} {section.teacher.person.middleName}{" "}
          {section.teacher.person.lastName}{" "}
          {section.teacher.person.secondLastName}
        </InfoRowSection>
        <InfoRowSection label="Días">
          {abbreviateDays(section.section_Day.map((day) => day.day.name))}
        </InfoRowSection>
        <InfoRowSection label="Hora Inicial">
          {convertTo12HourFormat(section.IH)}
        </InfoRowSection>
        <InfoRowSection label="Hora Final">
          {convertTo12HourFormat(section.FH)}
        </InfoRowSection>
        <InfoRowSection label="Edificio">
          {section.classroom.building.code}
        </InfoRowSection>
        <InfoRowSection label="Aula">{section.classroom.code}</InfoRowSection>
        <InfoRowSection label="Cupos">
          {section.quotasAvailability}
        </InfoRowSection>
        <InfoRowSection label="Matriculados">
          {section.capacity - section.quotasAvailability }
        </InfoRowSection>
        <InfoRowSection label="Lista de espera">
          {section.waitingListCount}
        </InfoRowSection>
      </div>
    </Link>
  );
}
