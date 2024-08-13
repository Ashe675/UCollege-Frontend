import InfoUser from "@/components/userProfile";

export default function ProfileInfo() {
  return (
    <>
      <div className="p-5 relative w-full h-full overflow-hidden">
        <div className="bg-secondaryDark absolute w-full h-[60%] left-0 top-0 z-0"></div>
        <div className="bg-slate-200 absolute w-full h-[40%] left-0 bottom-0 z-0"></div>
        <div className="relative z-10">
          <InfoUser />
        </div>
      </div>
    </>
  );
}
