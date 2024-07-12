import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

export default function AdmissionNav() {
  return (
    <Navbar fluid className="bg-primary w-full px-6">
      <Navbar.Brand href="/admisiones/">
        <img
          src="/LogoWhite.png"
          className="mr-3 h-10 sm:h-11"
          alt="Flowbite React Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to={"/admisiones/"} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2">Inicio</Link>
        <Link to={"/admisiones/inscripcion"} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2">Inscripciones</Link>
        <Link to={"/admisiones/examenes"} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2">Examenes</Link>
        <Link to={"/admisiones/resultados"} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2">Resultados</Link>
        <Link to={"/login"} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2">Login</Link>
        <Link to={"/admisiones/admin"} className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2">Admin</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
