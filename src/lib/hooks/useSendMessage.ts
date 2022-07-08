import { useState } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from 'firebase'
import { FirebaseCollectionEnum } from 'lib/types'
import { createCommonUid } from 'lib/utils'

type SendMessageProps = {
    message: string,
    firstUserUid: string,
    secondUserUid: string
}

type SendGeneralMessage = {
    message: string,
    userUid: string,
    name: string
}

export const useSendMessage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const sendMessage = (params: SendMessageProps) => {
        setIsLoading(true)

        const id = createCommonUid(params.firstUserUid, params.secondUserUid)

        return addDoc(collection(db, FirebaseCollectionEnum.Messages, id, FirebaseCollectionEnum.Chat), {
            from: params.firstUserUid,
            to: params.secondUserUid,
            createdAt: Timestamp.fromDate(new Date()),
            message: params.message
        })
            .then(() => setIsLoading(false))
            .catch(error => {
                setHasError(true)
                throw error
            })
    }

    const sendGeneralMessage = (params: SendGeneralMessage) => addDoc(collection(db, FirebaseCollectionEnum.generalMessages), {
        userUid: params.userUid,
        createdAt: Timestamp.fromDate(new Date()),
        message: params.message,
        name: params.name
    })
        .then(() => setIsLoading(false))
        .catch(error => {
            setHasError(true)
            throw error
        })

    return {
        sendMessage,
        isLoading,
        hasError,
        sendGeneralMessage
    }
}
