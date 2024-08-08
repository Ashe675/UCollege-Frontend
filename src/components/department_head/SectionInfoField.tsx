type SectionInfoProps = {
  label: string;
  info: string;
};

export default function SectionInfoField({ label, info }: SectionInfoProps) {
  return (
    <div className="space-y-1 flex flex-col w-full">
      <label
        htmlFor="teacherId"
        className=" font-bold block  uppercase text-slate-600"
      >
        {label}
      </label>
      <div className=" p-2 text-slate-600 bg-slate-200 border border-slate-300 rounded-md py-3 text-sm/6">
        {info}
      </div>
    </div>
  );
}
