import { Link } from "react-router-dom";

type CardNavigateProps = {
  title: string;
  className: string;
  description: string;
  href: string;
  children: React.ReactNode;
};

export default function CardNavigate({
  title,
  description,
  className,
  href,
  children,
}: CardNavigateProps) {
  return (
    <Link to={href} className=" w-full lg:max-w-96 max-h-48 bg-white shadow-md flex p-5 rounded-md hover:scale-105 transition-transform cursor-pointer">
      <div className="  w-full">
        <div className="text-2xl sm:text-2xl text-slate-500 font-semibold mb-2">
          {title}
        </div>
        <div className=" text-sm sm:text-lg text-slate-400 font-light">
          {description}
        </div>
      </div>
      <div className=" flex h-full items-start justify-end">
        <div className={` ${className} rounded-full p-2 text-white`}>
          {children}
        </div>
      </div>
    </Link>
  );
}
