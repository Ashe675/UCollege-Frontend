import { IncreaseQuota } from "@/types/department_head";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseQuotaBySectionId } from "@/api/department_head/DepartmentHeadApi";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/userStore";

type AddQuotasModalProps = {
  sectionId: number;
};

export default function AddQuotasModal({ sectionId }: AddQuotasModalProps) {
  const toastId = useRef<null | number | string>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  const { mutate } = useMutation({
    mutationFn: increaseQuotaBySectionId,
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
  const addMember = queryParams.get("aumentarCupos");
  const show = addMember ? true : false;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<IncreaseQuota>();

  const validateQuota = (quota: number) => {
    if (isNaN(quota) || quota <= -50 || quota >= 50) {
      return "Campo Inválido";
    }
    return true;
  };

  const onSubmit = (formData: IncreaseQuota) => {
    toastId.current = toast.loading("Actualizando Cupos de la Sección...");
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
            navigate(location.pathname, { replace: true })
            reset()
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
                  <div className="flex justify-around items-center flex-col sm:flex-row">
                    <Dialog.Title
                      as="h3"
                      className="font-bold text-slate-700 text-2xl  my-5"
                    >
                      Ingrese la cantidad de cupos que desea aumentar o reducir <span className=" text-slate-500 font-semibold">(Ej. -3 para reducir)</span>.
                    </Dialog.Title>
                    <form
                      id="increaseQuotaForm"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                      className=" space-y-1 flex flex-col w-full sm:w-36"
                    >
                      <input
                        type="number"
                        id="quota"
                        min={"-50"}
                        max={50}
                        className=" p-2 text-slate-600 w-full  border border-slate-300 rounded-md py-3 text-md font-bold"
                        {...register("increment", {
                          required: "Los cupos son obligatorios",
                          validate: validateQuota,
                        })}
                      />
                      {errors.increment && (
                        <ErrorMessage className=" p-1">
                          {errors.increment.message}
                        </ErrorMessage>
                      )}
                    </form>
                  </div>
                  <input
                    type="submit"
                    value="Guardar"
                    form="increaseQuotaForm"
                    className=" bg-green-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-colors mt-3"
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
