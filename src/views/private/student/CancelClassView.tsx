import { getClassesEnrollments } from "@/api/student/StudentApi";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import SectionCardEnrolled from "@/components/student/SectionCardEnrolled";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function CancelClassView() {
  const setTitle = useAppStore((state) => state.setTitle);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setTitle("Matricula - Cancelar Asignatura");
  }, [setTitle]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["sectionsEnrollments", user.id],
    queryFn: getClassesEnrollments,
    retry: false,
  });

  return (
    <div className=" pt-8 px-2 md:px-6">
      <div className="flex justify-end w-full bg-transparent gap-5">
        <Link
          className="bg-indigo-600 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md flex gap-1 justify-between  hover:bg-indigo-700 transition-colors items-center"
          to={`/myspace/${PrivateRoutes.STUDENT_ENROLL}`}
        >
          <IconArrowBackUp stroke={3} />
          Regresar a Matricula
        </Link>
      </div>
      <div className=" mt-8 ">
        <h2 className=" font-bold text-xl text-slate-600 uppercase">
          Secciones Matriculadas
        </h2>
        {isLoading && (
          <div className="  w-full h-full flex items-center justify-center mt-20 ">
            <Spinner />
          </div>
        )}
        {data && !error && (
          <div className=" p-2 pt-5 grid grid-cols-1 lg:grid-cols-2 gap-3">
            {data.map((sect) => (
              <SectionCardEnrolled key={sect.sectionId} section={sect} />
            ))}
          </div>
        )}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </div>
    </div>
  );
}
