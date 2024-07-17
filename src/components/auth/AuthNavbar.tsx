import { Link } from "react-router-dom";
import LogoWhite from "../LogoWhite";
import { IconLogout2 } from "@tabler/icons-react";
import { PublicRoutes } from "@/data/routes";

export default function AuthNavbar() {
  return (
    <div className=" p-3 sm:px-5 container mx-auto top-0 z-10 max-w-xl flex h-[64px] gap-4 justify-between bg-secondary">
      <Link to={PublicRoutes.ADMISSION} >
        <LogoWhite className=" h-[45px]" />
      </Link>

      <Link
        to={PublicRoutes.ADMISSION}
        className=" text-white text-[16px] font-normal hover:text-slate-300 max-md:hover:bg-secondary/60 max-md:p-2 flex gap-1 items-center bg-red-600 p-3 rounded-sm"
      >
        <IconLogout2 stroke={2} />
        Admisiones
      </Link>
    </div>
  );
}
