import "./SpinnerFull.css";

export default function SpinnerFull() {
  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className={`sk-chase2 `}>
        <div className={`sk-chase-dot2`}></div>
        <div className={`sk-chase-dot2`}></div>
        <div className={`sk-chase-dot2`}></div>
        <div className={`sk-chase-dot2`}></div>
        <div className={`sk-chase-dot2`}></div>
        <div className={`sk-chase-dot2`}></div>
      </div>
    </div>
  );
}
