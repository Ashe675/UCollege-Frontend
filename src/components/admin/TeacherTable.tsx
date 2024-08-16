import { PrivateRoutes } from "@/data/routes";
import { TeacherList } from "@/types/admin";
import { getRoleColorClass, getRoleMessage } from "@/utils/dictionaries";
import Pagination from "@mui/material/Pagination/Pagination";
import PaginationItem from "@mui/material/PaginationItem/PaginationItem";
import { Avatar } from "flowbite-react/components/Avatar";
import { Link, useNavigate } from "react-router-dom";

type TeacherTableProps = {
  teachers: TeacherList;
  page: number;
  count: number;
};

export default function TeacherTable({
  teachers,
  page,
  count,
}: TeacherTableProps) {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/myspace/${PrivateRoutes.ADMIN_DOCENTES}/${id}`, {
      state: { page },
    });
  };

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
                  className={` hover:bg-slate-100 cursor-pointer
                      bg-white
                  `}
                  key={teacher.user_id}
                >
                  <td className=" p-3 relative">
                    <Avatar rounded img={teacher.avatar?.url} />
                  </td>
                  <td className=" p-3 ">
                    {`${teacher.firstName} ${teacher.lastName}`}
                  </td>
                  <td className=" p-3">{teacher.identificationCode}</td>
                  <td className=" p-3">{teacher.regionalCenter}</td>
                  <td className=" p-3">{teacher.departament}</td>
                  <td className=" p-3 justify-center flex">
                    {teacher.active ? (
                      <span
                        className={` text-center p-2 rounded-full font-semibold uppercase text-sm w-full text-white ${getRoleColorClass(
                          teacher.role
                        )}`}
                      >
                        {getRoleMessage(teacher.role)}
                      </span>
                    ) : (
                      <span
                        className={` text-center p-2 rounded-full font-semibold uppercase text-sm w-full text-white 
                          bg-slate-400
                        `}
                      >
                        Desactivado
                      </span>
                    )}
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
                        to={`/myspace/${PrivateRoutes.ADMIN_DOCENTES}${
                          item.page === 1 ? "" : `?page=${item.page}`
                        }`}
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
          Aún no se han registrado docentes.
        </div>
      )}
    </>
  );
}
