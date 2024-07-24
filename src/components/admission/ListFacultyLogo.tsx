import FacultyLogo from './FacultyLogo';

export default function ListFacultyLogo() {
  return (
    <div className=" container mx-auto p-10 flex gap-12 flex-wrap justify-evenly mt-5 xl:justify-end xl:pr-32">
        <FacultyLogo alt='Logo de la UNAH' src='/Admissions/LogoPuma.png' className=' h-44 md:h-44 ' />
    </div>
  )
}
