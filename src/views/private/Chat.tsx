
import ChatTab from "../../components/chat/ChatTab";
import CurrentChat from "@/components/chat/CurrentChat";

export default function Chat() {
  // const user = useUserStore((state) => state.user);

  return (
    <div className=" h-full  w-full relative  pt-3 grid  grid-cols-1 bg-primaryBlue md:grid-cols-2 lg:grid-cols-3 px-3 pb-2 gap-x-2">
      <div className="pt-2 px-2  h-full bg-white rounded-md shadow-md">
        <ChatTab />
      </div>
    
      <CurrentChat />
    </div>
  );
}
