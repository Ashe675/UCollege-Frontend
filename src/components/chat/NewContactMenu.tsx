import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { PencilIcon, Square2StackIcon } from "@heroicons/react/16/solid";
import { IconUsersPlus } from "@tabler/icons-react";

export default function NewContactMenu() {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-md  text-sm/6 font-semibold text-white">
        <span className=" p-2 bg-blue-500 cursor-pointer hover:bg-blue-700 rounded-full">
          <IconUsersPlus className=" size-4"  stroke={3}/>
        </span>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-lg border bg-white shadow-md p-1 text-sm/6 text-slate-600 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 "
      >
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200">
            <PencilIcon className="size-4 " />
            Chat Individual
          </button>
        </MenuItem>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-slate-200">
            <Square2StackIcon className="size-4 " />
            Chat Grupal
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
