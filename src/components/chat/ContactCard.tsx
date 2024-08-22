import { useSocketStore } from "@/stores/socketStore";
import { UserFriend } from "@/types/chat";
import { formatLatinaDateTime } from "@/utils/date";
import { getFullName } from "@/utils/user";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar } from "flowbite-react/components/Avatar";
import { useEffect, useState } from "react";

type ContactCardProps = {
  contact: UserFriend;
};

export default function ContactCard({ contact }: ContactCardProps) {
  const { socket } = useSocketStore();
  const [lastOnline, setLastOnline] = useState(contact.lastOnline);
  const queryClient = useQueryClient()

  useEffect(() => {
    setLastOnline(contact.lastOnline)
  }, [contact?.lastOnline])


  useEffect(() => {
    if (socket) {
      const handleUserStatusChanged = ({
        userId,
        isOnline,
        lastOnline,
      }: {
        userId: number;
        isOnline: boolean;
        lastOnline: string;
      }) => {
        if (contact.id == userId) {
          setLastOnline(isOnline ? undefined : lastOnline);
          queryClient.invalidateQueries({queryKey : ["contacts"]})
          queryClient.invalidateQueries({queryKey : ["conversations"]})
        }
      };

      socket.on("userStatusChanged", handleUserStatusChanged);

      return () => {
        socket.off("userStatusChanged");
      };
    }
  }, [socket, contact, queryClient]);

  return (
    <div className=" flex w-full gap-x-3 bg-white p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
      <div className=" min-w-10 flex items-center justify-center">
        <Avatar
          rounded
          img={contact.images[0]?.url}
          size={"md"}
          status={lastOnline ? "offline" : "online" }
          statusPosition="bottom-right"
        />
      </div>
      <div className=" flex flex-col gap-y-1 truncate">
        <div className=" font-semibold flex flex-wrap gap-x-1 items-center text-pretty">
          <span>
            {getFullName(
              contact.person.firstName,
              contact.person.middleName,
              contact.person.lastName,
              contact.person.secondLastName
            )}
          </span>
          <span className=" text-xs text-slate-400">
            {contact.identificationCode}
          </span>
        </div>
        <div className=" text-xs font-semibold text-slate-400  truncate">
          {lastOnline
            ? `Última vez: ${formatLatinaDateTime(lastOnline)}`
            : "Activo ahora"}
        </div>
      </div>
    </div>
  );
}
