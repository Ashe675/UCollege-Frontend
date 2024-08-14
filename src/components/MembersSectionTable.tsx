import { StudentSectionMember, TeacherSectionMember } from "@/types/teacher";
import { Avatar } from "flowbite-react/components/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination/TablePagination";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";

type MembersSectionTableProps = {
  students: StudentSectionMember[];
  teacher: TeacherSectionMember;
};

export default function MembersSectionTable({
  students,
  teacher,
}: MembersSectionTableProps) {
  const navigate = useNavigate()
  
  const handleClick = (id: number) => {
    navigate(`/myspace/${PrivateRoutes.PROFILE}/${id}`)
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
          tableLayout: "auto",
        }}
      >
        <TableContainer>
          <Table
            sx={{ minWidth: 500 }}
            aria-label="custom pagination table"
            className=" bg-white  rounded-md"
          >
            <thead className=" text-slate-500 uppercase text-sm">
              <tr className=" border-b border-slate-200 font-semibold">
                <td className=" p-3 text-center">Foto</td>
                <td className=" p-3 text-center">Nombre</td>
                <td className=" p-3 text-center">Número de Cuenta</td>
                <td className=" p-3 text-center">Rol</td>
              </tr>
            </thead>
            <tbody className=" divide-y divide-slate-200 text-slate-500 font-normal">
              {page === 0 && (
                <tr
                  title="Ver Perfil"
                  role="checkbox"
                  className="hover:bg-slate-100 cursor-pointer"
                  tabIndex={-1}
                  onClick={() => handleClick(teacher.id)}
                >
                  <td className=" p-3 ">
                    <Avatar
                      rounded
                      img={teacher.images.length ? teacher.images[0].url : ""}
                    />
                  </td>
                  <td className=" p-3 ">
                    {`${teacher.person.firstName} ${teacher.person.lastName}`}
                  </td>
                  <td className=" p-3">{teacher.identificationCode}</td>
                  <td className=" p-3 justify-center flex">
                    <span
                      className={` text-center p-2 rounded-full font-semibold uppercase text-sm w-full text-white bg-indigo-600`}
                    >
                      Docente
                    </span>
                  </td>
                </tr>
              )}
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => {
                  return (
                    <tr
                      title="Ver Perfil"
                      role="checkbox"
                      className="hover:bg-slate-100 cursor-pointer"
                      tabIndex={-1}
                      onClick={() => handleClick(student.id)}
                      key={student.id}
                    >
                      <td className=" p-3 ">
                        <Avatar
                          rounded
                          img={student.avatar ? student.avatar : ""}
                        />
                      </td>
                      <td className=" p-3 ">
                        {`${student.person.firstName} ${student.person.lastName}`}
                      </td>
                      <td className=" p-3">{student.identificationCode}</td>
                      <td className=" p-3 justify-center flex">
                        <span
                          className={` text-center p-2 rounded-full font-semibold uppercase text-sm w-full text-white bg-teal-500`}
                        >
                          Estudiante
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 60]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
