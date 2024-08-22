import api from "@/lib/axios";
import { FriendRequestDataSchema, ContactListSchema, ConversationsSchema, MessagesArraySchema } from "@/types/chat";
import { isAxiosError } from "axios";
import { UserFriend, TypeConversation } from '../../types/chat/index';


export async function getRequests() {
    try {
        const url = `/chat/request`
        const { data } = await api(url)
        const result = FriendRequestDataSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function getContacts() {
    try {
        const url = `/chat/contacts`
        const { data } = await api(url)
        const result = ContactListSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function acceptFriendRequest(requestId: number) {
    try {
        const url = `/chat/request/accept/${requestId}`
        const { data } = await api.post(url)

        return data.message

    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function declineFriendRequest(requestId: number) {
    try {
        const url = `/chat/request/decline/${requestId}`
        const { data } = await api.post(url)

        return data.message

    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function sendRequestByIdentificationCodeContact(identificationCode: string) {
    try {
        const url = `/chat/request`
        const payload = {
            receiverIdentificationCode
                : identificationCode
        }

        const { data } = await api.post(url, payload)
        if (data?.message) {
            return data.message
        }
        return data

    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function createConversation({ members, type, groupTitle, isGroup }: { members: UserFriend[], type: TypeConversation, groupTitle?: string, isGroup?: boolean }) {
    try {
        const url = `/chat/new`
        const payload = {
            members,
            type,
            groupTitle,
            isGroup
        }
        const { data } = await api.post(url, payload)
        return data.message

    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function getConversations() {
    try {
        const url = `/chat/`
        const { data } = await api(url)
        const result = ConversationsSchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function sendMessage({ conversationId, message }: { conversationId: string, message: string }) {
    try {
        const url = `/chat/${conversationId}/messages`

        const formData = new FormData()

        formData.append('message', message)

        const { data } = await api.post(url, formData)

        return data.message

    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function sendMessageFile({ conversationId, file }: { conversationId: string, file: File }) {
    try {
        const url = `/chat/${conversationId}/messages?file=true`
        const formData = new FormData()

        formData.append('file', file)
        formData.append('fileName', file.name)
        
        
        const { data } = await api.post(url, formData)

        return data.message

    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}

export async function getMessages({ conversationId }: { conversationId: string }) {
    try {
        const url = `/chat/${conversationId}/messages`
        const { data } = await api(url)
        const result = MessagesArraySchema.safeParse(data)
        if (result.success) {
            return result.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response?.data.error) {
            throw new Error(error.response.data.error)
        }
        if (isAxiosError(error) && error.response?.data.errors) {
            throw new Error(error.response.data.errors[0].msg)
        }
        throw new Error("El servidor no Responde")
    }
}
