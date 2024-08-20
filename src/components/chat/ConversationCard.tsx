import { PrivateRoutes } from "@/data/routes";
import { useSocketStore } from "@/stores/socketStore";
import { useUserStore } from "@/stores/userStore";
import { Conversation, Message } from "@/types/chat";
import { getFullName } from "@/utils/user";
import { useQueryClient } from "@tanstack/react-query";
import { Avatar } from "flowbite-react/components/Avatar";
import { Dispatch, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

type ConversationCardProps = {
  conversation: Conversation;
  newMessageInConversation: Message[] | undefined;
  setNewMessageInConversation: Dispatch<
    React.SetStateAction<Message[] | undefined>
  >;
};

export default function ConversationCard({
  newMessageInConversation,
  conversation,
  // setNewMessageInConversation,
}: ConversationCardProps) {
  const navigate = useNavigate();
  const { socket } = useSocketStore();
  const user = useUserStore((state) => state.user);
  const isGroup = conversation.isGroup;
  const member = conversation.members.find(
    (member) => member.userId !== user.id
  );

  const newMessage = newMessageInConversation?.find(
    (msg) => msg.conversationId === conversation.id
  );

  const queryClient = useQueryClient()
  const [lastOnline, setLastOnline] = useState(member?.user.lastOnline);

  useEffect(() => {
    setLastOnline(member?.user.lastOnline)
  },[conversation, member])

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
        if (member?.user.id == userId) {
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
  }, [socket, member, queryClient]);

  const status = isGroup
    ? undefined
    : lastOnline
    ? "offline"
    : "online";

  return (
    <div
      className=" flex w-full gap-x-3 bg-white p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
      onClick={() => {
        navigate(`/myspace/${PrivateRoutes.CHAT}/${conversation.id}`, {
          replace: true,
          state: conversation,
        });
        // setNewMessageInConversation(undefined);
      }}
    >
      <div className=" min-w-10 flex items-center justify-center">
        <Avatar
          rounded
          img={isGroup ? "/group-profile.jpg" :  member?.user.images.length ? member?.user.images[0]?.url : ''}
          size={"md"}
          status={status}
          statusPosition="bottom-right"
        />
      </div>
      <div className=" flex flex-col gap-y-1 truncate">
        <div className=" font-semibold flex flex-wrap gap-x-2 items-center truncate text-pretty">
          <span>
            {isGroup
              ? conversation.groupTitle
              : getFullName(
                  member?.user.person.firstName,
                  member?.user.person.middleName,
                  member?.user.person.lastName,
                  member?.user.person.secondLastName
                )}
          </span>
          {!isGroup && (
            <span className=" text-xs text-slate-400">
              {member?.user.identificationCode}
            </span>
          )}
        </div>
        <div className=" text-xs font-semibold text-slate-400 truncate pl-1">
          {newMessage &&
            (newMessage.body
              ? newMessage.sender.userId === user.id
                ? `Tú: ${newMessage.body}`
                : newMessage.body
              : "Nuevo archivo")}
        </div>
      </div>
    </div>
  );
}
