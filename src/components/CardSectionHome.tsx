import { PrivateRoutes } from "@/data/routes";
import { SectionHome } from "@/types/teacher";
import { useNavigate } from "react-router-dom";

type CardSectionHomeProps = {
  section: SectionHome;
};

export default function CardSectionHome({ section }: CardSectionHomeProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(PrivateRoutes.SECTION + `/${section.id}`);
  };

  return (
    <div
      className=" rounded-md bg-transparent flex-col w-full min-h-[260px] flex relative space-y-1  transition-transform hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <div className=" relative top-0 p-1 pb-0 rounded-md w-full z-[2]">
        <img
          src={
            section.resources.length
              ? section.resources[0]?.url
              : "/resources/abstract.jpg"
          }
          alt=""
          className="h-[157px] w-full object-cover rounded-md"
        />
      </div>
      <div className=" bg-white absolute space-y-3 w-full shadow-md rounded-md left-0 bottom-0 h-[240px]"></div>
      <div className=" relative bottom-0 p-3 pb-2 pt-0 w-full flex flex-col justify-between h-full">
        <h2 className=" text-slate-500">Facultad de {section.factulty.name}</h2>
        <div className=" flex justify-between  flex-wrap">
          <div className=" text-slate-600  font-bold uppercase">
            {section.class.name}
          </div>
          <div className=" text-slate-600  font-bold">{section.code}</div>
        </div>
      </div>
    </div>
  );
}
