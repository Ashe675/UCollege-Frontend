import { SectionSpace } from "@/types/teacher";

type GradesSectionProps = {
  section: SectionSpace;
};

export default function GradesSection({ section }: GradesSectionProps) {
  return (
    <div className=" h-full w-full flex bg-white">
      <h2>{section.code}</h2>
    </div>
  );
}
