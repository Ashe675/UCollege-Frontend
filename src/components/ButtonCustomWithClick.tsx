import { ReactNode } from "react";

type ButtonCustomWithClickProps = {
  className?: string;
  children: ReactNode;
  onClick?: (...args: unknown[]) => void;
  disabled? : boolean
};

export default function ButtonCustomWithClick({
  children,
  className,
  onClick,
  disabled
}: ButtonCustomWithClickProps) {
  return (
    <button
      disabled = {disabled }
      type="button"
      className={`  w-full   uppercase font-bold ${disabled ? ' cursor-default' : ' cursor-pointer '} transition-colors ${className} disabled:bg-gray-400`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
