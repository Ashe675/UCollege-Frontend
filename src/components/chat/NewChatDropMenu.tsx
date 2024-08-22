import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import {
  IconCirclePlusFilled,
  IconPlus,
  IconUsersPlus,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

// type NewChatDropMenuProps = {
// };

export default function NewChatDropMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md  text-sm/6 font-semibold text-white">
          <IconCirclePlusFilled className=" size-9 text-blue-500 hover:text-blue-700 cursor-pointer shadow-sm" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-lg border bg-white shadow-md p-1 text-sm/6 text-slate-600 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 "
        >
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-slate-200"
              onClick={() =>
                navigate(location.pathname + "?nuevoChat=true")
              }
            >
              <IconPlus stroke={2} />
              Nuevo Chat
            </button>
          </MenuItem>
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-2 px-3 data-[focus]:bg-slate-200"
              onClick={() =>
                navigate(location.pathname + "?nuevoChat=true&grupal=true")
              }
            >
              <IconUsersPlus stroke={2} />
              Nuevo Grupo
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );
}
