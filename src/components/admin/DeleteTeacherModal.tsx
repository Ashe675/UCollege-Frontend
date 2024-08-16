import { deactivateTeacher } from "@/api/admin/AdminApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type DeleteTeacherModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
};

export function DeleteTeacherModal({
  openModal,
  setOpenModal,
  userId,
}: DeleteTeacherModalProps) {
  const toastId = useRef<null | number | string>(null);
  const queryClient = useQueryClient();
  const params = useParams();
  const teacherCode = params.teacherCode!;

  const { mutate } = useMutation({
    mutationFn: deactivateTeacher,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({ queryKey: ["teachers", teacherCode] });
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
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

  const handleClick = () => {
    toastId.current = toast.loading("Desactivando Docente...");
    mutate(userId);
    setOpenModal(false);
  };

  return (
<>
      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            setOpenModal(false);
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
                      ¿Está seguro de desactivar a este docente?
                    </Dialog.Title>
                  </div>
                  <div className=" gap-2 flex-wrap flex">
                  <input
                    type="button"
                    onClick={handleClick}
                    value="Desactivar"
                    className=" bg-red-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors mt-3"
                  />
                  <input
                    type="button"
                    value={"Cancelar"}
                    onClick={() => setOpenModal(false)}
                    className=" bg-slate-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-slate-600 cursor-pointer transition-colors mt-3"
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
