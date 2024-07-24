import { ReactNode } from "react";

type ButtonCustomProps = {
  className?: string;
  children: ReactNode;
};

export default function ButtonCustom({
  children,
  className,
}: ButtonCustomProps) {
  return (
    <button
      type="button"
      className={`  w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
