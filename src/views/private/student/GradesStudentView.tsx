import { getSectionsWithGrades } from "@/api/student/StudentApi";
import ButtonCustomWithClick from "@/components/ButtonCustomWithClick";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/spinner/Spinner";
import { ObservationEnum } from "@/types/teacher";
import { getOBSColor, getOBSMessage } from "@/utils/dictionaries";
import { useQuery } from "@tanstack/react-query";
// import { useMemo } from "react";

export default function GradesStudentView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sections", "grades"],
    queryFn: getSectionsWithGrades,
  });

  // const disabled = useMemo(() => {
  //   if (data) {
  //     return data.some((sect) => !sect.teacherGrade);
  //   }
  // }, [data]);

  return (
    <div className=" h-full w-full pt-8 px-2 md:px-6 text-slate-600">
      {isLoading && (
        <div className=" h-full flex items-center">
          <Spinner />
        </div>
      )}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {data &&
        (data.length ? (
          <div className=" flex flex-col max-w-2xl gap-3 flex-wrap mx-auto ">
            <h1 className=" text-slate-700 font-semibold text-2xl">
              Mis Clases
            </h1>
            {data.map((sect) => (
              <div className=" bg-white shadow-md rounded-md p-3 flex flex-col gap-2">
                <div className=" font-semibold text-center text-lg">
                  {sect.className} - {sect.sectionCode}
                </div>
                {sect.teacherGrade ? (
                  <>
                    <div className={` font-semibold text-white rounded-full p-1 px-2 ${getOBSColor(
                        sect.obs as ObservationEnum
                      )} `}>
                      Nota : <span>{sect.nota} 44%</span>
                    </div>
                    <div
                      className={` p-1 px-2 text-white rounded-full font-semibold ${getOBSColor(
                        sect.obs as ObservationEnum
                      )} `}
                    >
                      {getOBSMessage(sect.obs as ObservationEnum)}
                    </div>
                  </>
                ) : (
                  <ButtonCustomWithClick className=" bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 text-sm ">
                    Calificar Docente
                  </ButtonCustomWithClick>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>No data</div>
        ))}
    </div>
  );
}
