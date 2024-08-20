import CancelExcepcionalContent from "@/components/coordinator/CancelExcepcionalContent";
import ChangeCareerContent from "@/components/coordinator/ChangeCareerContent";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function RequestView() {
  return (
    <div className=" px-5 py-5 h-full w-full">
      <TabGroup className=" flex w-full h-full flex-col ">
        <TabList className="flex  rounded-md w-full justify-between  gap-x-2">
          <Tab className="w-full  text-slate-600 bg-white shadow-md p-4 rounded-md data-[hover]:text-white data-[selected]:bg-tertiary data-[hover]:bg-tertiary/60 data-[selected]:data-[hover]:bg-tertiary  data-[selected]:outline-none data-[selected]:text-white uppercase font-semibold">
            Cancelaciones Excepcionales
          </Tab>
          <Tab className="w-full  text-slate-600 bg-white shadow-md p-4 rounded-md data-[hover]:text-white data-[selected]:bg-tertiary data-[hover]:bg-tertiary/60 data-[selected]:data-[hover]:bg-tertiary  data-[selected]:outline-none data-[selected]:text-white uppercase font-semibold">
            Cambios de Carrera
          </Tab>
        </TabList>
        <TabPanels className={`w-full  h-full p-3`}>
          <TabPanel>
            <CancelExcepcionalContent />
          </TabPanel>
          <TabPanel>
            <ChangeCareerContent />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
