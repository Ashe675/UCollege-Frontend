import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendRequestByIdentificationCodeContact } from "@/api/chat/ChatApi";
import { AddContactForm } from "@/types/chat";

export default function NewContactModal() {
  const toastId = useRef<null | number | string>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: sendRequestByIdentificationCodeContact,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({queryKey : ["contacts"]})
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
  const addContact = queryParams.get("nuevoContacto");
  const show = addContact ? true : false;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddContactForm>();

  const onSubmit = (formData: AddContactForm) => {
    toastId.current = toast.loading("Enviando solicitud...");
    mutate(formData.identificationCode);
    navigate(location.pathname, { replace: true });
    reset();
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            navigate(location.pathname, { replace: true });
            reset();
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all p-10  ">
                  <div className="flex justify-around items-center flex-col">
                    <Dialog.Title
                      as="h3"
                      className="font-semibold text-slate-600 text-xl mb-2"
                    >
                      Ingrese el número de cuenta de la persona que desea agregar como contacto{" "}
                      <span className=" text-slate-500  font-normal text-lg">
                        (Ej. 20191040944)
                      </span>
                      .
                    </Dialog.Title>
                    <form
                      id="addContactForm"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                      className=" space-y-1 flex flex-col w-full sm:w-96"
                    >
                      <input
                        type="text"
                        id="identificationCode"
                        className=" p-2 text-slate-600 w-full  border border-slate-300 rounded-md  text-md  block"
                        {...register("identificationCode", {
                          required: "El número de cuenta es obligatorio",
                          pattern: {
                            value: /^[0-9]{11}$|^[0-9]{15}$/,
                            message:
                              "El número de cuenta solo debe de contener 11 o 15 números",
                          },
                        })}
                      />
                      {errors.identificationCode && (
                        <ErrorMessage className=" p-1">
                          {errors.identificationCode.message}
                        </ErrorMessage>
                      )}
                    </form>
                  </div>
                  <input
                    type="submit"
                    value="Enviar Solicitud"
                    form="addContactForm"
                    className=" bg-green-500 w-full p-2 rounded-md text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-colors mt-3"
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
