import AdmisssionNavbar from "../../components/Admission/AdmisssionNavbar";
import style from "./AdmissionLayout.module.css";

export default function AdmissionLayout() {
  return (
    <>
      <div
        className={`min-h-screen ${style.bgColor} absolute top-0 w-full -z-10`}
      ></div>
      <AdmisssionNavbar />

      <div className="absolute bottom-0 w-full -z-10 ">
          <img src="/wave.svg" />
          <div className=" h-40 lg:h-10 bg-[#172B4D]"></div>
      </div>
    </>
  );
}
