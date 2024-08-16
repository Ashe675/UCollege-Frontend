import { getClassesAvailabilityEnroll } from "@/api/student/StudentApi";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import ClassCard from "@/components/student/ClassCard";
import SectionCard from "@/components/student/SectionCard";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { DataEnrollClassesAvailability } from "@/types/student";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EnrollAddClass() {
  const setTitle = useAppStore((state) => state.setTitle);
  const user = useUserStore((state) => state.user);
  const [selectedClass, setSelectedClass] =
    useState<DataEnrollClassesAvailability>();
  const [showSections, setShowSections] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["ClasessAvailability", user.id],
    queryFn: getClassesAvailabilityEnroll,
    retry: false,
  });

  useEffect(() => {
    setTitle("Matricula - Adicionar Asignatura");
  }, [setTitle]);

  const handleClickClass = (clas: DataEnrollClassesAvailability) => {
    if (data && clas) {
      setSelectedClass(clas);
      setShowSections(true);
    }
  };

  return (
    <div className=" pt-8 px-2 md:px-6">
      <div className="flex justify-end w-full bg-transparent gap-5">
        {!showSections ? (
          <Link
            className="bg-indigo-600 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md flex gap-1 justify-between  hover:bg-indigo-700 transition-colors items-center"
            to={`/myspace/${PrivateRoutes.STUDENT_ENROLL}`}
          >
            <IconArrowBackUp stroke={3} />
            Regresar a Matricula
          </Link>
        ) : (
          <button
            className="bg-indigo-600 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md flex gap-1 justify-between  hover:bg-indigo-700 transition-colors items-center"
            onClick={() => {
              setSelectedClass(undefined);
              setShowSections(false);
            }}
          >
            <IconArrowBackUp stroke={3} />
            Regresar
          </button>
        )}
      </div>
      {!showSections && (
        <div className=" mt-8 ">
          <h2 className=" font-bold text-xl text-slate-600 uppercase">
            Clases Disponibles
          </h2>
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          {isLoading && (
            <div className="  w-full h-full flex items-center justify-center mt-20 ">
              <Spinner />
            </div>
          )}
          {data && !error && (
            <div className=" p-2 pt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
              {data.map((clas) => (
                <ClassCard
                  key={clas.id}
                  clas={clas}
                  onClick={() => handleClickClass(clas)}
                />
              ))}
            </div>
          )}
        </div>
      )}
      {showSections && selectedClass && (
        <div className=" mt-8 ">
          <h2 className=" font-bold text-xl text-slate-600 uppercase">
            Secciones Disponibles para{" "}
            <span className=" text-tertiary">{selectedClass.name}</span>
          </h2>
          {selectedClass.sections && (
            <div className=" p-2 pt-5 grid grid-cols-1 lg:grid-cols-2 gap-7">
              {selectedClass.sections.map((sect) => (
                <SectionCard
                  key={sect.id}
                  section={sect}
                  setShowSections={setShowSections}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
