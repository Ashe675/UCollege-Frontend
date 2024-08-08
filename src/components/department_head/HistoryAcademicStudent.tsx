import { AcademicHistoryResponse } from "@/types/department_head"
import { Avatar } from "flowbite-react/components/Avatar";
import { Card } from '@tremor/react'; 

type HistoryAcademicStudentProps = {
    data : AcademicHistoryResponse
}

export default function HistoryAcademicStudent({data : student} : HistoryAcademicStudentProps) {
    return (
        <div className="p-4 bg-gray-100 w-full">
          <div className="flex items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-md flex-wrap justify-around">
            <Avatar img={student.avatar[0]?.url ? student.avatar[0].url : '' } rounded size='xl' />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{student.nameStudent.replace('null', '')} {student.lastnameStudent.replace('null', '')}</h1>
              <p className="text-gray-600">Código de Identificación: {student.codeIdentification}</p>
              <p className="text-gray-600">Centro Regional: {student.regionalCenter}</p>
              <p className="text-gray-600">Carrera: {student.career}</p>
              <p className="text-gray-600">Promedio Global: {student.globalAverage}</p>
              <p className="text-gray-600">Índice Académico: {student.academicIndex ?? 'N/A'}</p>
            </div>
          </div>
    
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
            {Object.entries(student.years).map(([year, data]) => (
              <Card key={year} className="bg-white shadow-md p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Año {year}</h2>
                <ul>
                  {data.enrollments.map((enrollment) => (
                    <li key={enrollment.codigo} className="mb-2 border-b border-gray-200 pb-2">
                      <p className="text-gray-700 font-medium">{enrollment.nombre}</p>
                      <p className="text-gray-600">Código: {enrollment.codigo}</p>
                      <p className="text-gray-600">UV/CA: {enrollment["uv/ca"]}</p>
                      <p className="text-gray-600">Periodo: {enrollment.periodo}</p>
                      <p className={`text-gray-600 ${enrollment.obs === 'apr' ? 'text-green-500' : 'text-red-500'}`}>
                        Nota: {enrollment.Nota} ({enrollment.obs === 'apr' ? 'Aprobado' : 'Reprobado'})
                      </p>
                    </li>
                  ))}
                  <p className="text-gray-600 mt-2 font-semibold">
                    Total de Clases Aprobadas: {data.totalAprov}
                  </p>
                </ul>
              </Card>
            ))}
          </div>
    
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Resumen</h2>
            <p className="text-gray-700">Suma UV x Nota: {student.SumUVxNota}</p>
            <p className="text-gray-700">Suma UV: {student.SumUV}</p>
            <p className="text-gray-700">Índice Académico: {student.academicIndex ?? 'N/A'}</p>
          </div>
        </div>
      );
}
