import { ObservationEnum, StudentSectionMember } from "@/types/teacher";
import { Avatar } from "flowbite-react/components/Avatar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";

import TableContainer from "@mui/material/TableContainer";

import TablePagination from "@mui/material/TablePagination";

import { useState } from "react";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import { getOBSColor } from "@/utils/dictionaries";
import SubmitGradeModal from "./SubmitGradeModal";

type GradeStudentTableProps = {
  students: StudentSectionMember[];
  sectionId: number;
  isAvailable : boolean
};

export default function GradeStudentTable({
  students,
  sectionId,
  isAvailable
}: GradeStudentTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [studentSelected, setStudentSelected] =
    useState<StudentSectionMember>();


  const handleClick = (studentSelected: StudentSectionMember) => {
    setShowModal(true);
    setStudentSelected(studentSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log(event);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <SubmitGradeModal
        setStudentSelected={setStudentSelected}
        student={studentSelected}
        show={showModal}
        setShow={setShowModal}
        sectionId={sectionId}
      />
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
          tableLayout: "auto",
        }}
      >
        <TableContainer  >
          <Table  
            sx={{ minWidth: 500 }}
            aria-label="custom pagination table"
            className=" bg-white  rounded-md h-full "
          >
            <thead className=" text-slate-500 uppercase text-sm">
              <tr className=" border-b border-slate-200 font-semibold">
                <td className=" p-3 text-center">Foto</td>
                <td className=" p-3 text-center">Nombre</td>
                <td className=" p-3 text-center">Número de Cuenta</td>
                <td className=" p-3 text-center">Calificación</td>
                <td className=" p-3 text-center">Observación</td>
                <td className=" p-3 text-center"></td>
              </tr>
            </thead>
            <tbody className=" divide-y divide-slate-200 text-slate-500 font-normal">
              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => {
                  return (
                    <tr
                      role="checkbox"
                      className=""
                      tabIndex={-1}
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
                      <td className=" p-3 ">
                        {student.grade !== null ? student.grade : "N/A"}
                      </td>
                      <td className=" p-3">
                        <span
                          className={` text-center mx-auto flex justify-center px-2 py-1 rounded-full font-semibold uppercase text-sm w-full text-white ${getOBSColor(
                            student.OBS ? student.OBS : ObservationEnum.NSP
                          )}`}
                        >
                          {student.OBS ? student.OBS : "N/A"}
                        </span>
                      </td>
                      <td className=" p-3 ">
                        <ButtonCustomWithClick
                          disabled={isAvailable}
                          onClick={() => {
                            handleClick(student);
                          }}
                          className={`bg-blue-600 hover:bg-blue-700 text-white  text-sm  p-2 rounded-md shadow-md  flex justify-center gap-2 max-w-60 mx-auto items-center disabled:bg-gray-400`}
                        >
                          Actualizar Nota
                        </ButtonCustomWithClick>
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
