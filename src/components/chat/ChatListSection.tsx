import { ContactList, Conversation, Message } from "@/types/chat";
import { IconMessageCircleFilled, IconSearch } from "@tabler/icons-react";
import NewChatDropMenu from "./NewChatDropMenu";
import ErrorMessage from "../ErrorMessage";
import StartConversationModal from "./StartConversationModal";
import ConversationCard from "./ConversationCard";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { getFullName } from "@/utils/user";
import Skeleton from "@mui/material/Skeleton";
import { useSocketStore } from "@/stores/socketStore";

type ChatListSectionProps = {
  data: Conversation[] | undefined;
  contacts: ContactList | undefined;
  isLoading: boolean;
  error: Error | null;
  setNewMessageInConversation: Dispatch<
    React.SetStateAction<Message[] | undefined>
  >;
  newMessageInConversation: Message[] | undefined;
};

export default function ChatListSection({
  data,
  isLoading,
  error,
  contacts,
  newMessageInConversation,
  setNewMessageInConversation,
}: ChatListSectionProps) {
  const [query, setQuery] = useState("");

  const [chats, setChats] = useState<Conversation[] | undefined>(data);
  const { socket } = useSocketStore();

  const conversationsFiltered = useMemo(() => {
    return query === ""
      ? chats
      : chats?.filter((conv) => {
          return (
            conv.members.some((member) =>
              getFullName(
                member.user.person.firstName,
                member.user.person.middleName,
                member.user.person.lastName,
                member.user.person.secondLastName
              )
                .toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
            ) ||
            conv.groupTitle
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
        });
  }, [chats, query]);

  useEffect(() => {
    if (data?.length) {
      setChats(data);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessageInConversation", (newMSG: Message) => {
        const conversationId = newMSG?.conversationId;
        const newConversation = chats?.find(
          (conver) => conver.id === conversationId
        );

        if (newConversation && chats) {
          const updatedChats = chats.filter(
            (chat) => chat.id !== conversationId
          );
          setChats([newConversation, ...updatedChats]);
        }
      });
      return () => {
        socket.off("newMessageInConversation", () => {
          setNewMessageInConversation([]);
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, newMessageInConversation]);

 

  return (
    <>
      <StartConversationModal contacts={contacts} />
      <div className=" justify-between w-full flex  text-xl px-1">
        <div className=" flex gap-x-2 text-slate-600  items-center py-4">
          <span>Chats</span>
          <IconMessageCircleFilled className=" size-6" />
        </div>
        <div className=" flex justify-center items-center ">
          <NewChatDropMenu />
        </div>
      </div>
      <div className=" px-2  py-1 mb-4 flex   items-center border-1 border border-slate-300 w-full rounded-full text-slate-500">
        <IconSearch stroke={2} className="  size-5" />
        <input
          onChange={(e) => setQuery(e.target.value)}
          id="search"
          type="text"
          placeholder="Buscar chat"
          className=" pl-1 font-normal text-sm focus:outline-none w-full"
          aria-label="Buscar chat"
        />
      </div>
      <div className=" flex flex-col gap-y-3  w-full">
        {isLoading && (
          <div className=" h-full w-full space-y-4 px-3 py-3 flex flex-col justify-center">
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
          </div>
        )}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <div className=" overflow-y-auto overflow-x-hidden max-h-[465px] flex flex-col h-full gap-2 pr-1">
          {data?.length ? (
            conversationsFiltered?.length ? (
              <div className="flex  h-full  text-slate-600  flex-col ">
                {conversationsFiltered.map((conversation) => (
                  <ConversationCard
                    setNewMessageInConversation={setNewMessageInConversation}
                    newMessageInConversation={newMessageInConversation}
                    key={conversation.id}
                    conversation={conversation}
                  />
                ))}
              </div>
            ) : (
              <div className=" p-2 text-xs text-slate-500">
                Chats no encontrados.
              </div>
            )
          ) : (
            !isLoading && (
              <div className=" p-2 text-xs text-slate-500">
                Aún no tienes chats.
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
