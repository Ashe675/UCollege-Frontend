import { SectionSpace } from "@/types/teacher";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IconBookFilled, IconGraphFilled, IconX } from "@tabler/icons-react";
import ContentSection from "./ContentSection";
import { Link } from "react-router-dom";
import TabStudentsSection from "./TabStudentsSection";
import GradesSection from "./GradesSection";
import { useUserStore } from "@/stores/userStore";

import { isTeacher } from "@/utils/user";

type TabsSectionProps = {
  section: SectionSpace;
};

export default function TabsSection({ section }: TabsSectionProps) {
  const user = useUserStore((state) => state.user);

  return (
    <TabGroup className="w-full h-full flex flex-col relative ">
      <TabList className=" rounded-md w-full flex justify-between h-10">
        <Link
          to={"/"}
          className="bg-red-600 p-2 rounded-md hover:bg-red-700 mr-1 shadow-sm"
        >
          <IconX className=" text-white " />
        </Link>
        <div className="bg-gray-400 rounded-md w-full flex justify-between min-h-10 ">
          <Tab className="rounded-md p-2 text-sm/6 font-bold text-white focus:outline-none data-[selected]:bg-tertiary data-[hover]:bg-tertiary/50  w-full data-[selected]:data-[hover]:bg-tertiary/90 data-[focus]:outline-1 data-[focus]:outline-white flex gap-2 uppercase text-center justify-center">
            <IconBookFilled className=" text-white " />
            <span className=" hidden md:inline">Contenido</span>
          </Tab>
          <Tab className="rounded-md p-2 text-sm/6 font-bold text-white focus:outline-none data-[selected]:bg-tertiary data-[hover]:bg-tertiary/50  w-full data-[selected]:data-[hover]:bg-tertiary/90 data-[focus]:outline-1 data-[focus]:outline-white flex gap-2 uppercase text-center justify-center">
            <svg
              width="25"
              height="25"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.3334 13.6667C27.3334 17.4421 24.2755 20.5 20.5 20.5C16.7246 20.5 13.6667 17.4421 13.6667 13.6667L13.8546 12.0608L8.54171 9.39583L20.5 3.41666L32.4584 9.39583V17.9375H30.75V10.25L27.1455 12.0608L27.3334 13.6667ZM20.5 23.9167C28.0509 23.9167 34.1667 26.9746 34.1667 30.75V34.1667H6.83337V30.75C6.83337 26.9746 12.9492 23.9167 20.5 23.9167Z"
                fill="white"
              />
            </svg>
            <span className=" hidden md:inline">Miembros</span>
          </Tab>
          {isTeacher(user.role.name) && (
            <Tab className="rounded-md p-2 text-sm/6 font-bold text-white focus:outline-none data-[selected]:bg-tertiary data-[hover]:bg-tertiary/50 w-full data-[selected]:data-[hover]:bg-tertiary/90 data-[focus]:outline-1 data-[focus]:outline-white flex gap-2 uppercase text-center justify-center">
              <IconGraphFilled className=" text-white" />
              <span className=" hidden md:inline">Calificaciones</span>
            </Tab>
          )}
        </div>
      </TabList>

      <TabPanels className="space-y-2 relative h-full flex flex-col">
        <TabPanel className="data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full data-[selected]:gap-2 data-[selected]:relative">
          <ContentSection section={section} />
        </TabPanel>
        <TabPanel
          className={
            "data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full "
          }
        >
          <TabStudentsSection section={section} />
        </TabPanel>
        <TabPanel
          className={
            "data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full "
          }
        >
          <GradesSection section={section} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
