import LoginForm from "../../components/auth/LoginForm";
import Hero from "../../components/admission/Hero";
import { IconUserCircle } from "@tabler/icons-react";
import { useUserStore } from "@/stores/userStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PublicRoutes } from "@/data/routes";
import { useQueryClient } from "@tanstack/react-query";


export default function Login() {
  const deleteUser = useUserStore((state) => state.deleteUser);
  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.invalidateQueries()
    deleteUser();
    localStorage.removeItem("AUTH_TOKEN");
  }, [deleteUser, queryClient]);

  return (
    <div className=" bg-secondary pt-2 pb-8">
      <div className="container mx-auto max-w-xl flex justify-center">
        <IconUserCircle size={160} stroke={1} color="#fff" />
      </div>
      <Hero
        title="Inicia Sesión"
        className=" mt-0 sm:pt-2  max-w-xl"
        description="Inicia sesión para acceder a todas las funcionalidades diseñadas para facilitar tu experiencia académica."
      >
        <LoginForm />
        <div className=" text-center text-slate-300 mt-2 text-sm ">
          <Link to={PublicRoutes.FORGOT_PASSWORD} className="hover:text-slate-400" >
          ¿Olvidó su contraseña?
          </Link>
        </div>
      </Hero>
    </div>
  );
}
