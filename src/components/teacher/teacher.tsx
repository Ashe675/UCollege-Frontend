import ModalTeacher from "./teacherModal";
import { Avatar } from "flowbite-react";
import Hero from "../admission/Hero";
import {Table, TableHead, TableHeadCell,TableBody,TableRow,TableCell} from "flowbite-react";

export default function Teacher(){
    return(
        <>
            <Hero
              title="Docentes Ingresados"
              description="Bienvenido a la Sección de Docentes Ingresados dentro de la plataforma UCollege. Acá podrás ver el listado de los Docentes que han sido ingresar, y agregar nuevos Docentes. Vamos caminando junto al éxito."
              className=" md:max-w-5xl pb-8"
            ></Hero>
            <div className="mr-20 ml-20" style={{marginBottom:"50px"}}>
              <Table hoverable style={{textAlign:"center"}}>
                <TableHead>
                  <TableHeadCell></TableHeadCell>
                  <TableHeadCell>Nombre Docente</TableHeadCell>
                  <TableHeadCell>Número de Empleado</TableHeadCell>
                  <TableHeadCell>Centro Regional</TableHeadCell>
                  <TableHeadCell>Departamento que pertenece</TableHeadCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell><Avatar img="/profile/photo.webp" rounded /></TableCell>
                    <TableCell>
                      Jose Cerrato
                    </TableCell>
                    <TableCell>1524</TableCell>
                    <TableCell>Ciudad Universitaria</TableCell>
                    <TableCell>Ingeniería en Sistemas</TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
            </div>
            <ModalTeacher/>
        </>
    );
}