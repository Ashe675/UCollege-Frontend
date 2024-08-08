import { Icon } from "@tabler/icons-react";

type OptionCardProps = {
    onClick ? : () => void;
    title : string;
    Icon : Icon;
    color ? : string
};
  


export default function OptionCard({onClick, title, Icon, color} : OptionCardProps) {
    return (
      <div
        className=" bg-white shadow-md rounded-md w-full p-3 transition-all min-h-40 justify-center hover:scale-105 cursor-pointer flex gap-2 flex-col items-center"
        onClick={onClick}
      >
        <h3 className=" font-bold text-slate-600 text-lg uppercase ">
          {title}
        </h3>
        <div className={` font-semibold  text-${color ? color : 'slate' }-500  uppercase flex gap-2 p-1 px-10 justify-between flex-wrap`}>
          <Icon size={100}/>
        </div>
      </div>
    );
  }
  