
type InfoSectionTabProps = {
    title : string;
    info : string;
}

export default function InfoSectionTab({title, info} : InfoSectionTabProps) {
  return (
    <div className=" text-slate-500 font-semibold text-sm  sm:text-lg flex gap-x-2 flex-wrap">
        {title}:{" "}
        <span className=" text-tertiary">{info}</span>
      </div>
      )
}