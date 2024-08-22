import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import { Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import AddUserListItem from "./AddUserListItem";
import ButtonCustomWithClick from "../ButtonCustomWithClick";
import { ContactList, TypeConversation, UserFriend } from "@/types/chat";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { getFullName } from "@/utils/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConversation } from "@/api/chat/ChatApi";
import { toast } from "react-toastify";
import ErrorMessage from "../ErrorMessage";

type StartConversationModalPorps = {
  contacts: ContactList | undefined;
};

export default function StartConversationModal({
  contacts,
}: StartConversationModalPorps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [usersSelected, setUsersSelected] = useState<UserFriend[]>();

  const queryParams = new URLSearchParams(location.search);
  const newChat = queryParams.get("nuevoChat");
  const group = queryParams.get("grupal");
  const open = newChat ? true : false;
  const isGroup = group ? true : false;
  const toastId = useRef<null | number | string>(null);
  const [error, setError] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createConversation,
    onSuccess: (data) => {
      toast.update(toastId.current!, {
        render: data,
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      queryClient.invalidateQueries({ queryKey: ["requests", "pending"] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setError("");
      setGroupTitle("");
      setUsersSelected([]);
      setQuery("");
    },
    onError: (error) => {
      toast.update(toastId.current!, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        theme: "colored",
      });
      setError("");
      setGroupTitle("");
      setUsersSelected([]);
      setQuery("");
    },
  });

  const handleCancel = () => {
    navigate(location.pathname, { replace: true });
    setUsersSelected([]);
    setError("");
    setGroupTitle("");
    setQuery("");
  };

  useEffect(() => {
    if (usersSelected?.length) {
      setError("");
    } else {
      setError("Se debe de agregar al menos a un usuario.");
    }
  }, [usersSelected?.length]);

  const handleOk = () => {
    if (usersSelected?.length) {
      setError("");

      const regex = /^[a-zA-Z0-9 _-]{3,50}$/;
      if (isGroup && !regex.test(groupTitle)) {
        return setError("Título Inválido");
      }

      toastId.current = toast.loading(
        isGroup ? "Creando Grupo..." : "Creando Chat..."
      );
      if (isGroup) {
        mutate({
          members: usersSelected,
          type: TypeConversation.GROUP,
          groupTitle: groupTitle.trim(),
          isGroup,
        });
      } else {
        mutate({
          members: usersSelected,
          type: TypeConversation.DIRECT_MESSAGE,
        });
      }
      setQuery("");
      setUsersSelected([]);
      navigate(location.pathname, { replace: true });
     
    } else {
      setError("Se debe de agregar al menos a un usuario.");
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupTitle(e.target.value);
    const regex = /^[a-zA-Z0-9 _-]{3,50}$/;
    if (!regex.test(e.target.value)) {
      setError("Título Inválido");
    } else {
      setError("");
    }
  };

  const contactsFiltered = useMemo(() => {
    return query === ""
      ? contacts?.contacts
      : contacts?.contacts.filter((contact) => {
          return (
            getFullName(
              contact.contact.person.firstName,
              contact.contact.person.middleName,
              contact.contact.person.lastName,
              contact.contact.person.secondLastName
            )
              .toLocaleLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) ||
            contact.contact.identificationCode.includes(query)
          );
        });
  }, [contacts, query]);

  return (
    <Dialog open={open} sx={{ maxWidth: "450px", margin: "auto" }}>
      <DialogTitle
        className=" text-slate-700"
        sx={{ paddingTop: "27px", paddingBottom: "5px" }}
      >
        {isGroup
          ? "Seleccione a los miembros para del grupo."
          : "Seleccione al contacto para comenzar una conversación."}
      </DialogTitle>
      <DialogContent sx={{ padding: "1px" }}>
        <Grid
          container
          flexDirection={"column"}
          gap={1}
          sx={{ maxWidth: "450px" }}
        >
          {error && (
            <div className=" px-3">
              <ErrorMessage className=" px-2 text-sm py-1 mb-1 rounded-full w-full mt-0">
                {error}
              </ErrorMessage>
            </div>
          )}
          {isGroup && (
            <>
              <div className=" px-6 pt-0 flex flex-col justify-center items-center ">
                <label
                  htmlFor="groupTitle "
                  className="w-full text-sm text-slate-600 font-semibold"
                >
                  Título del grupo*
                </label>
                <input
                  id="groupTitle"
                  value={groupTitle}
                  onChange={handleTitleChange}
                  type="text"
                  placeholder="Escriba un título para el grupo."
                  className=" p-1 px-3  border border-1  border-slate-400   w-full mx-auto rounded-full font-normal text-sm"
                />
              </div>
            </>
          )}
          <div className=" px-6 pt-0 pb-0 flex flex-col justify-center items-center">
            <label
              htmlFor="search "
              className="w-full text-sm  max-w-[330px] text-slate-600 "
            >
              Buscar Contacto
            </label>
            <input
              onChange={(e) => setQuery(e.target.value)}
              id="search"
              type="text"
              placeholder="Busque por nombre o número de cuenta."
              className=" p-1 px-3 border border-1  border-slate-400 max-w-[330px] w-full mx-auto rounded-full font-normal text-sm"
            />
          </div>

          <Grid
            item
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            maxHeight={"300px"}
            sx={{ overflowY: "scroll" }}
            gap={1}
          >
            {contactsFiltered ? (
              contactsFiltered.length ? (
                contactsFiltered.map((contact) => (
                  <AddUserListItem
                    usersSelected={usersSelected}
                    setUsersSelected={setUsersSelected}
                    key={contact.contact.id}
                    contact={contact.contact}
                    isGroup={isGroup}
                  />
                ))
              ) : (
                <div className=" text-slate-500 text-center text-sm">
                  No se encontraron resultados.
                </div>
              )
            ) : (
              <div className=" text-slate-500 text-center text-sm">
                Aún no tienes agregados contactos.
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: "10px" }}>
        <ButtonCustomWithClick
          onClick={handleCancel}
          className=" bg-red-500 text-white rounded-md p-2 hover:bg-red-600"
        >
          Cancelar
        </ButtonCustomWithClick>
        <ButtonCustomWithClick
          onClick={handleOk}
          className=" bg-green-500 text-white rounded-md p-2 hover:bg-green-600"
        >
          Aceptar
        </ButtonCustomWithClick>
      </DialogActions>
    </Dialog>
  );
}
