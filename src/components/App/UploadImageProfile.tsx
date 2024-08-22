import { postNewImage } from "@/api/student/StudentApi";
import { IconTrash, IconUpload } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

type Props = {
  avatar: boolean;
  userId: number;
  setUploadFile: React.Dispatch<React.SetStateAction<boolean>>
};

export default function UploadImageProfile({ avatar, userId, setUploadFile }: Props) {
  const [errors, setErrors] = useState<string[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const toastId = useRef<null | number | string>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postNewImage,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({
        queryKey: ["user", "profile", userId],
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

  const removePreviewFile = () => {
    setPreviewFile(null);
    setErrors([]);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setErrors([]);
      const filteredAcceptedFiles: File[] = [];

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const width = img.width;
            const height = img.height;

            // Verificar la proporción de la imagen
            const aspectRatio = width / height;

            if (avatar && aspectRatio !== 1) {
              setErrors((prevErrors) => [
                ...prevErrors,
                `La imagen ${file.name} tiene una proporción no permitida. Las foro de perfil solo pueden ser cuadradas 1:1.`,
              ]);
            }

            // Solo permitir imágenes cuadradas (proporción 1:1) o con ciertas dimensiones
            if (aspectRatio === 1 || aspectRatio === 16 / 9) {
              // Acepta la imagen
              filteredAcceptedFiles.push(file);
              setPreviewFile(file);
            } else {
              // Rechaza la imagen
              setErrors((prevErrors) => [
                ...prevErrors,
                `La imagen ${file.name} tiene una proporción no permitida. Solo se permiten imágenes cuadradas o rectangulares 16:9.`,
              ]);
            }
          };
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });

      // Manejar errores de archivos rechazados
      const rejectedErrors = rejectedFiles.map((rejected) => {
        return rejected.errors.map((e) => e.message).join(", ");
      });

      setErrors((prevErrors) => [...prevErrors, ...rejectedErrors]);
    },
    [setPreviewFile, setErrors, avatar]
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      maxSize: 10000000,
      accept: {
        "image/*": [],
      },
      onDrop,
    });

  const handleUploadImage = () => {
    if (previewFile) {
      toastId.current = toast.loading("Publicando Imagen...");
      removePreviewFile()
      setUploadFile(false)
      mutate({
        image: previewFile,
        avatar,
      });
    }
  };

  return (
    <>
      {!previewFile && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 transition-colors h-[150px] 
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-400 bg-white"
                    }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? "¡Suelta la imagen aquí!"
              : "Arrastra y suelta la imagen aquí, o haz clic para seleccionar la imagen."}
          </p>{" "}
          <p className="text-xs text-gray-500 mt-2">
            Solo imágenes, tamaño máximo de 20MB.
          </p>
        </div>
      )}
      {errors.length > 0 && (
        <div className="mt-4 p-2 bg-red-100 text-red-600 border border-red-400 rounded-md">
          {errors.map((error, index) => (
            <p key={index} className="text-sm">
              {error}
            </p>
          ))}
        </div>
      )}
      {previewFile && (
        <div className=" w-full max-w-3xl mx-aut border flex-col flex border-dashed border-blue-500 bg-blue-100  p-3 rounded-md">
          <img
            className="max-h-[380px] object-contain w-full shadow-sm mx-auto relative bottom-0 max-w-2xl rounded-md bg-black mt-5"
            src={URL.createObjectURL(previewFile)}
          />
          <div className="flex justify-between mt-4 flex-wrap gap-2">
            <button
              onClick={handleUploadImage}
              disabled={acceptedFiles.length === 0}
              className="bg-blue-500 w-full sm:max-w-40 justify-center p-2 rounded-sm hover:bg-blue-600 text-white uppercase font-semibold flex items-center"
            >
              <IconUpload stroke={2} className="mr-2" />
              Publicar
            </button>
            <button
              onClick={removePreviewFile}
              className="bg-red-500 p-2  w-full sm:max-w-40  justify-center rounded-sm hover:bg-red-600 text-white  uppercase font-semibold flex items-center"
            >
              <IconTrash className="mr-2" />
              Quitar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
