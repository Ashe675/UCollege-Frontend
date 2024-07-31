import { ReactNode } from "react";

type ButtonCustomWithClickProps = {
  className?: string;
  children: ReactNode;
  onClick?: (...args: unknown[]) => void;
};

export default function ButtonCustomWithClick({
  children,
  className,
  onClick
}: ButtonCustomWithClickProps) {
  return (
    <button
      type="button"
      className={`  w-full   uppercase font-bold cursor-pointer transition-colors ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
