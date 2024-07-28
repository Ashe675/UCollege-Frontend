import { useUserStore } from "@/stores/userStore";
import { Avatar } from "flowbite-react";

export function UserAvatar() {
  const user = useUserStore(state => state.user)

  return (
    <div className="flex flex-wrap gap-2 min-w-10">
      <Avatar img={user.avatar? user.avatar : ''} rounded  />
    </div>
  );
}
