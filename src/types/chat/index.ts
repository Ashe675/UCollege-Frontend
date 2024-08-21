import { z } from "zod";

const PersonSchema = z.object({
    firstName: z.string(),
    middleName: z.string().nullable(),
    lastName: z.string(),
    secondLastName: z.string().nullable(),
    phoneNumber: z.string().optional(),
    email: z.string().optional(),
});

const ImageSchema = z.object({
    url: z.string().url(),
});

const UserSchema = z.object({
    id: z.number().optional(),
    identificationCode: z.string(),
    institutionalEmail: z.string(),
    images: z.array(ImageSchema),
    person: PersonSchema,
    isOnline: z.boolean().optional(),
    lastOnline: z.string().nullable().optional()
});

export type UserFriend = z.infer<typeof UserSchema>

const ContactSchema = z.object({
    contact: UserSchema,
});

export const ContactListSchema = z.object({
    contacts: z.array(ContactSchema),
});


export type ContactList = z.infer<typeof ContactListSchema>

const FriendRequestSchema = z.object({
    id: z.number(),
    senderId: z.number(),
    receiverId: z.number(),
    status: z.enum(["PENDING", "ACCEPTED", "DECLINED"]), // Puedes ajustar los valores según los estados posibles
    createdAt: z.string(),
    receiver: UserSchema,
    sender: UserSchema,
});

export type FriendRequest = z.infer<typeof FriendRequestSchema>

export const FriendRequestDataSchema = z.object({
    friendRequestSent: z.array(FriendRequestSchema),
    friendRequestReceived: z.array(FriendRequestSchema),
});

export type FriendRequestData = z.infer<typeof FriendRequestDataSchema>;


export type AddContactForm = {
    identificationCode: string
}

export enum TypeConversation {
    DIRECT_MESSAGE = "DIRECT_MESSAGE",
    GROUP = "GROUP"
}




const MemberSchema = z.object({
    id: z.string().uuid(),
    joinedAt: z.string(),
    role: z.enum(["ADMIN", "MEMBER"]),
    userId: z.number(),
    conversationId: z.string().uuid(),
    user: UserSchema,
});

const ConversationSchema = z.object({
    id: z.string().uuid(),
    isGroup: z.boolean(),
    groupTitle: z.string().nullable(),
    type: z.enum(["GROUP", "DIRECT_MESSAGE"]),
    createdAt: z.string(),
    updatedAt: z.string(),
    members: z.array(MemberSchema),
});

export type Conversation = z.infer<typeof ConversationSchema>

export const ConversationsSchema = z.array(ConversationSchema);

//* MESSAGES
const UserMessageSchema = z.object({
    id: z.number(),
    images: z.array(ImageSchema),
    identificationCode: z.string(),
    institutionalEmail: z.string(),
    person: z.object({
        firstName: z.string(),
        lastName: z.string()
    }),
    isOnline: z.boolean(),
    lastOnline: z.string().nullable()
});

const ConversationMessageSchema = z.object({
    id: z.string().uuid(),
    isGroup: z.boolean(),
    groupTitle: z.string().nullable(),
    type: z.enum(["GROUP", "DIRECT_MESSAGE"]),
    createdAt: z.string(),
    updatedAt: z.string(),
});


const SenderSchema = z.object({
    id: z.string().uuid(),
    joinedAt: z.string(),
    role: z.enum(['MEMBER', 'ADMIN']), // Ajusta según los roles posibles
    userId: z.number(),
    conversationId: z.string().uuid(),
    user: UserMessageSchema,
});

const MessageSchema = z.object({
    id: z.string().uuid(),
    body: z.string().nullable(),
    conversationId: z.string().uuid(),
    senderId: z.string().uuid(),
    createdAt: z.string(),
    updatedAt: z.string(),
    fileId: z.string().nullable(),
    fileUrl: z.string().nullable(),
    fileName: z.string().nullable(),
    fileType: z.enum(['DOCUMENT', 'VIDEO', 'PHOTO']).nullable(),
    conversation: ConversationMessageSchema,

    sender: SenderSchema,
});

export type Message = z.infer<typeof MessageSchema>

export const MessagesArraySchema = z.array(MessageSchema);