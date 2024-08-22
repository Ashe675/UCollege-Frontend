import UsersIconChat from "./UsersIconChat";
import ErrorMessage from "../ErrorMessage";
import ContactCard from "./ContactCard";
import { IconUsersPlus } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import NewContactModal from "./NewContactModal";
import { ContactList } from "@/types/chat";
import Skeleton from "@mui/material/Skeleton";

type ContactsSectionProps = {
  data: ContactList | undefined;
  isLoading: boolean;
  error: Error | null;
};

export default function ContactsSection({
  data,
  isLoading,
  error,
}: ContactsSectionProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <NewContactModal />
      <div className=" justify-between w-full flex  text-xl px-1">
        <div className=" flex gap-x-2 text-slate-600  items-center py-4">
          <span>Contactos</span>
          <UsersIconChat />
        </div>
        <div className=" flex justify-center items-center">
          <span
            className=" p-2 bg-blue-500 cursor-pointer hover:bg-blue-700 rounded-full text-white shadow-sm"
            onClick={() => navigate(location.pathname + "?nuevoContacto=true")}
          >
            <IconUsersPlus className=" size-4" stroke={3} />
          </span>
        </div>
      </div>
      <div className=" flex flex-col gap-y-3  w-full">
        {isLoading && (
          <div className=" h-full w-full space-y-4 px-3 py-3 flex flex-col justify-center">
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
            <Skeleton
              sx={{ height: 53 }}
              className=" rounded-lg "
              animation="wave"
              variant="rectangular"
            />
          </div>
        )}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        {data && (
          <div className=" overflow-y-auto max-h-[515px] flex flex-col h-full gap-2 pr-1">
            {data.contacts.length ? (
              <div className="flex  h-full  text-slate-600  flex-col ">
                {data.contacts.map((contact) => (
                  <ContactCard
                    key={contact.contact.id}
                    contact={contact.contact}
                  />
                ))}
              </div>
            ) : (
              <div className=" p-2 text-xs text-slate-500">
                Aún no tiene contactos agregados.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
