import { deleteTeacher } from "@/api/admin/AdminApi";
import { PrivateRoutes } from "@/data/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "flowbite-react";
import { useRef } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const params = useParams();
  const teacherCode = params.teacherCode!;

  const { mutate } = useMutation({
    mutationFn: deleteTeacher,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.removeQueries({ queryKey: ["teachers", teacherCode] });
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      navigate(`/myspace/${PrivateRoutes.ADMIN_DOCENTES}/`);
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
    toastId.current = toast.loading("Eliminando Docente...");
    mutate(userId);
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        className={openModal ? "animate-grow" : "animate-shrink"}
        popup
      >
        <Modal.Header className={`  bg-white `} />
        <Modal.Body className={` bg-white rounded-sm  `}>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 " />
            <h3 className="mb-5 text-lg font-normal text-gray-500 ">
              ¿Estás seguro de eliminar a este docente?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                className=" rounded-md"
                onClick={handleClick}
              >
                {"Sí, estoy seguro"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
