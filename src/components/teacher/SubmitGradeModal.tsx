import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { uploadGradeForStudent } from "@/api/teacher/TeacherApi";
import {
  ObservationEnum,
  StudentSectionMember,
  UploadGradeForStudentForm,
} from "@/types/teacher";
import { getOBSMessage } from "@/utils/dictionaries";

type SubmitGradeModalProps = {
  sectionId: number;
  student: StudentSectionMember | undefined;
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
  setStudentSelected: Dispatch<
    React.SetStateAction<StudentSectionMember | undefined>
  >;
};

export default function SubmitGradeModal({
  sectionId,
  student,
  setStudentSelected,
  show,
  setShow,
}: SubmitGradeModalProps) {
  const toastId = useRef<null | number | string>(null);
  const queryClient = useQueryClient();

  const initialValues : UploadGradeForStudentForm = {
    grade : student?.grade ? student.grade : 0,
    obs : student?.OBS ? student.OBS : '' as ObservationEnum,
  }

  const { mutate, isPending } = useMutation({
    mutationFn: uploadGradeForStudent,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({
        queryKey: ["space", "section", sectionId.toString()],
      });
      setShow(false);
      setStudentSelected(undefined);
      reset();
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

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UploadGradeForStudentForm>({defaultValues : initialValues});

  const validateGrade = (grade: number) => {
    if (isNaN(grade) || grade < 0 || grade > 100) {
      return "La nota debe estar entre 0 y 100";
    }
    return true;
  };

  const validateOBS = (obs: string) => {
    if (!Object.values(ObservationEnum).includes(obs as ObservationEnum)) {
      return "Campo inválido";
    }
  };

  const onSubmit = (formData: UploadGradeForStudentForm) => {
    if (student) {
      toastId.current = toast.loading("Actualizando Nota...");
      mutate({
        sectionId,
        identificationCode: student.identificationCode,
        formData,
      });
    }
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            if (!isPending) {
              setShow(false);
              setStudentSelected(undefined);
              reset();
            }
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all p-10  max-w-2xl">
                  <div className="">
                    <Dialog.Title
                      as="h3"
                      className="font-bold text-slate-700 text-2xl   my-5"
                    >
                      Ingrese la nota del alumno{" "}
                      <span className=" text-tertiary font-semibold">
                        {student?.person.firstName +
                          " " +
                          student?.person.lastName}
                      </span>{" "}
                      con número de cuenta{" "}
                      <span className=" text-tertiary font-semibold">
                        {student?.identificationCode}
                      </span>
                      .
                    </Dialog.Title>
                    <form
                      id="updateGradeForm"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                      className=" space-y-2 flex flex-col w-full "
                    >
                      <div className=" space-y-1 flex flex-col">
                        <label
                          htmlFor="obs"
                          className=" font-bold block text-center uppercase text-slate-600"
                        >
                          Observación
                        </label>
                        <select
                          className="p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6 disabled:bg-slate-300"
                          defaultValue={student?.OBS ? student.OBS : ''}
                          disabled={isPending}
                          id="obs"
                          {...register("obs", {
                            required: "La observación es obligatoria",
                            validate: validateOBS,
                          })}
                        >
                          <option value={""}>
                            ---Seleccione una observación---
                          </option>
                          {Object.entries(ObservationEnum).map(
                            ([key, value]) => (
                              <option key={key} value={key}>
                                {getOBSMessage(value)}
                              </option>
                            )
                          )}
                        </select>
                        {errors.obs && (
                          <ErrorMessage>{errors.obs.message}</ErrorMessage>
                        )}
                      </div>
                      <div className=" space-y-1 flex flex-col">
                        <label
                          htmlFor="grade"
                          className=" font-bold block text-center uppercase text-slate-600"
                        >
                          Nota
                        </label>
                        <input
                          type="number"
                          disabled={isPending}
                          id="grade"
                          min={"0"}
                          defaultValue={student?.grade ? student.grade : 0}
                          max={100}
                          className=" p-2 text-slate-600  border border-slate-300 rounded-md py-3 text-sm/6 disabled:bg-slate-300"
                          {...register("grade", {
                            required: "La nota es obligatoria",
                            validate: validateGrade,
                          })}
                        />
                        {errors.grade && (
                          <ErrorMessage className=" p-1">
                            {errors.grade.message}
                          </ErrorMessage>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className=" flex w-full gap-3 ">
                    <input
                      type="submit"
                      value="Guardar"
                      disabled={isPending}
                      form="updateGradeForm"
                      className=" bg-green-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-colors mt-3 disabled:bg-slate-300"
                    />
                    <input
                      type="button"
                      value="Cancelar"
                      disabled={isPending}
                      onClick={() => {
                        setShow(false);
                        setStudentSelected(undefined);
                        reset();
                      }}
                      form="updateGradeForm"
                      className=" bg-red-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors mt-3 disabled:bg-slate-300"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
