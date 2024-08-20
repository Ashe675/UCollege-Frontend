import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Avatar } from "flowbite-react/components/Avatar";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { UserFriend } from "@/types/chat";
import { getFullName } from "../../utils/user";

type AddUserListItemProps = {
  contact: UserFriend;
  usersSelected: UserFriend[] | undefined;
  isGroup: boolean;
  setUsersSelected: React.Dispatch<
    React.SetStateAction<UserFriend[] | undefined>
  >;
};

export default function AddUserListItem({
  contact,
  usersSelected,
  setUsersSelected,
  isGroup,
}: AddUserListItemProps) {
  const isCurrentUserSelected = usersSelected?.find(
    (user) => user.id === contact.id
  );

  const handleClick = () => {
    if (!isGroup) {
      setUsersSelected([contact]);
    } else {
      setUsersSelected((prev) => {
          if (isCurrentUserSelected) {
            return prev?.filter((u) => u.id !== contact.id);
          } else {
            if(prev)
            return [...prev, contact];
          }
        
      });
    }
  };

  return (
    <ListItem
      sx={{
        borderRadius: 4,
        padding: 0,
        maxWidth: "330px",
      }}
    >
      <ListItemButton
        sx={{
          borderRadius: 4,
        }}
        selected={!!isCurrentUserSelected}
        onClick={handleClick}
      >
        <ListItemIcon>
          <Avatar rounded img={contact.images[0]?.url} />
        </ListItemIcon>
        <ListItemText sx={{ textAlign: "left" }}>
          {getFullName(
            contact.person.firstName,
            contact.person.middleName,
            contact.person.lastName,
            contact.person.secondLastName
          )}
        </ListItemText>
        <ListItemIcon sx={{ minWidth: 0, color : isCurrentUserSelected ? 'blue' : 'gray' }}>
          {isCurrentUserSelected ? (
            <CheckCircleRoundedIcon />
          ) : (
            <AddCircleOutlineIcon />
          )}
        </ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
}
