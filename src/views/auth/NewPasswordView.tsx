import { getToken } from "@/api/auth/AuthApi";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import SpinnerFull from "@/components/spinner/SpinnerFull";
import { PublicRoutes } from "@/data/routes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

export default function NewPasswordView() {
  const params = useParams();
  const token = params.token!;
  const [isValidToken, setIsValidToken] = useState(false);
  const [userToken, setUserToken] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getToken(token),
    queryKey: ["token", token],
    retry: false,
  });

  if (isLoading) return <SpinnerFull />;

  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <div className="container mx-auto   max-w-xl mt-10 p-4">
        <h1 className=" font-black text-white text-4xl sm:text-5xl">
          Restablece tu Contraseña
        </h1>
        <p className=" text-white font-light text-xl mt-4">
          {!isValidToken ? (
            <>
              Ingresa el código que te enviamos{" "}
              <span className=" text-primary font-bold">por email</span>.
            </>
          ) : (
            <>
              Establece tu{" "}
              <span className=" text-primary font-bold">nueva contraseña</span>.
            </>
          )}
        </p>
        {!isValidToken ? (
          <NewPasswordToken
            token={userToken}
            setToken={setUserToken}
            setIsValidToken={setIsValidToken}
          />
        ) : (
          <NewPasswordForm token={userToken} />
        )}
        
          <nav className="text-center text-slate-300 mt-6 text-sm space-y-2 pb-3 sm:pb-0" >
            <Link
              to={PublicRoutes.FORGOT_PASSWORD}
              className="hover:text-slate-400 block"
            >
              Solicitar un nuevo código
            </Link>
          </nav>
        
      </div>
    );
}
