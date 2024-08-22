
import { IconMailOpenedFilled } from "@tabler/icons-react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../ErrorMessage";
import RequestSendCard from "./RequestSendCard";
import RequestReceivedCard from "./RequestReceivedCard";
import { useEffect } from "react";
import { FriendRequestData } from "@/types/chat";

type RequestSectionProps = {
    setCountFriendRequest: React.Dispatch<React.SetStateAction<number>>
    data : FriendRequestData | undefined,
    error : Error | null
    isLoading : boolean
}


export default function RequestSection({setCountFriendRequest, data, error, isLoading} : RequestSectionProps) {
  

  useEffect(() => {
    if(data?.friendRequestReceived.length !== undefined){
        setCountFriendRequest(data?.friendRequestReceived.length)
    }
  }, [data?.friendRequestReceived.length, setCountFriendRequest])

  return (
    <>
      <div className=" justify-between w-full flex  text-xl">
        <div className=" flex gap-x-2 text-slate-600  items-center  py-4">
          <span>Solicitudes</span>
          <IconMailOpenedFilled />
        </div>
      </div>
      <div className="flex flex-col gap-y-3  w-full ">
        {isLoading && (
          <div className=" h-full flex items-center mt-20">
            <Spinner />
          </div>
        )}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        {data && (
          <div className=" overflow-y-auto max-h-[515px] flex flex-col h-full gap-2 pr-1">
            <section className=" flex flex-col gap-2 w-full flex-1 bg-slate-200 rounded-lg">
              <h2 className=" bg-blue-500 p-2 text-white font-semibold uppercase text-sm rounded-lg text-center">
                Recibidas
              </h2>
              {data.friendRequestReceived.length ? (
                <div className="flex  h-full p-2 text-slate-600  flex-col gap-y-2">
                  {data.friendRequestReceived.map((req) => (
                    <RequestReceivedCard key={req.id} req={req} />
                  ))}
                </div>
              ) : (
                <div className=" p-2 text-xs text-slate-500">
                  No hay solicidutes recibidas.
                </div>
              )}
            </section>
            <section className=" flex flex-col gap-2 w-full flex-1 bg-slate-200 rounded-lg ">
              <h2 className=" bg-blue-500 p-2 text-white font-semibold uppercase text-sm rounded-lg text-center">
                Enviadas
              </h2>
              {data.friendRequestSent.length ? (
                <div className="flex h-full p-2 text-slate-600 flex-col gap-y-2">
                  {data.friendRequestSent.map((req) => (
                    <RequestSendCard key={req.id} req={req} />
                  ))}
                </div>
              ) : (
                <div className=" p-2 text-xs text-slate-500">
                  No hay solicidutes enviadas.
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </>
  );
}
