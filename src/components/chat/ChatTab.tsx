import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  IconMailOpenedFilled,
  IconMessageCircleFilled,
  IconUsers,
} from "@tabler/icons-react";
import RequestSection from "./RequestSection";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ContactsSection from "./ContactsSection";
import { getContacts, getConversations, getRequests } from "@/api/chat/ChatApi";
import ChatListSection from "./ChatListSection";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import { useSocketStore } from "@/stores/socketStore";
import { Conversation, Message } from "@/types/chat";

export default function ChatTab() {
  const [countFriendRequest, setCountFriendRequest] = useState(0);
  const [newMessageInConversation, setNewMessageInConversation] =
    useState<Message[]>();
  const queryClient = useQueryClient()


  const {
    data: contacts,
    isLoading: loadingContacts,
    error: errorContacts,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  const { socket } = useSocketStore();
  const [convers, setConvers] = useState<Conversation[]>();

  const {
    data: friendRequests,
    isLoading: loadingRequests,
    error: errorRequests,
  } = useQuery({
    queryKey: ["requests", "pending"],
    queryFn: getRequests,
  });

  const {
    data: conversations,
    isLoading: loadingConversations,
    error: errorConversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  useEffect(() => {
    if (conversations) {
      setConvers(conversations);
    }
  }, [conversations]);

  useEffect(() => {
    if (socket) {
      socket.on("newConversation", (data: Conversation) => {
        setConvers((prev) => {
          if (prev?.find((conv) => conv.id === data.id)) {
            return prev;
          } else {
            if (prev) {
              return [data, ...prev];
            }
          }
        });
      });

      socket.on("newMessageInConversation", (newMSG: Message) => {
        setNewMessageInConversation((prev) => {
          const filteredMsgs = prev?.filter(
            (msg) => msg.conversationId !== newMSG.conversationId
          );
          queryClient.invalidateQueries({queryKey : ['conversations']})
          if (filteredMsgs?.length) {
            return [...filteredMsgs, newMSG];
          } else {
            return [newMSG];
          }
         
        });
      });

      return () => {
        socket.off("newConversation", () => {
          setConvers(() => []);
        });

        socket.off("newMessageInConversation", () => {
          setNewMessageInConversation([]);
        });
      };
    }
  }, [socket, contacts, queryClient]);

  useEffect(() => {
    if (friendRequests?.friendRequestReceived.length !== undefined) {
      setCountFriendRequest(friendRequests?.friendRequestReceived.length);
    }
  }, [friendRequests?.friendRequestReceived.length, setCountFriendRequest]);

  return (
    <TabGroup className=" flex w-full h-full flex-col ">
      <TabList className="flex  rounded-md w-full justify-between bg-slate-300 ">
        <Tooltip title="Chats" placement="top">
          <Tab className="w-full  text-slate-400 bg-slate-300   p-2 rounded-l-md data-[hover]:text-white data-[selected]:bg-tertiary data-[hover]:bg-tertiary/60 data-[selected]:data-[hover]:bg-tertiary  data-[selected]:outline-none data-[selected]:text-white uppercase flex justify-center gap-1 text-sm items-center">
            <IconMessageCircleFilled className=" size-6" />
          </Tab>
        </Tooltip>
        <Tooltip title="Contactos" placement="top">
          <Tab className="w-full  text-slate-400 bg-slate-300   p-2 data-[hover]:text-white data-[selected]:bg-tertiary data-[hover]:bg-tertiary/60 data-[selected]:data-[hover]:bg-tertiary  data-[selected]:outline-none data-[selected]:text-white uppercase flex justify-center gap-1 text-sm items-center">
            <IconUsers stroke={3} />
          </Tab>
        </Tooltip>
        <Tooltip title="Solicitudes" placement="top">
          <Tab className="w-full  text-slate-400 bg-slate-300   p-2 rounded-r-md data-[hover]:text-white data-[selected]:bg-tertiary data-[hover]:bg-tertiary/60 data-[selected]:data-[hover]:bg-tertiary  data-[selected]:outline-none data-[selected]:text-white uppercase flex justify-center gap-1 text-sm items-center relative">
            <div className=" relative">
              <IconMailOpenedFilled />
              {!!countFriendRequest && (
                <span className=" size-4 text-center flex items-center justify-center rounded-full bg-red-500 text-white absolute text-xs -top-1 -right-3">
                  {countFriendRequest}
                </span>
              )}
            </div>
          </Tab>
        </Tooltip>
      </TabList>
      <TabPanels className={` w-full  h-full  flex flex-col pl-1`}>
        <TabPanel
          className={`data-[selected]:flex data-[selected]:flex-col data-[selected]:min-h-full`}
        >
          <ChatListSection
            setNewMessageInConversation={setNewMessageInConversation}
            data={convers}
            contacts={contacts}
            error={errorConversations}
            isLoading={loadingConversations}
            newMessageInConversation={newMessageInConversation}
          />
        </TabPanel>
        <TabPanel
          className={`data-[selected]:flex data-[selected]:flex-col data-[selected]:h-full`}
        >
          <ContactsSection
            data={contacts}
            error={errorContacts}
            isLoading={loadingContacts}
          />
        </TabPanel>
        <TabPanel
          className={`data-[selected]:flex data-[selected]:flex-col data-[selected]:h-full`}
        >
          <RequestSection
            setCountFriendRequest={setCountFriendRequest}
            data={friendRequests}
            error={errorRequests}
            isLoading={loadingRequests}
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
