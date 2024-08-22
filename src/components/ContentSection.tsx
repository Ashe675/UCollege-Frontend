import { useUserStore } from "@/stores/userStore";
import { SectionSpace } from "@/types/teacher";
import { FileRejection, useDropzone } from "react-dropzone";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  IconCancel,
  IconCheck,
  IconEdit,
  IconMoodSad,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import ErrorMessage from "./ErrorMessage";
import ModalSectionContent from "./teacher/ModalSectionConten";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInfoVirtualSpaceSection } from "@/api/teacher/TeacherApi";
import { toast } from "react-toastify";
import { RoleEnum } from "@/types/auth";
import DeleteVideoModal from "./teacher/DeleteVideoModal";
import UploadVideoModal from "./teacher/UploadVideoModal";

type ContentSectionProps = {
  section: SectionSpace;
};

export default function ContentSection({ section }: ContentSectionProps) {
  const user = useUserStore((state) => state.user);

  const [disabled, setDisabled] = useState(true);
  const initalValues = {
    title: section.title ? section.title : "¡Bienvenido!",
    description: section.description
      ? section.description
      : "Nos alegra mucho que formes parte de este curso. Durante nuestras sesiones, exploraremos los conceptos fundamentales de nuestra clase, abordaremos temas clave y desarrollaremos habilidades prácticas que te serán útiles tanto en tu vida académica como profesional. ¡Mira el video de introducción para que estés al tanto de los temas que abordaremos!",
  };

  const video = section.resources.find((rs) => rs.type === "VIDEO");

  const [data, setData] = useState(initalValues);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [previewVideo, setPreviewVideo] = useState<File | null>(null);

  const removePreviewVideo = () => {
    setPreviewVideo(null);
    setErrors([]);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setErrors([]);
      if (acceptedFiles.length > 0) {
        setPreviewVideo(acceptedFiles[0]);
      }
      // Manejar errores de archivos rechazados
      const rejectedErrors = rejectedFiles.map((rejected) => {
        return rejected.errors.map((e) => e.message).join(", ");
      });

      setErrors(rejectedErrors);
    },
    [setPreviewVideo]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      maxSize: 1000000000,
      accept: {
        "video/*": [],
      },
      onDrop,
    });

  useEffect(() => {
    if (section.title && section.description) {
      setData({
        title: section.title,
        description: section.description,
      });
    }
  }, [section]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const toastId = useRef<null | number | string>(null);
  const queryClient = useQueryClient();
  const handleClick = () => {
    setDisabled(!disabled);
  };

  const { mutate } = useMutation({
    mutationFn: updateInfoVirtualSpaceSection,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({
        queryKey: ["space", "section", section.id.toString()],
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
      queryClient.invalidateQueries({
        queryKey: ["space", "section", section.id.toString()],
      });
    },
  });

  const handleSave = () => {
    toastId.current = toast.loading("Actualizando Información...");
    mutate({
      formData: {
        title: data.title.trim(),
        description: data.description.trim(),
      },
      sectionId: +section.id,
    });
    setError("");
    setShowModal(false);
    setData({
      title: data.title.trim(),
      description: data.description.trim(),
    });
    setDisabled(true);
  };

  const handleModal = () => {
    if (Object.values(data).includes("")) {
      return setError("Todos los campos son obligatorios");
    }
    setError("");
    setShowModal(true);
  };

  const handleClickModalDelete = () => {
    setShowModalDelete(true);
  };

  return (
    <div className=" p-2 relative h-full w-full justify-around flex flex-col items-center space-y-3">
      <ModalSectionContent
        show={showModal}
        setShow={setShowModal}
        onClick={handleSave}
      />
      <DeleteVideoModal
        show={showModalDelete}
        resourceId={video?.id}
        sectionId={section.id}
        setShow={setShowModalDelete}
      />
      <UploadVideoModal
        setPreviewVideo={setPreviewVideo}
        file={acceptedFiles[0]}
        sectionId={section.id}
        setShow={setShowModalUpload}
        show={showModalUpload}
      />
      <div className=" flex w-full justify-center gap-3 text-center items-center">
        <h1 className=" text-tertiary text-center font-bold text-2xl lg:text-3xl text-pretty flex-grow">
          {section.class.name} - {section.code.split("-")[1]}
        </h1>

        {user.role.name !== RoleEnum.STUDENT &&
          user.role.name !== RoleEnum.ADMIN && (
            <div className=" flex space-x-2">
              {disabled ? (
                <button
                  onClick={handleClick}
                  className=" bg-blue-500 p-2 rounded-md relative  hover:bg-blue-600"
                >
                  <IconEdit className=" text-white " />
                </button>
              ) : (
                <>
                  <button
                    onClick={handleClick}
                    className=" bg-red-600 p-2 rounded-md max-sm:w-full  hover:bg-red-700"
                  >
                    <IconCancel stroke={2} className=" text-white " />
                  </button>
                  <button
                    onClick={handleModal}
                    className=" bg-green-500 p-2 rounded-md max-sm:w-full hover:bg-green-600"
                  >
                    <IconCheck stroke={2} className=" text-white " />
                  </button>
                </>
              )}
            </div>
          )}
      </div>
      {disabled ? (
        <>
          <div className="  text-xl lg:text-2xl font-bold w-full capitalize text-slate-600 text-center py-2 disabled:bg-slate-100 enabled:border enabled:border-dashed enabled:border-gray-500 rounded-sm">
            {data.title}
          </div>
          <div className=" disabled:bg-slate-100 text-slate-600 py-2  px-1 text-left w-full rounded-sm enabled:border enabled:border-dashed enabled:border-gray-500 ">
            {data.description}
          </div>
        </>
      ) : (
        <>
          <AutoResizeTextarea
            maxLength={150}
            value={data.title}
            disabled={disabled}
            className="  text-xl lg:text-2xl font-bold w-full capitalize text-slate-600 text-center py-2 disabled:bg-slate-100 enabled:border enabled:border-dashed enabled:border-gray-500 rounded-sm"
            onChange={handleChange}
            id="title"
          />
          <AutoResizeTextarea
            maxLength={700}
            value={data.description}
            disabled={disabled}
            className=" disabled:bg-slate-100 text-slate-600 py-2  px-1 text-left w-full rounded-sm enabled:border enabled:border-dashed enabled:border-gray-500 "
            onChange={handleChange}
            id="description"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
      )}
      <div className=" relative w-full h-full max-h-[672px] bottom-0 max-w-2xl">
        {!video && user.role.name === RoleEnum.STUDENT && (
          <>
            <div className="h-[300px] w-full shadow-sm flex-col relative bottom-0 max-w-2xl rounded-md bg-gray-300 mt-5 flex justify-center items-center">
              <span className=" text-center font-semibold text-slate-500">
                No hay video para mostrar.
              </span>
              <div className=" text-slate-500 h-20 p-4">
                <IconMoodSad stroke={1} size={100} />
              </div>
            </div>
          </>
        )}
        {!video ? (
          <>
            {user.role.name !== RoleEnum.STUDENT &&
              user.role.name !== RoleEnum.ADMIN && (
                <>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-6 transition-colors 
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <p className="text-gray-600">
                      {isDragActive
                        ? "¡Suelta el video aquí!"
                        : "Arrastra y suelta el video aquí, o haz clic para seleccionar el video."}
                    </p>{" "}
                    <p className="text-xs text-gray-500 mt-2">
                      Solo videos, tamaño máximo de 1GB.
                    </p>
                  </div>
                  {errors.length > 0 && (
                    <div className="mt-4 p-2 bg-red-100 text-red-600 border border-red-400 rounded-md">
                      {errors.map((error, index) => (
                        <p key={index} className="text-sm">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  {previewVideo && (
                    <>
                      <video
                        className="max-h-[380px] w-full shadow-sm  relative bottom-0 max-w-2xl rounded-md bg-black mt-5"
                        controls
                        src={URL.createObjectURL(previewVideo)}
                      ></video>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => setShowModalUpload(true)}
                          disabled={acceptedFiles.length === 0}
                          className="bg-blue-500 p-2 rounded-sm hover:bg-blue-600 text-white uppercase font-semibold flex items-center"
                        >
                          <IconUpload stroke={2} className="mr-2" />
                          Subir nuevo video
                        </button>
                        <button
                          onClick={removePreviewVideo}
                          className="bg-red-500 p-2 rounded-sm hover:bg-red-600 text-white  uppercase font-semibold flex items-center"
                        >
                          <IconTrash className="mr-2" />
                          Quitar video
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
          </>
        ) : (
          <>
            <video
              className=" max-h-[380px] w-full shadow-sm  relative bottom-0 max-w-2xl rounded-md bg-black mt-5"
              src={video?.url}
              controls
            ></video>
            {user.role.name !== RoleEnum.STUDENT &&
              user.role.name !== RoleEnum.ADMIN && (
                <button
                  onClick={handleClickModalDelete}
                  title="Eliminar Video"
                  className=" p-2 text-white bg-red-600 hover:bg-red-700 flex gap-2 absolute top-6 right-1 rounded-md uppercase text-sm font-semibold"
                >
                  <IconTrash />
                </button>
              )}
          </>
        )}
      </div>
    </div>
  );
}
