import { useState, useRef, useEffect } from 'react';
import { Avatar } from 'flowbite-react';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { PrivateRoutes } from '@/data/routes';

export default function Teacher() {
  const [selectedRow, setSelectedRow] = useState(null);
  const dropdownRef = useRef(null);

  const handleRowClick = (index) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSelectedRow(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const teachers = [
    { name: 'Jose Cerrato', id: 1524, center: 'Ciudad Universitaria', department: 'Ingeniería en Sistemas' },
    { name: 'Maria Perez', id: 1525, center: 'Ciudad Universitaria', department: 'Ingeniería Civil' },
    { name: 'Pedro Lopez', id: 1526, center: 'Ciudad Universitaria', department: 'Ingeniería Eléctrica' },
  ];

  return (
    <>
      <div className="flex justify-end mr-20">
        <Link
          className="bg-purple-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-purple-800 transition-colors"
          style={{ border: "3px solid gray" }}
          to={`/myspace/${PrivateRoutes.ADD_TEACHER}`}
        >
          Agregar Nuevo Docente
        </Link>
      </div>
      <div className="mr-20 ml-20" style={{ marginTop: "60px" }}>
        <Table hoverable className="text-center bg-white">
          <TableHead className="border border-gray-200">
            <TableHeadCell>Foto</TableHeadCell>
            <TableHeadCell>Nombre Docente</TableHeadCell>
            <TableHeadCell>Número de Empleado</TableHeadCell>
            <TableHeadCell>Centro Regional</TableHeadCell>
            <TableHeadCell>Departamento que pertenece</TableHeadCell>
          </TableHead>
          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow
                key={index}
                className="border border-gray-200 cursor-pointer relative"
                onClick={() => handleRowClick(index)}
              >
                <TableCell><Avatar img="/profile/photo.webp" rounded /></TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.id}</TableCell>
                <TableCell>{teacher.center}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                {selectedRow === index && (
                  <TableCell colSpan="5" className="relative">
                    <div
                      ref={dropdownRef}
                      className="absolute w-[300px] left-[-100px] bg-white shadow-lg rounded-md mt-2"
                    >
                      <ul>
                        <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                        <Link
                            className="bg-purple-600 text-white px-2 py-1 rounded-md shadow-md hover:bg-purple-800 transition-colors"
                            style={{ border: "3px solid gray" }}
                            to={`/myspace/${PrivateRoutes.EDIT_TEACHER}`}
                          >
                            Ver Perfil de Docente
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
