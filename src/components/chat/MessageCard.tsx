import { useUserStore } from "@/stores/userStore";
import { Message } from "@/types/chat";
import { formatLatinaHour } from "@/utils/date";
import { getFullName } from "@/utils/user";
import {
  IconChecks,
  IconDownload,
  IconFileDownload,
} from "@tabler/icons-react";
import { Avatar } from "flowbite-react";
import { useMemo, useState } from "react";
import ModalCustom from "../ModalCustom";

type MessageCardProps = {
  msg: Message;
};

export default function MessageCard({ msg }: MessageCardProps) {
  const user = useUserStore((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
      {isModalOpen && isImage && msg.fileUrl && (
        <ModalCustom show={isModalOpen} setShow={setIsModalOpen}>
          <div>
            <img
              src={msg.fileUrl}
              alt={msg?.fileName ? msg.fileName : ""}
              className="max-h-[600px] "
            />
            <a
              href={downloadUrl}
              download
              className=" p-2 w-full bg-green-500 text-white font-bold flex gap-2 items-center justify-center rounded-md my-2"
            >
              <IconDownload stroke={2} />
              Download
            </a>
          </div>
        </ModalCustom>
      )}
      {!isTheSameUser && (
        <Avatar img={avatar} rounded size={"sm"} className=" mb-2" />
      )}
      <div className="  flex flex-col ">
        {isImage && msg.fileUrl ? (
          <img
            src={msg.fileUrl}
            onClick={toggleModal}
            className=" max-h-40 rounded-xl shadow-md md:max-h-52 cursor-pointer"
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
              isTheSameUser ? "bg-sky-500" : msg.sender.role === 'ADMIN' ? "bg-rose-500" : "bg-indigo-500"
            } shadow-md  px-3 py-1 text-white rounded-full text-center`}
          >
            {msg.body}
          </div>
        )}

        <span
          className={` text-[10px] font-semibold w-full flex gap-x-1   ${
            isTheSameUser ? "text-right justify-end" : "text-left justify-start"
          } text-slate-500`}
        >
          {formatLatinaHour(msg.createdAt)}{" "}
          <span>
            {msg.conversation.isGroup &&
              getFullName(msg.sender.user?.person?.firstName)}
          </span>
          {isTheSameUser && <IconChecks stroke={1} size={16} />}
        </span>
      </div>
      {isTheSameUser && (
        <Avatar img={avatar} rounded size={"sm"} className=" mb-2" />
      )}
    </div>
  );
}
