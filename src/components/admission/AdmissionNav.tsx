import { PublicRoutes } from "@/data/routes";
import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function AdmissionNav() {
  return (
    <Navbar fluid className=" bg-primaryBlue w-full px-6 ">
      <Navbar.Brand href={PublicRoutes.ADMISSION}>
        <img
          src="/LogoWhite.png"
          className="mr-4 h-10 sm:h-11"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse> 
        <Link to={PublicRoutes.ADMISSION} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2 flex gap-1 items-center">Inicio</Link>
        <Link to={PublicRoutes.ADMISSION_INSCRIPTION} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2 flex gap-1 items-center">Inscripciones</Link>
        <Link to={PublicRoutes.ADMISSION_EXAMS} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2 flex gap-1 items-center">Examenes</Link>
        <Link to={PublicRoutes.ADMISSION_RESULTS} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2 flex gap-1 items-center">Resultados</Link>
        <Link to={PublicRoutes.LOGIN} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2 flex gap-1 items-center"><span>Iniciar Sesión</span></Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
