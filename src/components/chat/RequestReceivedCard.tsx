import { FriendRequest } from "@/types/chat";
import { formatLatinaDateTime } from "@/utils/date";
import { getFullName } from "@/utils/user";
import { Avatar } from "flowbite-react/components/Avatar";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, declineFriendRequest } from "@/api/chat/ChatApi";
import { useRef } from "react";
import { toast } from "react-toastify";

export default function RequestReceivedCard({ req }: { req: FriendRequest }) {
  const toastId = useRef<null | number | string>(null);
  const queryClient = useQueryClient();

  const { mutate: accept, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({ queryKey: ["requests", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    },
  });

  const { mutate: decline, isPending: isPendingDecline } = useMutation({
    mutationFn: declineFriendRequest,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({ queryKey: ["requests", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
    },
  });

  const pending = isPending || isPendingDecline;


  const handleAccept = () => {
    toastId.current = toast.loading("Aceptando Solicitud...");
    accept(req.id)
  }

  const handleDecline = () => {
    toastId.current = toast.loading("Rechazando Solicitud...");
    decline(req.id)
  }

  return (
    <div className=" flex flex-col gap-y-2 w-full bg-white p-2 rounded-lg">
      <div className=" flex w-full gap-x-3 ">
        <div className=" min-w-10 flex items-center justify-center">
          <Avatar rounded img={req.sender.images[0]?.url} size={"md"} />
        </div>

        <div className=" flex flex-col gap-y-2 w-full">
          <div className=" font-semibold flex flex-wrap gap-x-2 items-center text-pretty">
            <span>
              {getFullName(
                req.sender.person.firstName,
                req.sender.person.middleName,
                req.sender.person.lastName,
                req.sender.person.secondLastName
              )}
            </span>
            <span className=" text-xs text-slate-400">
              {req.sender.identificationCode}
            </span>
          </div>
          <div className=" text-xs font-semibold text-slate-500 text-pretty">
            Enviada: {formatLatinaDateTime(req.createdAt)}
          </div>
        </div>
      </div>
      <div className=" flex gap-x-2">
        <ButtonCustomWithClick disabled = {pending} onClick={handleDecline} className=" text-white text-xs p-1 rounded-lg bg-red-500   hover:bg-red-600 ">
          Rechazar
        </ButtonCustomWithClick>
        <ButtonCustomWithClick  disabled = {pending} onClick={handleAccept} className=" text-white text-xs p-1 rounded-lg bg-green-500  hover:bg-green-600">
          Aceptar
        </ButtonCustomWithClick>
      </div>
    </div>
  );
}
