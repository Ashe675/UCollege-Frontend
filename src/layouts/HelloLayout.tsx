import { Outlet } from "react-router-dom";

export default function HelloLayout() {
  return (
    <>
        <h1 className=" text-4xl bg-teal-300 p-5">
            Hello Layout
        </h1>
        <Outlet></Outlet>
    </>
  )
}
