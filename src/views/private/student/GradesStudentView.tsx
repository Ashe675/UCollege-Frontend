import {
  getSectionsWithGrades,
  gradeToTeacher,
} from "@/api/student/StudentApi";
import ButtonCustomWithClick from "@/components/ButtonCustomWithClick";
import ErrorMessage from "@/components/ErrorMessage";
import ModalCustom from "@/components/ModalCustom";
import Spinner from "@/components/spinner/Spinner";
import { ObservationEnum } from "@/types/teacher";
import { getOBSColor, getOBSMessage } from "@/utils/dictionaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import { useMemo } from "react";

type GradeToTeacher = {
  grade: number;
};

export default function GradesStudentView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["sections", "grades"],
    queryFn: getSectionsWithGrades,
    retry : 2
  });

  const queryClient = useQueryClient()


  const [showModal, setShowModal] = useState(false);
  const toastId = useRef<null | number | string>(null);
  const [section, setSection] = useState<number>(0);

  const { mutate} = useMutation({
    mutationFn: gradeToTeacher,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({queryKey : ["sections", "grades"]})
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    },
  });

  const validateGrade = (grade: number) => {
    if (isNaN(grade) || grade < 0 || grade > 100) {
      return "Campo Inválido";
    }
    return true;
  };

  // const disabled = useMemo(() => {
  //   if (data) {
  //     return data.some((sect) => !sect.teacherGrade);
  //   }
  // }, [data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<GradeToTeacher>();

  const onSubmit = (formData: GradeToTeacher) => {
    toastId.current = toast.loading("Actualizando nota del docente...");
    mutate({ grade: formData.grade, sectionId: section });
    reset();
    setShowModal(false)
  };

  return (
    <div className=" h-full w-full pt-8 px-2 md:px-6 text-slate-600">
      <ModalCustom
        show={showModal}
        setShow={setShowModal}
        
      >
        <h2 className=" text-center text-lg p-3">
          Ingrese una calificación al docente
        </h2>
        <form
          id="gradeToTeacher"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-2 flex flex-col w-full sm:w-36 mx-auto "
        >
          <input
            type="number"
            id="quota"
            min={"0"}
            max={100}
            className=" p-2 text-slate-600 w-full  border border-slate-300 rounded-md py-3 text-md font-semibold"
            {...register("grade", {
              required: "La nota es obligatoria",
              validate: validateGrade,
            })}
          />
          {errors.grade && (
            <ErrorMessage className=" p-1">{errors.grade.message}</ErrorMessage>
          )}
          <input
            type="submit"
            value="Guardar"
            form="gradeToTeacher"
            className=" bg-green-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-colors mt-3"
          />
        </form>
      </ModalCustom>

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
                    <div
                      className={` font-semibold text-white rounded-full p-1 px-2 ${getOBSColor(
                        sect.obs as ObservationEnum
                      )} `}
                    >
                      Nota : <span>{sect.nota}%</span>
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
                  <ButtonCustomWithClick
                    onClick={() => {
                      setShowModal(true);
                      setSection(sect.section.id);
                      reset();
                    }}
                    className=" bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 text-sm "
                  >
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
