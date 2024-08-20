import { FriendRequest } from "@/types/chat";
import { formatLatinaDateTime } from "@/utils/date";
import { getFullName } from "@/utils/user";
import { Avatar } from "flowbite-react/components/Avatar";

export default function RequestSendCard({ req }: { req: FriendRequest }) {
  return (
    <div className=" flex w-full gap-x-3 bg-white p-2 rounded-lg">
      <div className=" min-w-10 flex items-center justify-center">
        <Avatar rounded img={req.receiver.images[0]?.url} size={"md"} />
      </div>
      <div className=" flex flex-col gap-y-2">
        <div className=" font-semibold flex flex-wrap gap-x-2 items-center text-pretty">
          <span>
            {getFullName(
              req.receiver.person.firstName,
              req.receiver.person.middleName,
              req.receiver.person.lastName,
              req.receiver.person.secondLastName
            )}
          </span>
          <span className=" text-xs text-slate-400">
            {req.receiver.identificationCode}
          </span>
        </div>
        <div className=" text-xs font-semibold text-slate-500 text-pretty">
          Enviada: {formatLatinaDateTime(req.createdAt)}
        </div>
      </div>
    </div>
  );
}
