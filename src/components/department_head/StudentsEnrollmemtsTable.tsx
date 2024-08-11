import { PrivateRoutes } from "@/data/routes";
import { EnrollmentsStudentsDepto } from "@/types/department_head";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Avatar } from "flowbite-react/components/Avatar";
import { Link } from "react-router-dom";

type StudentsEnrollmemtsTableProps = {
  students: EnrollmentsStudentsDepto[];
  page: number;
  count: number;
};

export default function StudentsEnrollmemtsTable({
  students,
  page,
  count,
}: StudentsEnrollmemtsTableProps) {
  return (
    <>
      {students.length ? (
        <div className=" overflow-x-auto shadow-md  mt-4 rounded-sm">
          <table className=" bg-white table-auto min-w-max w-full rounded-md">
            <thead className=" text-slate-500 uppercase text-sm">
              <tr className=" border-b border-slate-200">
                <th className=" p-3">Foto</th>
                <th className=" p-3">Nombre</th>
                <th className=" p-3">Número de Cuenta</th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-slate-200 text-slate-500 font-normal">
              {students.map((student) => (
                <tr className=" text-center " key={student.userId}>
                  <td className=" p-3 ">
                    <Avatar
                      rounded
                      img={student.avatar ? student.avatar : ""}
                    />
                  </td>
                  <td className=" p-3 capitalize">
                    {`${student.firstName} ${
                      student.middleName ? student.middleName : ""
                    } ${student.lastName} ${
                      student.secondLastName ? student.secondLastName : ""
                    }`}
                  </td>
                  <td className=" p-3">{student.identificationCode}</td>
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
                          PrivateRoutes.DEPARTMENT_HEAD_ENROLLMENT
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
          No hay estudiantes para mostrar.
        </div>
      )}
    </>
  );
}
