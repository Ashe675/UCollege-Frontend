import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { PublicRoutes } from "@/data/routes";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="container mx-auto max-w-xl mt-10 p-4 sm:p-8">
      <h1 className=" font-black text-white text-4xl sm:text-5xl">Restablece tu Contraseña</h1>
      <p className=" text-white font-light text-xl mt-4">
        ¿Olvidaste tu contaseña? ingresa tu correo institucional y <span className=" text-primary font-bold">restablece tu contraseña</span>.
      </p>
      <ForgotPasswordForm/>
      <div className=" text-center text-slate-300 mt-6 text-sm ">
          <Link to={PublicRoutes.LOGIN} className="hover:text-slate-400" >
          Iniciar Sesión
          </Link>
        </div>
    </div>
  );
}
