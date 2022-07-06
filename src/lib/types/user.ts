import { Timestamp } from 'firebase/firestore'
import { SetState } from './react'

export type UserModel = {
    name: string,
    email: string,
    password: string,
    error: string,
    loading: boolean
}

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
    createdAt: Timestamp
}
