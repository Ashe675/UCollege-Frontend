import { Avatar } from "flowbite-react";
import {Table, TableHead, TableHeadCell,TableBody,TableRow,TableCell} from "flowbite-react";
import { Link } from "react-router-dom";
import { PrivateRoutes } from "@/data/routes";

export default function Teacher(){
    return(
        <>
          <div className="flex justify-end mr-20">
          <Link className="bg-purple-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-purple-800 transition-colors" style={{border:"3px solid gray"}} to={`/myspace/${PrivateRoutes.ADD_TEACHER}`}>Agregar Nuevo Docente</Link>
          </div>
          <div className="mr-20 ml-20" style={{marginTop:"60px"}}>
            <Table hoverable style={{textAlign:"center"}}>
              <TableHead className="border border-gray-200">
                <TableHeadCell >Foto</TableHeadCell>
                <TableHeadCell >Nombre Docente</TableHeadCell>
                <TableHeadCell >Número de Empleado</TableHeadCell>
                <TableHeadCell >Centro Regional</TableHeadCell>
                <TableHeadCell >Departamento que pertenece</TableHeadCell>
              </TableHead>
              <TableBody>
                <TableRow className="border border-gray-200">
                  <TableCell ><Avatar img="/profile/photo.webp" rounded /></TableCell>
                  <TableCell >
                    Jose Cerrato
                  </TableCell>
                  <TableCell >1524</TableCell>
                  <TableCell >Ciudad Universitaria</TableCell>
                  <TableCell >Ingeniería en Sistemas</TableCell>
                </TableRow>
                <TableRow className="border border-gray-300">
                  <TableCell ><Avatar img="/profile/photo.webp" rounded /></TableCell>
                  <TableCell >
                    Jose Cerrato
                  </TableCell>
                  <TableCell >1524</TableCell>
                  <TableCell >Ciudad Universitaria</TableCell>
                  <TableCell >Ingeniería en Sistemas</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </>
    );
}