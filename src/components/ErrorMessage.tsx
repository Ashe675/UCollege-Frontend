export default function ErrorMessage({children, className} : {children : React.ReactNode, className?:string}) {
    return (
      <div className={` text-center my-4 bg-red-100 text-red-600 font-semibold p-3 uppercase text-sm ${className}`}>
          {children}
      </div>
    )
  }
  