import { deleteVideoByResourceId } from "@/api/teacher/TeacherApi";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../spinner/Spinner";

type Props = {
  resourceId: number | undefined;
  sectionId: number;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteVideoModal({
  resourceId,
  sectionId,
  show,
  setShow,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: deleteVideoByResourceId,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({
        queryKey: ["space", "section", sectionId.toString()],
      });
      setShow(false);
    },
  });

  const handleDelete = () => {
    if (resourceId) {
      mutate(resourceId);
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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all p-10 ">
                  {!isPending && !error && (
                    <>
                      <div className="flex justify-around items-center flex-col sm:flex-row">
                        <Dialog.Title
                          as="h3"
                          className="font-bold text-slate-700 text-2xl  my-5"
                        >
                          ¿Seguro desea eliminar el vídeo?
                        </Dialog.Title>
                      </div>
                      <input
                        type="button"
                        onClick={handleDelete}
                        value="Eliminar"
                        className=" bg-red-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors mt-3"
                      />
                    </>
                  )}
                  {isPending && (
                    <div className=" h-1/2 space-y-6">
                      <h2 className="font-bold text-slate-700 text-2xl  my-5 text-center">
                        Eliminando Video, espere por favor.
                      </h2>
                      <div className=" h-full flex justify-center items-center p-20">
                        <Spinner />
                      </div>
                    </div>
                  )}
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
