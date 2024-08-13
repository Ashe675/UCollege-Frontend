import { getSectionById } from "@/api/department_head/DepartmentHeadApi";
import Spinner from "@/components/spinner/Spinner";
import { PrivateRoutes } from "@/data/routes";
import { useAppStore } from "@/stores/appStore";
import { IconCirclePlusFilled, IconSquareXFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import EditSectionForm from "../../../../components/department_head/EditSectionForm";
import SectionInfoField from "@/components/department_head/SectionInfoField";
import { abbreviateDays } from "@/utils/dictionaries";
import { convertTo12HourFormat } from "@/utils/date";
import DisclosureStudents from "../../../../components/department_head/DisclosureStudents";
import AddQuotasModal from "../../../../components/department_head/AddQuotasModal";
import CancelSectionModal from "@/components/department_head/CancelSectionModal";

export default function DetailSectionView() {
  const params = useParams();
  const sectionId = params.sectionId!;
  const [edit, setEdit] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["section", "detail", sectionId],
    queryFn: () => getSectionById(Number(sectionId)),
    retry: false,
  });

  const setTitle = useAppStore((state) => state.setTitle);

  useEffect(() => {
    setTitle("Periodo - Actual - Sección");
  }, [setTitle]);

  const navigate = useNavigate();
  const [isGrown, setIsGrown] = useState(true);

  const handleToggle = () => {
    setIsGrown(!isGrown);
    setTimeout(() => {
      navigate(`/myspace/${PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT}`);
    }, 500);
  };

  if (error) return <Navigate to={"/404"} />;

  if (isLoading)
    return (
      <div className=" mt-52">
        <Spinner />
      </div>
    );

  if (data) {
    const initalValues = {
      buildingId: data.classroom.building.id,
      classId: data.classId,
      classroomId: data.classroomId,
      days: data.section_Day.map((day) => day.day.id),
      FH: data.FH,
      IH: data.IH,
      quota: data.capacity,
      teacherId: data.teacherId,
    };

    return (
      <>
        <AddQuotasModal sectionId={data.id} />
        <CancelSectionModal sectionId={data.id} />
        <div className=" p-5 ">
          <div
            className={`${
              isGrown ? "animate-grow" : "animate-shrink"
            } rounded-sm h-full bg-white shadow-md relative flex flex-col pb-2`}
          >
            <h2 className=" max-sm:text-left uppercase font-bold text-center bg-secondary p-4 text-white rounded-t-sm">
              Sección <span>{data.code}</span>
            </h2>
            <IconSquareXFilled
              onClick={handleToggle}
              className=" text-red-600 absolute top-3 right-2 hover:cursor-pointer"
              size={30}
            />
            <section className=" grid grid-cols-1 lg:grid-cols-2">
              <div className="p-4 space-y-3 h-full w-full">
                <SectionInfoField label="Clase" info={data.class.name} />
                <SectionInfoField
                  label="Días"
                  info={abbreviateDays(
                    data.section_Day.map((day) => day.day.name)
                  )}
                />
                <SectionInfoField
                  label="Capacidad del Aula"
                  info={data.classroom.capacity.toString()}
                />
                <div className="flex gap-3 justify-between items-center">
                  <SectionInfoField
                    label="Cupos Totales de la Sección"
                    info={data.capacity.toString()}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigate(location.pathname + "?aumentarCupos=true");
                    }}
                    className=" bg-sky-500 p-3 rounded-md text-white uppercase font-bold hover:bg-sky-600 cursor-pointer transition-colors  text-sm flex items-center justify-center mt-7 gap-2"
                  >
                    <IconCirclePlusFilled stroke={3} />
                  </button>
                </div>
                <div className=" flex gap-3 justify-between">
                  <SectionInfoField
                    label="Hora Inical"
                    info={convertTo12HourFormat(data.IH)}
                  />
                  <SectionInfoField
                    label="Hora Final"
                    info={convertTo12HourFormat(data.FH)}
                  />
                </div>

                {!edit && (
                  <>
                    <div className="space-y-1 flex flex-col">
                      <label
                        htmlFor="teacherId"
                        className=" font-bold block uppercase  text-slate-600"
                      >
                        Docente
                      </label>
                      <div className=" p-2 text-slate-600 bg-slate-200 border border-slate-300 rounded-md py-3 text-sm/6">
                        {data.teacher.person.firstName}{" "}
                        {data.teacher.person.lastName}
                      </div>
                    </div>
                    <div className="space-y-1 flex flex-col">
                      <label
                        htmlFor="teacherId"
                        className=" font-bold block uppercase text-slate-600"
                      >
                        Edificio
                      </label>
                      <div className=" p-2 text-slate-600 bg-slate-200  border border-slate-300 rounded-md py-3 text-sm/6">
                        {data.classroom.building.code}
                      </div>
                    </div>
                    <div className="space-y-1 flex flex-col">
                      <label
                        htmlFor="teacherId"
                        className=" font-bold block uppercase text-slate-600"
                      >
                        Aula
                      </label>
                      <div className=" p-2 text-slate-600 bg-slate-200 border border-slate-300 rounded-md py-3 text-sm/6">
                        {data.classroom.code}
                      </div>
                    </div>
                  </>
                )}
                {edit && (
                  <EditSectionForm
                    edit={!edit}
                    setEdit = {setEdit}
                    initialValues={initalValues}
                    teacher={data.teacher}
                  />
                )}
              </div>

              <div className="p-4 space-y-3 h-full w-full">
                <SectionInfoField
                  label="Cupos Disponibles"
                  info={data.quotasAvailability.toString()}
                />

                <div className=" flex gap-3 justify-between">
                  <SectionInfoField
                    label="Total Matriculados"
                    info={data.matriculados.length.toString()}
                  />
                  <SectionInfoField
                    label="Total Lista de Espera"
                    info={data.waitingListCount.toString()}
                  />
                </div>
                <div className="space-y-1 flex flex-col">
                  <DisclosureStudents
                    students={data.matriculados}
                    title="Matriculados"
                  />
                </div>
                <div className="space-y-1 flex flex-col">
                  <DisclosureStudents
                    students={data.waitingList}
                    title="Lista de Espera"
                  />
                </div>
              </div>
            </section>
            <div className=" flex flex-wrap md:flex-nowrap gap-5 px-3 mb-3">
              {edit && (
                <>
                  <input
                    type="submit"
                    value="Guardar"
                    form="editSectionForm"
                    className=" bg-green-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-colors"
                  />
                  <input
                    type="button"
                    value="Cancelar"
                    onClick={() => setEdit(false)}
                    className=" bg-red-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
                  />
                </>
              )}
              {!edit && (
                <>
                  <input
                    type="button"
                    value="Editar"
                    onClick={() => setEdit(true)}
                    className=" bg-teal-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-teal-600 cursor-pointer transition-colors"
                  />
                  <input
                    type="button"
                    value="Cancelar Sección"
                    onClick={() => {navigate(location.pathname + "?cancelarSeccion=true")}}
                    className=" bg-red-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
