import { getSectionsByDepartmentNexPeriod } from "@/api/department_head/DepartmentHeadApi";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { useUserStore } from "@/stores/userStore";
import { IconArrowBackUp, IconCirclePlusFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import SectionCardInfo from "@/components/department_head/SectionCardInfo";

export default function NextPeriodView() {
  const setTitle = useAppStore((state) => state.setTitle);
  const user = useUserStore((state) => state.user);
  const [filterQuery, setFilterQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["sections", "department", "next", user.id],
    queryFn: getSectionsByDepartmentNexPeriod,
    retry: false,
  });

  useEffect(() => {
    setTitle("Periodo - Próximo");
  }, [setTitle]);

  const itemsFiltered =
    filterQuery === ""
      ? data?.sectionsWithDetails
      : data?.sectionsWithDetails.filter((item) => {
          return (
            (item.teacher.person.firstName + " " + item.teacher.person.lastName)
              .toLowerCase()
              .includes(filterQuery.toLowerCase()) ||
            item.class.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
            item.code.toLowerCase().includes(filterQuery.toLowerCase())
          );
        });

  return (
    <div className=" p-5">
      <div className="flex justify-between w-full bg-transparent gap-5 ">
        <Link
          className="bg-green-500 text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md flex gap-1 justify-between  hover:bg-green-600 transition-colors items-center"
          to={`/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT_ADD_SECTION}`}
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
        <div className=" flex justify-between gap-4 mb-4 items-center flex-wrap">
          <h2 className="font-bold text-xl text-slate-600  uppercase w-[390px]">
            Secciones Para el Próximo Periodo
          </h2>
          <div className=" flex-1 min-w-72">
            <input
              type="text"
              className=" w-full p-2 rounded-md focus-visible:outline-slate-300 text-slate-600"
              onChange={(evt) => setFilterQuery(evt.target.value)}
              placeholder="Filtrar por nombre de la clase, nombre del docente, código de sección."
            />
          </div>
        </div>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        {isLoading && (
          <div className=" mt-10">
            <Spinner />
          </div>
        )}

        {data &&
          itemsFiltered &&
          (data.sectionsWithDetails.length ? (
            <>
              {itemsFiltered.length ? (
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-7 lg:px-4">
                  {itemsFiltered.map((section) => (
                    <SectionCardInfo
                      section={section}
                      key={section.id}
                      next={true}
                    />
                  ))}
                </div>
              ) : (
                <div className=" text-slate-500 text-center mt-10">
                  No se encontraron resultados.
                </div>
              )}
            </>
          ) : (
            <div className=" text-slate-500">No hay Secciones Creadas</div>
          ))}
      </section>
    </div>
  );
}
