import {
  getSectionsHomeStudent,
  sendRequestCancelSections,
} from "@/api/student/StudentApi";
import ButtonCustomWithClick from "@/components/ButtonCustomWithClick";
import ErrorMessage from "@/components/ErrorMessage";
import ModalCustom from "@/components/ModalCustom";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";


export default function RequestAcademicView() {
  const [modalCancelSection, setModalCancelSection] = useState(false);
//   const [modalChangeCenter, setModalChangeCenter] = useState(false);
//   const [modalChangeCareer, setModalChangeCareer] = useState(false);
//   const [modalReposition, setModalReposition] = useState(false);
  const [error, setError] = useState("");
  const [justification, setJustification] = useState("");
  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const [fileError, setFileError] = useState("");

  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // Nuevo estado para el archivo subido

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    setFileError(""); // Limpiar errores anteriores
    setUploadedFile(acceptedFiles[0]); // Almacenar el archivo subido
    console.log("Archivo aceptado:", acceptedFiles[0]);
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    setUploadedFile(null); // Limpiar el archivo anterior si se rechaza el nuevo archivo
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === "file-too-large") {
          setFileError(
            "El archivo es demasiado grande, el tamaño máximo es de 20MB."
          );
        } else if (err.code === "file-invalid-type") {
          setFileError("El archivo debe ser un PDF.");
        } else {
          setFileError("Hubo un problema con el archivo seleccionado.");
        }
      });
    });
  }, []);

  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 20000000,
    accept: {
      "application/pdf": [],
    },
    onDropAccepted,
    onDropRejected,
  });

  const handleCheckboxChange = (value: number) => {
    setSelectedSections((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );
  };

  const toastId = useRef<null | number | string>(null);

  //   const queryClient = useQueryClient();

  const { mutate: cancelSections } = useMutation({
    mutationFn: sendRequestCancelSections,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["user", "profile", userId],
      // });
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

  const handleCancelSections = () => {
    setError("");
    if (!justification) {
      return setError("La justificación es obligatoria");
    }
    if (selectedSections.length === 0) {
      return setError("Seleccione al menos una sección");
    }
    if (!uploadedFile) {
      return setError("La evidencia es obligatoria.");
    }
    toastId.current = toast.loading("Enviando Solicitud...");
    setModalCancelSection(false);
    cancelSections({
      sectionsIds: selectedSections,
      justificacion: justification,
      file: uploadedFile,
    });
  };

  const { data: sections } = useQuery({
    queryKey: ["sections", "cancel"],
    queryFn: getSectionsHomeStudent,
  });

  return (
    <div className=" h-full p-3 text-slate-700">
      <ModalCustom show={modalCancelSection} setShow={setModalCancelSection}>
        <div className=" p-3">
          <h2 className=" text-xl font-bold text-slate-700 py-4 ">
            Cancelar Secciones
          </h2>
          <label
            htmlFor="justi"
            className=" font-semibold  text-slate-700 uppercase"
          >
            Justificación
          </label>
          <div>
            <textarea
              id="justi"
              value={justification}
              className=" text-slate-700  w-full max-h-60 resize-y p-2 border border-slate-400 rounded-md "
              onChange={(e) => setJustification(e.target.value)}
            />
          </div>
          <div className=" space-y-2 flex flex-col py-4">
            {sections &&
              sections.map((sect) => (
                <label
                  key={sect.id}
                  className="inline-flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={sect.id}
                    checked={selectedSections.includes(sect.id)}
                    onChange={() => handleCheckboxChange(sect.id)}
                    className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{`${sect.class.name}-${sect.code}`}</span>
                </label>
              ))}
          </div>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed mx-auto p-6 transition-colors h-[100px] my-4 rounded-md
                    ${
                      isDragActive
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-400 bg-white"
                    }`}
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              {isDragActive
                ? "¡Suelta el pdf aquí!"
                : "Arrastra y suelta rl pdf aquí, o haz clic para seleccionar el archivo."}
            </p>{" "}
            <p className="text-xs text-gray-500 mt-2">
              Solo pdf, tamaño máximo de 20MB.
            </p>
          </div>
          {uploadedFile && (
            <div className="my-4">
              <p className="text-gray-700 p-3 bg-slate-200">
                Archivo subido: {uploadedFile.name}
              </p>
            </div>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {fileError && <ErrorMessage>{fileError}</ErrorMessage>}
          <ButtonCustomWithClick
            onClick={handleCancelSections}
            className=" p-2 shadow-sm  mx-auto bg-green-500 uppercase font-bold text-sm text-white rounded-sm hover:bg-green-600"
          >
            Enviar
          </ButtonCustomWithClick>
        </div>
      </ModalCustom>

      <div className=" flex w-full p-2 gap-2 flex-wrap justify-between mx-auto">
        {/* <ButtonCustomWithClick
          onClick={() => setModalChangeCareer(true)}
          className=" p-2 shadow-sm md:max-w-96 mx-auto bg-teal-500 uppercase font-bold text-sm text-white rounded-sm hover:bg-teal-600"
        >
          Nueva Solicitud de Cambio de Carrera
        </ButtonCustomWithClick>
        <ButtonCustomWithClick
          onClick={() => setModalChangeCenter(true)}
          className=" p-2 shadow-sm   md:max-w-96 mx-auto bg-indigo-500 uppercase font-bold text-sm text-white rounded-sm hover:bg-indigo-600"
        >
          Nueva Solicitud de Cambio de Centro
        </ButtonCustomWithClick>
        <ButtonCustomWithClick
          onClick={() => setModalReposition(true)}
          className=" p-2 shadow-sm  md:max-w-96 mx-auto bg-violet-500 uppercase font-bold text-sm text-white rounded-sm hover:bg-violet-600"
        >
          Nueva Solicitud de Pago de Reposición
        </ButtonCustomWithClick> */}
        <ButtonCustomWithClick
          onClick={() => {
            setModalCancelSection(true);
            setSelectedSections([]);
            setUploadedFile(null);
            setJustification("");
            setError("");
          }}
          className=" p-2 shadow-sm  md:max-w-96 mx-auto bg-blue-500 uppercase font-bold text-sm text-white rounded-sm hover:bg-blue-600"
        >
          Nueva Solicitud de Cancelación Excepcional
        </ButtonCustomWithClick>
      </div>
      <div className=" text-2xl font-bold text-center p-3 uppercase">
        Ver Solicitudes
      </div>
      <TabGroup className="w-full h-full  relative ">
        <TabList className=" rounded-md w-full flex justify-between  ">
          <div className="bg-gray-400 rounded-md w-full flex justify-between  ">
            <Tab className="rounded-md p-2 text-xs sm:text-sm/6 font-bold text-white focus:outline-none data-[selected]:bg-tertiary data-[hover]:bg-tertiary/50  w-full data-[selected]:data-[hover]:bg-tertiary/90 data-[focus]:outline-1 data-[focus]:outline-white flex gap-2 uppercase text-center justify-center  items-center ">
              Cambio de Carrera
            </Tab>
            <Tab className="rounded-md p-2 text-xs sm:text-sm/6 font-bold text-white focus:outline-none data-[selected]:bg-tertiary data-[hover]:bg-tertiary/50  w-full data-[selected]:data-[hover]:bg-tertiary/90 data-[focus]:outline-1 data-[focus]:outline-white flex gap-2 uppercase text-center justify-center  items-center">
              Cambio de Centro
            </Tab>
            <Tab className="rounded-md p-2 text-xs sm:text-sm/6 font-bold text-white focus:outline-none data-[selected]:bg-tertiary data-[hover]:bg-tertiary/50 w-full data-[selected]:data-[hover]:bg-tertiary/90 data-[focus]:outline-1 data-[focus]:outline-white flex gap-2 uppercase text-center justify-center  items-center">
              Pago de Reposicion
            </Tab>
            <Tab className="rounded-md p-2 text-xs sm:text-sm/6 font-bold text-white focus:outline-none data-[selected]:bg-tertiary data-[hover]:bg-tertiary/50 w-full data-[selected]:data-[hover]:bg-tertiary/90 data-[focus]:outline-1 data-[focus]:outline-white flex gap-2 uppercase text-center justify-center  items-center">
              Cancelación Expecional
            </Tab>
          </div>
        </TabList>
        <TabPanels className="space-y-2 relative h-full flex flex-col">
          <TabPanel className="data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full data-[selected]:gap-2 data-[selected]:relative"></TabPanel>
          <TabPanel
            className={
              "data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full "
            }
          ></TabPanel>
          <TabPanel
            className={
              "data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full "
            }
          ></TabPanel>
          <TabPanel
            className={
              "data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full "
            }
          ></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
