import { RoleEnum } from "@/types/auth";
import { TeacherByDepartmentPage } from "@/types/department_head";
import { getRoleColorClass, getRoleMessage } from "@/utils/dictionaries";
import { Avatar } from "flowbite-react/components/Avatar";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import { IconKeyFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ResetPasswordToTeacherModal from "./ResetPasswordToTeacherModal";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordToTeacher } from "@/api/department_head/DepartmentHeadApi";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { PrivateRoutes } from "@/data/routes";

type TeacherTableDeptoProps = {
  teachers: TeacherByDepartmentPage;
  page: number;
  count: number;
};

export default function TeacherTableDepto({
  teachers,
  page,
  count,
}: TeacherTableDeptoProps) {
  const [idTeacher, setIdTeacher] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const toastId = useRef<null | number | string>(null);

  const { mutate } = useMutation({
    mutationFn: resetPasswordToTeacher,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setIdTeacher(0);
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setIdTeacher(0);
    },
  });

  const handleClick = (id: number) => {
    if (id) {
      setIdTeacher(id);
      console.log(id);
      setShowModal(true);
    }
  };

  const handleClickModal = () => {
    if (idTeacher) {
      toastId.current = toast.loading("Enviando Email...");
      mutate(idTeacher);
      setShowModal(false);
    }
  };

  return (
    <>
      {teachers.teachers.length ? (
        <div className=" overflow-x-auto shadow-md  mt-4 rounded-sm">
          <ResetPasswordToTeacherModal
            onClick={handleClickModal}
            show={showModal}
            setShow={setShowModal}
          />
          <table className=" bg-white table-auto min-w-max w-full rounded-md">
            <thead className=" text-slate-500 uppercase text-sm">
              <tr className=" border-b border-slate-200">
                <th className=" p-3">Foto</th>
                <th className=" p-3">Nombre</th>
                <th className=" p-3">Número de Empleado</th>
                <th className=" p-3">Cargo</th>
                <th className=" p-3">Acción</th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-slate-200 text-slate-500 font-normal">
              {teachers.teachers.map(({ teacher }) => (
                <tr className=" " key={teacher.id}>
                  <td className=" p-3 ">
                    <Avatar rounded img={teacher.images[0]?.url} />
                  </td>
                  <td className=" p-3 ">
                    {`${teacher.person.firstName} ${teacher.person.lastName}`}
                  </td>
                  <td className=" p-3">{teacher.identificationCode}</td>
                  <td className=" p-3 justify-center flex">
                    <span
                      className={` text-center p-2 rounded-full font-semibold uppercase text-sm w-full text-white ${getRoleColorClass(
                        teacher.roleId === 2
                          ? RoleEnum.DEPARTMENT_HEAD
                          : teacher.roleId === 3
                          ? RoleEnum.COORDINATOR
                          : RoleEnum.TEACHER
                      )}`}
                    >
                      {getRoleMessage(
                        teacher.roleId === 2
                          ? RoleEnum.DEPARTMENT_HEAD
                          : teacher.roleId === 3
                          ? RoleEnum.COORDINATOR
                          : RoleEnum.TEACHER
                      )}
                    </span>
                  </td>
                  <td className=" p-3 ">
                    <ButtonCustomWithClick
                      disabled={teacher.roleId === 2}
                      onClick={() => {
                        handleClick(teacher.id);
                      }}
                      className={`${teacher.roleId === 2 ? 'bg-gray-400 text-gray-50' : 'bg-blue-600 hover:bg-blue-700 text-white'}  text-sm  p-2 rounded-md shadow-md  flex justify-center gap-2 max-w-60 mx-auto items-center`}
                    >
                      Reiniciar Contraseña
                      <IconKeyFilled stroke={2} />
                    </ButtonCustomWithClick>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className=" ">
              <tr>
                <td colSpan={5} className="p-4">
                  <Pagination
                    shape="rounded"
                    page={page}
                    count={count}
                    className=" w-full flex justify-center"
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/myspace/${
                          PrivateRoutes.DEPARTMENT_HEAD_TEACHERS
                        }${item.page === 1 ? "" : `?page=${item.page}`}`}
                        {...item}
                      />
                    )}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className=" text-slate-500 font-normal flex justify-center items-center mt-20">
          No hay docentes para mostrar.
        </div>
      )}
    </>
  );
}
