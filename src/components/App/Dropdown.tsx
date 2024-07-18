import {
  Icon,
  IconCaretDownFilled,
  IconCaretUpFilled,
  IconListDetails,
  IconProps,
} from "@tabler/icons-react";
import { useState } from "react";
import ItemSidebar from "./ItemSidebar";

type DropdownProps = {
  dropdown: {
    name: string;
    items: {
      icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<Icon>
      >;
      text: string;
      link: string;
    }[];
  };
};

export default function Dropdown({ dropdown }: DropdownProps) {
  const [isDropable, setIsDropable] = useState(false);

  return (
    <div className={` ${isDropable && " bg-white rounded-md   pb-2"}`}>
      <button
        className={`  transition-colors w-full flex gap-4 p-2 rounded-md hover:text-primary items-center group ${
          isDropable && "text-primary-light bg-white shadow-lg"
        }  justify-between mb-2`}
        onClick={() => setIsDropable(!isDropable)}
      >
        <div className=" flex gap-4 items-center text-[16px]">
          <IconListDetails
            size={35}
            stroke={2}
            className={` text-[16px]  p-2 rounded-md shadow-md  group-hover:text-white group-hover:bg-primary-light transition-colors ${
              isDropable ? "bg-primary text-white" : "bg-white"
            }`}
          />
          {dropdown.name}
        </div>
        {isDropable ? <IconCaretUpFilled /> : <IconCaretDownFilled />}
      </button>
      {isDropable && (
        <div className="pl-4">
          {dropdown.items.map((item) => (
            <ItemSidebar key={item.text} Icon={item.icon} text={item.text} link={item.link} />
          ))}
        </div>
      )}
    </div>
  );
}
