import { Timestamp } from 'firebase/firestore'

export type UserModel = {
    name: string
    email: string
    password: string,
    error: string,
    loading: boolean
}

export type UserResponseModel = {
    uid: string,
    name: string,
    email: string,
    createdAt: Timestamp
    isOnline: true
}