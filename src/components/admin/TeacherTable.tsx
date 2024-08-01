import { PrivateRoutes } from "@/data/routes";
import { TeacherList } from "@/types/admin";
import { getRoleColorClass, getRoleMessage } from "@/utils/dictionaries";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router-dom";

type TeacherTableProps = {
  teachers: TeacherList;
};

export default function TeacherTable({ teachers }: TeacherTableProps) {
  const navigate = useNavigate()

  const handleClick = (id : string) =>{
    navigate(`/myspace/${PrivateRoutes.ADMIN_DOCENTES}/${id}`)
  }

  return (
    <>
      {teachers.length ? (
        <div className=" overflow-x-auto shadow-md  mt-4 rounded-sm">
          <table className=" bg-white table-auto min-w-max w-full">
            <thead className=" text-slate-500 uppercase text-sm">
              <tr className=" border-b border-slate-200">
                <th className=" p-3">Foto</th>
                <th className=" p-3">Nombre</th>
                <th className=" p-3">Número de Empleado</th>
                <th className=" p-3">Centro Regional</th>
                <th className=" p-3">Departamento</th>
                <th className=" p-3">Cargo</th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-slate-200 text-slate-500 font-normal">
              {teachers.map((teacher) => (
                <tr
                onClick={() => handleClick(teacher.identificationCode)}
                  className=" hover:bg-slate-100 cursor-pointer"
                  key={teacher.user_id}
                >
                  <td className=" p-3 ">
                    <Avatar rounded img={teacher.avatar?.url} />
                  </td>
                  <td className=" p-3 ">
                    {`${teacher.firstName} ${teacher.lastName}`}
                  </td>
                  <td className=" p-3">
                    {teacher.identificationCode}
                  </td>
                  <td className=" p-3">
                    {teacher.regionalCenter}
                  </td>
                  <td className=" p-3">
                    {teacher.departament}
                  </td>
                  <td className=" p-3 justify-center flex">
                    <span className={` text-center p-2 rounded-full font-semibold uppercase text-sm w-full text-white ${getRoleColorClass(teacher.role)}`}>
                    {getRoleMessage(teacher.role)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className=" text-slate-500 font-normal flex justify-center items-center mt-20">
            Aún no se han registrado docentes.
        </div>
      )}
    </>
  );
}
