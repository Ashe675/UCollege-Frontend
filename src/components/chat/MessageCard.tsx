import { useUserStore } from "@/stores/userStore";
import { Message } from "@/types/chat";
import { formatLatinaHour } from "@/utils/date";
import { getFullName } from "@/utils/user";
import { IconChecks, IconFileDownload } from "@tabler/icons-react";
import { Avatar } from "flowbite-react";
import { useMemo } from "react";

type MessageCardProps = {
  msg: Message;
};

export default function MessageCard({ msg }: MessageCardProps) {
  const user = useUserStore((state) => state.user);
  const isTheSameUser = useMemo(
    () => msg.sender.userId === user.id,
    [msg.sender.userId, user.id]
  );
  const isImage = useMemo(() => msg.fileType === "PHOTO", [msg]);
  const isVideo = useMemo(() => msg.fileType === "VIDEO", [msg]);
  const isFile = useMemo(() => msg.fileType === "DOCUMENT", [msg]);
  const downloadUrl = msg.fileUrl?.replace(
    "/upload/",
    "/upload/fl_attachment/"
  );
  const avatar = useMemo(() => msg.sender?.user?.images[0]?.url, [msg]);

  return (
    <div
      className={` w-full flex items-end gap-x-1 ${
        isTheSameUser
          ? " justify-end pl-8 lg:pl-36"
          : " pr-8 lg:pr-36 justify-start"
      } `}
    >
      {!isTheSameUser && (
        <Avatar img={avatar} rounded size={"sm"} className=" mb-2" />
      )}
      <div className="  flex flex-col ">
        {isImage && msg.fileUrl ? (
          <img
            src={msg.fileUrl}
            className=" max-h-40 rounded-xl shadow-md md:max-h-52"
          />
        ) : isFile ? (
          <a href={downloadUrl!} download>
            <div className=" group max-h-40 transition-all hover:bg-slate-200 rounded-2xl shadow-md md:max-h-52 bg-slate-300 flex p-3 gap-x-2 items-center">
              <span className=" group-hover:scale-105 group-hover:text-slate-500 rounded-full bg-slate-50 text-slate-500 p-2 ">
                <IconFileDownload stroke={2} />
              </span>
              <div className=" text-sm font-semibold text-slate-700 text-pretty">
                {msg.fileName}
              </div>
            </div>
          </a>
        ) : isVideo ? (
          <video
            src={msg.fileUrl!}
            controls
            className=" rounded-lg max-h-40 md:max-h-52"
          ></video>
        ) : (
          <div
            className={`  ${
              isTheSameUser ? "bg-sky-500" : "bg-indigo-500"
            } shadow-md  px-3 py-1 text-white rounded-xl text-center`}
          >
            {msg.body}
          </div>
        )}

        <span
          className={` text-[10px] font-semibold w-full flex gap-x-1   ${
            isTheSameUser ? "text-right justify-end" : "text-left justify-start"
          } text-slate-500`}
        >
         
          {formatLatinaHour(msg.createdAt)} <span>{msg.conversation.isGroup && getFullName(msg.sender.user.person.firstName)}</span> 
          {isTheSameUser && <IconChecks stroke={1} size={16} />}
        </span>
      </div>
      {isTheSameUser && (
        <Avatar img={avatar} rounded size={"sm"} className=" mb-2" />
      )}
    </div>
  );
}
