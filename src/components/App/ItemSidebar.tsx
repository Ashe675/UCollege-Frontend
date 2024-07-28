import { Link, useLocation } from "react-router-dom";
import { Icon } from "@tabler/icons-react";
import { useAppStore } from "@/stores/appStore";


type ItemSidebarProps = {
    Icon : Icon,
    text : string,
    link : string
}

export default function ItemSidebar({Icon, text, link} : ItemSidebarProps) {
  const setTitle = useAppStore(state => state.setTitle)

  const location = useLocation();
  
  const active = location.pathname.includes(`/myspace/${link}`) || location.pathname === link 
  
  const handleClick = () => {
    setTitle(text)
  }

  return (
    <Link
      to={link}
      onClick={handleClick}
      className={` text-[16px] transition-colors w-full flex gap-4 p-2 rounded-md hover:text-primary items-center group ${active && 'text-primary bg-white shadow-lg' } `}
      
    >
      <Icon
        size={35}
        stroke={2}
        className={`  p-2 rounded-md shadow-md   group-hover:text-white group-hover:bg-primary transition-colors ${active ? 'bg-primary text-white' : 'bg-white' }`}
      />
      {text}
    </Link>
  );
}
