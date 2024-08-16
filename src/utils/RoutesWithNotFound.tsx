import NotFound from "@/views/private/NotFound";
import { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";

type routesWithNotFoundProps = {
  children: ReactNode;
};

export default function RoutesWithNotFound({
  children,
}: routesWithNotFoundProps) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
