import { SectionSpace } from "@/types/teacher";
import TabsSection from './TabsSection';

type SectionSpaceProps = {
  section: SectionSpace;
};

export default function SectionVirtualSpace({ section }: SectionSpaceProps) {
  return (
    <div className=" relative w-full h-full p-4">
      <div className=" h-full w-full bg-slate-100 rounded-md flex  relative z-[5] shadow-md p-3">
        <TabsSection section = {section}/>
      </div>
      <div className=" bg-primaryBlue h-1/2 absolute w-full top-0 left-0 "></div>
      <div className=" bg-slate-100 h-1/2 absolute w-full bottom-0 left-0 "></div>
    </div>
  );
}
