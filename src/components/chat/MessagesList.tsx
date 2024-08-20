import { Message } from "@/types/chat";
import MessageCard from "./MessageCard";
import { groupMessagesByDate } from "@/utils/date";

type MessagesListProps = {
  messages: Message[];
  messageRefEnd: React.MutableRefObject<HTMLDivElement | null>;
};

export default function MessagesList({
  messages,
  messageRefEnd,
}: MessagesListProps) {
  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className=" p-3 w-full  flex-1 flex flex-col  space-y-4 ">
      {Object.entries(groupedMessages).map(([date, msgs]) => (
        <div key={date}>
          <div className="text-center text-slate-500 my-2">{date}</div>
          <div className=" space-y-4">
            {msgs.map((msg) => (
              <MessageCard
                msg={msg}
                key={msg.id}
                
              />
            ))}
          </div>
        </div>
      ))}
      <div ref={messageRefEnd} />
    </div>
  );
}
