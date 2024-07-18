type ButtonSubmitProps ={
    className? : string
    value : string
}

export default function ButtonSubmit({className, value} : ButtonSubmitProps) {
  return (
    <input
        type="submit"
        value={value}
        className={` bg-tertiary w-full p-3 text-white uppercase font-bold hover:bg-tertiary/80 cursor-pointer transition-colors ${className}`}
      />
  )
}
