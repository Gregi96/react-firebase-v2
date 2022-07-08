import { Timestamp } from 'firebase/firestore'

export type UserResponseModel = {
    uid: string,
    name: string,
    email: string,
    createdAt: Timestamp,
    isOnline: true
}

export type MessageResponse = {
    from: string,
    to: string,
    message: string,
    createdAt: Timestamp,
    name?: string
}
