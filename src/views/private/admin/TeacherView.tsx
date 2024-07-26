import { PrivateRoutes } from "@/data/routes";
import { Avatar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function TeacherView() {
  const teachers = [
    {
      name: "Jose Cerrato",
      id: 1524,
      center: "Ciudad Universitaria",
      department: "Ingeniería en Sistemas",
    },
    {
      name: "Maria Perez",
      id: 1525,
      center: "Ciudad Universitaria",
      department: "Ingeniería Civil",
    },
    {
      name: "Pedro Lopez",
      id: 1526,
      center: "Ciudad Universitaria",
      department: "Ingeniería Eléctrica",
    },
  ];

  

  return (
    <div className=" w-full h-full bg-slate-100 p-5">
      <div className="flex justify-end w-full bg-transparent">
        <Link
          className="bg-tertiary text-white font-bold uppercase text-sm p-3 rounded-sm shadow-md  hover:bg-tertiary/90 transition-colors"
          to={`/myspace/${PrivateRoutes.CHAT}`}
        >
          Agregar Nuevo Docente
        </Link>
      </div>
      <div className=" overflow-x-auto shadow-md  mt-4 rounded-sm" >
        <table className=" bg-white table-auto min-w-max w-full">
          <thead className=" text-slate-500 uppercase text-sm">
            <tr className=" border-b border-slate-200">
              <th className=" p-3">Foto</th>
              <th className=" p-3">Nombre</th>
              <th className=" p-3">Número de Empleado</th>
              <th className=" p-3">Centro Regional</th>
              <th className=" p-3">Departamento</th>
              <th className=" p-3">Rol</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-slate-200">
            {teachers.map(teacher => (
                <tr className=" hover:bg-slate-100 cursor-pointer" key={teacher.id}>
                    <td className=" p-3 "><Avatar rounded img={'/profile/photo.webp'}/></td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
