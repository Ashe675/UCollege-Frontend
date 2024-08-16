import { changeRoleTeacher } from "@/api/admin/AdminApi";
import { Roles, UpdateRoleForm } from "@/types/admin";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";
import { getRoleMessage } from "@/utils/dictionaries";
import { RoleEnum } from "@/types/auth";

type Props = {
  onClick?: () => void;
  show: boolean;
  roles: Roles;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function ChangeRoleTeacherModal({
  show,
  setShow,
  roles,
}: Props) {
  const toastId = useRef<null | number | string>(null);
  const queryClient = useQueryClient();
  const params = useParams();
  const teacherCode = params.teacherCode!;

  const { mutate } = useMutation({
    mutationFn: changeRoleTeacher,
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

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateRoleForm>();

  const validateRole = (value: string) => {
    if (
      value !== RoleEnum.DEPARTMENT_HEAD &&
      value !== RoleEnum.COORDINATOR &&
      value !== RoleEnum.TEACHER
    ) {
      return "Cargo Inválido";
    }
    return true;
  };

  const handleChangeRole = (formData : UpdateRoleForm) => {
    toastId.current = toast.loading("Cambiando Cargo de Docente...");
    mutate({code : teacherCode, role : formData.roleName});
    setShow(false);
    reset();
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            setShow(false);
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
                      Seleccione el nuevo cargo del docente
                    </Dialog.Title>
                  </div>
                  <form
                    onSubmit={handleSubmit(handleChangeRole)}
                    noValidate
                    id="formEditRoleTeacher"
                    className="p-0 space-y-3  h-full w-full flex flex-col justify-between"
                  >
                    <div className=" space-y-1 flex flex-col justify-center">
                      <select
                        id="roleId"
                        className={`  p-2 border rounded-sm border-slate-200 w-full`}
                        defaultValue=""
                        {...register("roleName", {
                          required: "El cargo es obligatorio",
                          validate: validateRole,
                        })}
                      >
                        <option value="">---Seleccione el cargo---</option>
                        {roles &&
                          roles.map((role) => (
                            <option key={role.id} value={role.name}>
                              {getRoleMessage(role.name)}
                            </option>
                          ))}
                      </select>
                      {errors.roleName && (
                        <ErrorMessage>{errors.roleName.message}</ErrorMessage>
                      )}
                    </div>
                  </form>
                  <div className=" gap-2 flex-wrap flex">
                    <input
                      form="formEditRoleTeacher"
                      type="submit"
                      value="Cambiar Cargo"
                      className=" bg-green-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-green-600 cursor-pointer transition-colors mt-3"
                    />
                    <input
                      type="button"
                      value={"Cancelar"}
                      onClick={() => {
                        setShow(false);
                        reset();
                      }}
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
