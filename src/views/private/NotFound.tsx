import { Link } from "react-router-dom";
import { IconMoodSadDizzy } from '@tabler/icons-react';
import LogoWhite from "@/components/LogoWhite";
import { useAppStore } from "@/stores/appStore";

export default function NotFound() {
  const resetTitle = useAppStore(state =>  state.resetTitle)
  resetTitle()

  return (
    <div className=" container mx-auto max-w-xl flex justify-center min-h-screen flex-col text-center relative">
      <LogoWhite className=" w-64 mx-auto absolute top-16 left-0 right-0"/>
      <IconMoodSadDizzy className=" mx-auto" stroke={1} size={150} color="#fff"/>
      <h1 className=" text-6xl font-black text-white">404</h1>
      <h2 className=" text-4xl font-black text-white">Página no encontrada</h2>
      <Link to={"/"} className=" mt-5 text-secondary hover:text-secondary/90 underline">Volver a Inicio</Link>
    </div>
  )
}
