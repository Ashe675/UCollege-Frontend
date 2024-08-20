import ChargeAcademicEXCELCard from "@/components/coordinator/ChargeAcademicEXCELCard";
import ChargeAcademicPDFCard from "@/components/coordinator/ChargeAcademicPDFCard";
import { useAppStore } from "@/stores/appStore";
import { useEffect } from "react";

export default function AcademicView() {
  const setTitle = useAppStore((state) => state.setTitle);
  useEffect(() => {
    setTitle("Carga Academica");
  }, [setTitle]);

  return (
    <div className="h-full w-full  px-8 py-5 flex flex-col ">
      <h1 className=" text-slate-600 font-semibold text-3xl py-2">
        Descargar Carga Académica
      </h1>
      <section className="  h-full pb-10 xl:max-h-[500px] w-full grid grid-cols-1 xl:grid-cols-2 gap-7 py-10">
        <ChargeAcademicPDFCard />
        <ChargeAcademicEXCELCard />
      </section>
    </div>
  );
}
