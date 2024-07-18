import { Avatar } from "flowbite-react";

export function UserAvatar() {
  return (
    <div className="flex flex-wrap gap-2">
      <Avatar img="/profile/photo.webp" rounded  />
    </div>
  );
}
