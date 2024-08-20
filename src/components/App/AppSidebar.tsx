import { Link, useNavigate } from "react-router-dom";
import LogoBlue from "../LogoBlue";
import { IconLogout2 } from "@tabler/icons-react";
import ItemSidebar from "./ItemSidebar";
import { Dispatch } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Dropdown from "./Dropdown";
import { useUserStore } from "@/stores/userStore";
import { menuItems } from "@/data/sidebarItems";
import { useAppStore } from "@/stores/appStore";
import { userLogout } from "@/api/auth/AuthApi";
import { Spinner } from "flowbite-react/components/Spinner";

export function AppSidebar({
  className,
  role,
  show,
  setShow,
}: {
  className?: string;
  role: string;
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const deletUser = useUserStore((state) => state.deleteUser);
  const resetTitle = useAppStore((state) => state.resetTitle);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: userLogout,
    onSettled : () =>{
      localStorage.removeItem("AUTH_TOKEN");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      deletUser();
      resetTitle();
      queryClient.removeQueries()
      navigate("/auth/login");
    }
  });

  async function logout() {
    mutate();
  }

  const menuItemsActive = Object.entries(menuItems).find((item) =>
    item[0] === role ? item[1] : null
  );

  return (
    <>
      <div
        className={`fixed z-[30] bg-black/60 w-full sm:invisible h-screen ${
          show ? "visible" : "invisible"
        }`}
        onClick={() => setShow(false)}
      ></div>
      <div
        className={` ${className} p-4 flex fixed z-30  flex-col justify-between transition-all duration-500 text-gray-500 font-semibold ease-in-out ${
          !show ? " -left-full" : "left-0 "
        } `}
      >
        <div className=" flex flex-col">
          <div className=" flex justify-center mb-10 relative items-center">
            <Link to="/" className=" ml-12 sm:ml-0">
              <LogoBlue className=" h-[45px]" />
            </Link>
          </div>
          <div className="">
            {menuItems.USER.itemsPrincipals.map((item) => (
              <ItemSidebar
                key={item.link}
                Icon={item.icon}
                link={item.link}
                text={item.text}
              />
            ))}
            {menuItemsActive &&
              menuItemsActive[1].itemsPrincipals.map((item) => (
                <ItemSidebar
                  key={item.link}
                  Icon={item.icon}
                  link={item.link}
                  text={item.text}
                />
              ))}

            {menuItemsActive &&
              menuItemsActive[1].dropdown.items.length > 0 && (
                <Dropdown dropdown={menuItemsActive[1].dropdown} />
              )}
          </div>
        </div>
        <div className=" flex justify-center mb-2">
          <button
            disabled={isPending}
            className=" hover:bg-red-600  transition-colors w-full flex gap-4 p-2 rounded-md hover:text-white items-center group text-[16px] disabled:bg-gray-400 disabled:justify-center"
            onClick={logout}
          >
            {isPending ? (
              <Spinner  color="failure" />
            ) : (
              <>
                <IconLogout2
                  size={35}
                  stroke={3}
                  className=" bg-red-600 text-white p-2 rounded-md shadow-md  group-hover:text-red-600 group-hover:bg-white transition-colors"
                />
                Cerrar Sesión
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
