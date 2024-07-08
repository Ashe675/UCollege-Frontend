import FacultyLogo from './FacultyLogo';

export default function ListFacultyLogo() {
  return (
    <div className=" container mx-auto p-10 flex gap-12 flex-wrap justify-evenly mt-5">
        <FacultyLogo alt='Logo Ingeniería' src='/Admissions/IngenieriaLogo.png' className=' size-48 md:size-52 ' />
        <FacultyLogo alt='Logo Ingeniería' src='/Admissions/CienciasMedicasLogo.png'  className=' size-48 md:size-52 '/>
        <FacultyLogo alt='Logo Ingeniería' src='/Admissions/OdontologiaLogo.png'  className=' size-48 md:size-52 '/>
        <FacultyLogo alt='Logo Ingeniería' src='/Admissions/QuimicaFarmaciaLogo.png'  className=' size-48 md:size-52 '/>
    </div>
  )
}
