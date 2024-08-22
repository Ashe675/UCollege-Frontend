import { useUserStore } from "@/stores/userStore";
import { Conversation, Message } from "@/types/chat";
import { formatLatinaDateTime } from "@/utils/date";
import { getFullName } from "@/utils/user";
import {
  IconArrowLeft,
  IconMessageCircleFilled,
  IconMoodSmileFilled,
  IconPaperclip,
} from "@tabler/icons-react";
import { Avatar } from "flowbite-react/components/Avatar";
import SendIcon from "@mui/icons-material/Send";
import { useLocation, useNavigate } from "react-router-dom";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PrivateRoutes } from "@/data/routes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, sendMessage } from "@/api/chat/ChatApi";
import EmojiPicker from "emoji-picker-react";
import { useDropzone } from "react-dropzone";
import SendFileModal from "./SendFileModal";
import Skeleton from "@mui/material/Skeleton";
import MessagesList from "./MessagesList";
import { useSocketStore } from "@/stores/socketStore";

export default function CurrentChat() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const conversation: Conversation = location.state;
  const [message, setMessage] = useState("");
  const [isMaxHeigth, setIsMaxHeigth] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const socket = useSocketStore((state) => state.socket);
  const [messageList, setMessageList] = useState<Message[]>();
  const messageRefEnd = useRef<HTMLDivElement | null>(null);
  const [numberOfOnlineUsers, setNumberOfOnlineUsers] = useState<number>(1);

  const member = conversation?.members.find(
    (member) => member.userId !== user.id
  );

  const [lastOnlineMember, setLastOnlineMember] = useState<string | null>(
    member?.user?.lastOnline ? member?.user?.lastOnline : ""
  );

  const showOnlineGroups = useMemo(
    () =>
      conversation?.isGroup && !!numberOfOnlineUsers && numberOfOnlineUsers >= 1
        ? `${numberOfOnlineUsers} en línea`
        : null,
    [numberOfOnlineUsers, conversation]
  );

  //   console.log(showOnlineGroups)
  //   console.log(numberOfOnlineUsers)

  useEffect(() => {
    setLastOnlineMember(
      member?.user?.lastOnline ? member?.user?.lastOnline : ""
    );
  }, [member, conversation]);

  useEffect(() => {
    if (!messageRefEnd?.current || !messageList?.length) return;
    messageRefEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [messageList, messageRefEnd]);

  useEffect(() => {
    if (conversation?.id) {
      socket?.emit("joinConversation", conversation.id);

      return () => {
        socket?.emit("leaveConversation", conversation.id);
      };
    }
  }, [conversation?.id, socket]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (newMessage: Message) => {
        setMessageList((prev) => {
          if (prev?.find((msg) => msg?.id === newMessage.id)) {
            return prev;
          } else {
            if (prev) return [...prev, newMessage];
          }
        });
      });

      socket.on("userStatusChanged", ({ userId, isOnline, lastOnline }) => {
        if (
          conversation &&
          conversation.members.some((member) => member.userId == userId)
        ) {
          setNumberOfOnlineUsers((prev) => (isOnline ? prev + 1 : prev - 1));
          setLastOnlineMember(isOnline ? undefined : lastOnline);
          queryClient.invalidateQueries({ queryKey: ["contacts"] });
          queryClient.invalidateQueries({
            queryKey: ["current", "conversation", conversation?.id],
          });
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
        }
      });
      return () => {
        socket.off("newMessage", () => {
          setMessageList(() => []);
        });
        socket.off("userStatusChanged");
      };
    }
  }, [socket, conversation, queryClient]);

  const { data, isLoading } = useQuery({
    queryKey: ["current", "conversation", conversation?.id],
    queryFn: () => getMessages({ conversationId: conversation?.id }),
    retry: 2,
    enabled: conversation?.id ? true : false,
  });

  useEffect(() => {
    setMessageList(data);
    if (data?.length) {
      const member = data.find(msg => msg.sender.userId !== user.id)
      if(member){
        setLastOnlineMember(member.sender.user.lastOnline);
      }
    }
  }, [data, user]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setPreviewFile(acceptedFiles[0]);
        setIsModalOpen(true);
      }
    },
    [setPreviewFile]
  );

  const { getRootProps, isDragActive } = useDropzone({
    maxFiles: 1,
    maxSize: 1000000000,
    accept: {
      "image/*": [], // Imágenes
      "video/*": [], // videos
      "application/pdf": [], // PDFs
      "application/msword": [], // Word
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [], // Word (docx)
      "text/csv": [], // CSV
      "application/vnd.ms-excel": [], // Excel
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [], // Excel (xlsx)
      "application/vnd.ms-powerpoint": [], // Para PPT
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [], // Para PPTX
    },
    noClick: true,
    onDrop,
  });

  const { mutate } = useMutation({
    mutationFn: sendMessage,
  });

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      if (parseInt(textareaRef.current.style.height) >= 120) {
        setIsMaxHeigth(true);
      } else {
        setIsMaxHeigth(false);
      }
    }
  }, [message]);

  const isGroup = conversation?.isGroup;
  const members = conversation?.members.filter(
    (member) => member.userId !== user.id
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onDrop(Array.from(files)); // Pasar los archivos a Dropzone
    }
  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Abrir el explorador de archivos
    }
  };

  const handleSendMessage = () => {
    if (conversation && message) {
      mutate({
        conversationId: conversation.id,
        message: message.trim(),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    if (
      socket &&
      conversation &&
      !location.pathname.includes(`myspace/chat/${conversation.id}`)
    ) {
      socket.emit("leaveConversation", conversation.id);
    }
  }, [location, conversation, socket]);

  const handleLeaveConversation = () => {
    navigate(`/myspace/${PrivateRoutes.CHAT}`);
  };

  return (
    <div
      className={` w-full text-slate-700 h-full shadow-md md:block md:relative max-md:px-3  max-md:pt-3 max-md:pb-2  rounded-md lg:col-span-2  ${
        location.state?.id
          ? "block absolute z-20 top-0 left-0"
          : "hidden relative"
      }`}
    >
      <div className=" flex flex-col  w-full h-full bg-white rounded-md relative max-h-[637px]">
        {conversation ? (
          <>
            <div className=" w-full  items-center flex shadow-md p-2  sm:px-3  gap-x-3">
              <button
                onClick={handleLeaveConversation}
                className=" rounded-full hover:bg-slate-200 cursor-pointer p-2 md:hidden"
              >
                <IconArrowLeft stroke={2} />
              </button>
              <div className=" min-w-10 flex items-center justify-center">
                <Avatar
                  rounded
                  img={
                    isGroup
                      ? "/group-profile.jpg"
                      : members[0].user.images[0]?.url
                  }
                  size={"md"}
                  status={
                    !isGroup
                      ? lastOnlineMember
                        ? "offline"
                        : "online"
                      : undefined
                  }
                  statusPosition="bottom-right"
                />
              </div>
              <div className=" flex flex-col  justify-center gap-y-1 truncate">
                <div className=" font-semibold flex   flex-wrap gap-x-2 items-center truncate text-pretty">
                  <span>
                    {isGroup
                      ? conversation.groupTitle
                      : getFullName(
                          members[0].user.person.firstName,
                          members[0].user.person.middleName,
                          members[0].user.person.lastName,
                          members[0].user.person.secondLastName
                        )}
                  </span>
                  {!isGroup && (
                    <span className=" text-xs text-slate-400">
                      {members[0].user.identificationCode}
                    </span>
                  )}
                </div>
                {!isGroup && (
                  <div className=" text-xs font-semibold text-slate-400 truncate">
                    {lastOnlineMember
                      ? `Última vez ${formatLatinaDateTime(lastOnlineMember)}`
                      : "Activo ahora"}
                  </div>
                )}
                {showOnlineGroups && (
                  <div className=" text-xs font-semibold text-slate-400 truncate">
                    {showOnlineGroups}
                  </div>
                )}
              </div>
            </div>
            <div
              {...getRootProps()}
              onClick={() => setShowEmojis(false)}
              className={`flex-1 w-full  h-full overflow-auto relative   
                    ${
                      isDragActive
                        ? " border-2 border-dashed border-blue-500 bg-blue-100"
                        : ""
                    }`}
            >
              <>
                {isModalOpen && (
                  <SendFileModal
                    setPreviewFile={setPreviewFile}
                    file={previewFile!}
                    setShow={setIsModalOpen}
                    show={isModalOpen}
                    conversationId={conversation.id}
                  />
                )}
                <div>
                  {isLoading && (
                    <div className=" h-full w-full space-y-4 px-3 py-3 flex flex-col justify-center">
                      <Skeleton
                        sx={{ height: 53 }}
                        className=" rounded-lg ml-36"
                        animation="wave"
                        variant="rectangular"
                      />
                      <Skeleton
                        sx={{ height: 53 }}
                        className=" rounded-lg mr-36"
                        animation="wave"
                        variant="rectangular"
                      />
                      <Skeleton
                        sx={{ height: 53 }}
                        className=" rounded-lg ml-36"
                        animation="wave"
                        variant="rectangular"
                      />
                      <Skeleton
                        sx={{ height: 53 }}
                        className=" rounded-lg mr-36"
                        animation="wave"
                        variant="rectangular"
                      />
                      <Skeleton
                        sx={{ height: 53 }}
                        className=" rounded-lg ml-36"
                        animation="wave"
                        variant="rectangular"
                      />
                      <Skeleton
                        sx={{ height: 53 }}
                        className=" rounded-lg mr-36"
                        animation="wave"
                        variant="rectangular"
                      />
                      <Skeleton
                        sx={{ height: 53 }}
                        className=" rounded-lg ml-36"
                        animation="wave"
                        variant="rectangular"
                      />
                    </div>
                  )}
                  {!isLoading && messageList && messageList.length ? (
                    <MessagesList
                      messages={messageList}
                      messageRefEnd={messageRefEnd}
                    />
                  ) : (
                    !isLoading && (
                      <div className=" font-semibold text-sm pt-10 h-full w-full flex justify-center items-center text-slate-400">
                        Aún no hay mensajes en este chat.
                      </div>
                    )
                  )}

                  {/* Input de archivos oculto */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    multiple
                    accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,video/*"
                    onChange={handleFileChange}
                  />
                </div>
              </>
            </div>
            <div className="  flex relative  w-full items-end justify-between p-3 py-4 gap-x-1  ">
              <EmojiPicker
                className=" bottom-16 left-3 z-20"
                style={{ position: "absolute" }}
                open={showEmojis}
                allowExpandReactions={false}
                searchDisabled={true}
                previewConfig={{ showPreview: false }}
                onEmojiClick={(e) => setMessage((prev) => prev + e.emoji)}
                height={300}
                width={300}
              />
              <button
                onClick={handleOpenFileDialog}
                className=" bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 shadow-md flex justify-center items-center"
              >
                <IconPaperclip stroke={2} />
              </button>

              <button
                onClick={() => setShowEmojis(!showEmojis)}
                className=" flex justify-center items-center p-1 text-yellow-500"
              >
                <IconMoodSmileFilled />
              </button>
              <form className=" flex-1 w-full flex gap-x-1 items-end">
                <textarea
                  id="message"
                  value={message}
                  onClick={() => setShowEmojis(false)}
                  onKeyDown={handleKeyDown}
                  ref={textareaRef}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setShowEmojis(false);
                  }}
                  rows={1}
                  placeholder="Enviar mensaje"
                  className={`  focus:outline-none font-normal  px-3 py-1 text-slate-700 bg-slate-200 rounded-[20px] w-full shadow-md border border-slate-200 resize-none max-h-[120px] ${
                    isMaxHeigth ? "overflow-y-auto " : "overflow-hidden"
                  }`}
                />

                <button
                  type="button"
                  onClick={handleSendMessage}
                  className=" px-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1 shadow-md flex justify-center items-center"
                >
                  <SendIcon sx={{ width: "20px" }} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className=" h-full flex p-5 items-center flex-col justify-center text-slate-500">
            <IconMessageCircleFilled className=" size-10" />
            <div>Seleccione un chat para comenzar.</div>
          </div>
        )}
      </div>
    </div>
  );
}
