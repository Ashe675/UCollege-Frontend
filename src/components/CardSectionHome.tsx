import { DataSectionEnrollment } from "@/types/student";


type CardSectionHomeProps = {
    section: DataSectionEnrollment;
  };
  

export default function CardSectionHome({section} : CardSectionHomeProps) {
  return (
    <div className=" rounded-md shadow-md w-full min-h-40 flex relative bg-white p-4">
        
        <div className=" absolute bottom-0 space-y-3 w-full left-0 p-4">
            <h2 className=" text-slate-500" >{section.sectionCode}</h2>
            <div className=" flex justify-between flex-wrap">
                <div className=" text-slate-700  font-bold uppercase">{section.className}</div>
                <div className=" text-slate-700  font-bold">{section.sectionCode}</div>
            </div>
        </div>
    </div>
  )
}
