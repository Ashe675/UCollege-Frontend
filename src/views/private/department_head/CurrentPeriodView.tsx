import { getSectionsByDepartment } from "@/api/department_head/DepartmentHeadApi";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { IconArrowBackUp, IconCirclePlusFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import SectionCardInfo from "@/components/department_head/SectionCardInfo";

export default function CurrentPeriodView() {
  const setTitle = useAppStore((state) => state.setTitle);
  const user = useUserStore((state) => state.user);

  const { data, isLoading, error } = useQuery({
    queryKey: ["sections", "department", "current", user.id],
    queryFn: getSectionsByDepartment,
  });

  useEffect(() => {
    setTitle("Periodo - Actual");
  }, [setTitle]);

  return (
    <div className=" p-5">
      <div className="flex justify-between w-full bg-transparent gap-5 ">
        <Link
          className="bg-green-500 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md flex gap-1 justify-between  hover:bg-green-600 transition-colors items-center"
          to={`/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT_ADD_SECTION}`}
        >
          <IconCirclePlusFilled stroke={3} />
          Crear Nueva Sección
        </Link>
        <Link
          className="bg-indigo-600 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md flex gap-1 justify-between  hover:bg-indigo-700 transition-colors items-center"
          to={`/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD}`}
        >
          <IconArrowBackUp stroke={3} />
          Regresar
        </Link>
      </div>
      <section className=" mt-8">
        <h2 className="font-bold text-xl text-slate-600 mb-5 uppercase">
          Secciones
        </h2>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        {isLoading && (
          <div className=" mt-10">
            <Spinner />
          </div>
        )}

        {data &&
          (data.sectionsWithDetails.length ? (
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-7 lg:px-4">
              {data.sectionsWithDetails.map((section) => (
                <SectionCardInfo section={section} key={section.id} next={false} />
              ))}
            </div>
          ) : (
            <div className=" text-slate-500">No hay Secciones Creadas</div>
          ))}
      </section>
    </div>
  );
}
