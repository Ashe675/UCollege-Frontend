import { ReactNode } from "react";

type InfoRowSectionProps = {
  children: ReactNode;
  label: string;
};

export default function InfoRowSection({
  children,
  label,
}: InfoRowSectionProps) {
  return (
    <div className=" flex justify-between items-center rounded-md pl-2 bg-slate-200 flex-wrap">
      {label} :{" "}
      <span className=" bg-blue-500 text-white p-1 rounded-md px-3">
        {children}
      </span>
    </div>
  );
}
