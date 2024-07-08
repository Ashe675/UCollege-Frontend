import LogoWhite from "../LogoWhite";


export default function AdmisssionNavbar() {
  return (
    <>
      <div className=" p-3 mx-auto border-b border-white/30 fixed w-full top-0 z-10 bg-primary shadow-sm">
        <div className=" w-40 sm:w-52">
          <a href="/admisiones">
            <LogoWhite />
          </a>
        </div>
      </div>
    </>
  );
}
