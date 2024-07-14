
type HeroProps = {
    children? : React.ReactNode
    title : string
    description : string
    className? : string
}

export default function Hero({children, title, description, className} : HeroProps) {
  return (
    <div className={` container mx-auto p-4 sm:p-10 max-w-xl ${className}`}>
      <h1 className=" font-semibold text-4xl text-white text-center">
        {title}
      </h1>
      <p className=" mt-5 text-white text-pretty font-light text-justify">
        {description}
      </p>
      {children}
    </div>
  );
}
