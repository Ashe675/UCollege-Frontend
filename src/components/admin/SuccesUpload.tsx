import React from 'react';

export default function SuccesUpload({children} : {children : React.ReactNode}) {
  return (
    <div className=" bg-green-500 p-7 mx-auto max-w-lg">
        <h2 className=" text-white uppercase text-xl font-bold text-center">
            {children}
        </h2>
    </div>
  )
}
