import { Dialog, Transition } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { Fragment } from "react";
import Spinner from "../spinner/Spinner";
import { sendMessageFile } from "@/api/chat/ChatApi";
import ErrorMessage from "../ErrorMessage";

type Props = {
  conversationId: string;
  show: boolean;
  setPreviewFile: React.Dispatch<React.SetStateAction<File | null>>;
  file: File;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SendFileModal({
  conversationId,
  setPreviewFile,
  file,
  show,
  setShow,
}: Props) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendMessageFile,
    onSuccess: () => {
      setShow(false);
    },
  });

  const handleUpload = () => {
    mutate({ file, conversationId });
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
              setPreviewFile(null);
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all p-10 ">
                  {
                    <>
                      <div className="flex justify-around items-center flex-col sm:flex-row">
                        {!isPending && (
                          <Dialog.Title
                            as="h3"
                            className="font-semibold text-slate-700 text-xl  my-5"
                          >
                            ¿Desea enviar el siguiente archivo?
                          </Dialog.Title>
                        )}
                      </div>
                      <div className="max-w-60  mx-auto text-sm  overflow-hidden rounded-md relative ">
                        {isPending && (
                          <div className=" h-1/2 space-y-6">
                            <h2 className="font-semibold text-slate-700 text-xl  my-5">
                              Enviando archivo, espere por favor.
                            </h2>
                            <div className=" h-full flex justify-center items-center p-20">
                              <Spinner />
                            </div>
                          </div>
                        )}
                        {error && <ErrorMessage>{error.message}</ErrorMessage>}
                        {!isPending && !error && (
                          <>
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="object-cover w-full h-full"
                              />
                            ) : file.type.startsWith("video/") ? (
                              <div className=" bg-black flex justify-center">
                                <video
                                  src={URL.createObjectURL(file)}
                                  controls
                                  className=" max-h-[350px] "
                                />
                              </div>
                            ) : file.type === "application/pdf" ? (
                              <div className="w-full h-full bg-red-500 flex items-center flex-col   justify-center text-white p-3">
                                <img
                                  src={"/logos/pdfLogo.png"}
                                  alt={file.name}
                                  className="object-cover w-full h-full"
                                />

                                {file.name
                                  .split(".")[0]
                                  .toString()
                                  ?.toUpperCase()}
                              </div>
                            ) : file.type === "application/msword" ||
                              file.type ===
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                              <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white flex-col p-3">
                                <img
                                  src={"/logos/wordLogo.png"}
                                  alt={file.name}
                                  className="object-cover w-full h-full"
                                />

                                {file.name.toString()?.toUpperCase()}
                              </div>
                            ) : file.type === "application/vnd.ms-excel" ||
                              file.type ===
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                              <div className="w-full h-full bg-green-500 flex items-center justify-center text-white flex-col  p-3">
                                <img
                                  src={"/logos/excelLogo.png"}
                                  alt={file.name}
                                  className="object-cover w-full h-full"
                                />

                                {file.name
                                  .split(".")[0]
                                  .toString()
                                  ?.toUpperCase()}
                              </div>
                            ) : file.type === "application/vnd.ms-powerpoint" ||
                              file.type ===
                                "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                              <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white flex-col  p-3">
                                <img
                                  src={"/logos/powerLogo.png"}
                                  alt={file.name}
                                  className="object-cover w-full h-full"
                                />

                                {file.name
                                  .split(".")[0]
                                  .toString()
                                  ?.toUpperCase()}
                              </div>
                            ) : (
                              !error &&
                              !isPending && (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-700 flex-col  p-3">
                                  <img
                                    src={"/logos/file.png"}
                                    alt={file.name}
                                    className="object-cover w-full h-full"
                                  />

                                  {file.name
                                    .split(".")[0]
                                    .toString()
                                    ?.toUpperCase()}
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                      {!isPending && !error && (
                        <div className=" flex gap-2">
                          <input
                            type="button"
                            onClick={() => {
                              if (!isPending) {
                                setShow(false);
                                setPreviewFile(null);
                              }
                            }}
                            value="Cancelar"
                            className=" bg-red-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-red-600 cursor-pointer transition-colors mt-3"
                          />
                          <input
                            type="button"
                            onClick={handleUpload}
                            value="Enviar"
                            className=" bg-green-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-colors mt-3"
                          />
                        </div>
                      )}
                    </>
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
