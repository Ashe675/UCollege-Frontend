import { CancelSectionPayload } from "@/types/department_head";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelSectionById } from "@/api/department_head/DepartmentHeadApi";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/userStore";
import { PrivateRoutes } from "@/data/routes";

type CancelSectionModalModalProps = {
  sectionId: number;
};

export default function CancelSectionModalModal({ sectionId }: CancelSectionModalModalProps) {
  const toastId = useRef<null | number | string>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  
  const nextPeriod = location.pathname.includes(`/periodo-academico/proximo`) 

  const { mutate } = useMutation({
    mutationFn: cancelSectionById,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({
        queryKey: ["sections", "department", "current", user.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["sections", "department", "future", user.id],
      });
      queryClient.removeQueries({
        queryKey: ["section", "detail", sectionId],
      });
      navigate(`/myspace/${nextPeriod ? PrivateRoutes.DEPARTMENT_HEAD_PERIOD_NEXT : PrivateRoutes.DEPARTMENT_HEAD_PERIOD_CURRENT}`)
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

  const queryParams = new URLSearchParams(location.search);
  const addMember = queryParams.get("cancelarSeccion");
  const show = addMember ? true : false;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<CancelSectionPayload>();

  const onSubmit = (formData: CancelSectionPayload) => {
    toastId.current = toast.loading("Cancelando Sección...");
    mutate({ id: sectionId, payload: formData });
    navigate(location.pathname, { replace: true });
    reset()
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            navigate(location.pathname, { replace: true });
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all p-10 ">
                  <div className="">
                    <Dialog.Title
                      as="h3"
                      className="font-bold text-slate-700 text-2xl  my-5"
                    >
                      ¿Seguro que desea cancelar la sección? Debes de agregar una justificación.
                    </Dialog.Title>
                    <form
                      id="cancelSectionForm"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                      className=" space-y-1 flex flex-col w-full"
                    >
                      <input
                        type="text"
                        id="justification"
                        maxLength={200}
                        className=" p-2 text-slate-600 w-full  border border-slate-300 rounded-md py-3 text-md "
                        {...register("justification", {
                          required: "La justificación es obligatoria",
                          pattern : { 
                            value : /^[A-Za-z0-9\s]+$/,
                            message : 'Justificación Inválida'
                          }
                        })}
                      />
                      {errors.justification && (
                        <ErrorMessage className=" p-1">
                          {errors.justification.message}
                        </ErrorMessage>
                      )}
                    </form>
                  </div>
                  <input
                    type="submit"
                    value="Cancelar Sección"
                    form="cancelSectionForm"
                    className=" bg-red-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors mt-3"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
