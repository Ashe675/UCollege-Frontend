import { create } from "zustand";
import { devtools } from "zustand/middleware";
import io, { Socket } from "socket.io-client";

// import { Message } from "@/types/chat";

type SocketStore = {
    socket: Socket | null;  // La instancia del socket
    isConnected: boolean;  // Indica si el socket está conectado
    // conversations: Record<string, Message[]>;  // Mensajes agrupados por conversationId
    connect: () => void;  // Función para conectar el socket
    disconnect: () => void;  // Función para desconectar el socket
    // addMessage: (conversationId: string, message: Message) => void;  // Función para agregar un mensaje
    setSocket: (socket: Socket) => void;  // Establece el socket
}

export const useSocketStore = create<SocketStore>()(devtools((set) => {
    let socket: Socket | null = null;
    const token = localStorage.getItem("AUTH_TOKEN");

    return {
        socket: socket,
        isConnected: false,
        conversations: {},
        connect: () => {
            socket = io(import.meta.env.VITE_SOCKET_API_URL, {
                auth: {
                    token: `Bearer ${token}`
                }
            });
            set(() => ({
                socket,
                isConnected : true
            }))
        },
        disconnect: () => {
            socket?.disconnect();
            set({ isConnected: false, socket: null });
        },
        setSocket: (newSocket) => {
            socket = newSocket;
            set({ socket });
        },
    };
}));