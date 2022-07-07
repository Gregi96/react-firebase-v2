import { useState } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from 'firebase'
import { FirebaseCollectionEnum } from 'lib/types'

type SendMessageProps = {
    message: string,
    firstUserUid: string,
    secondUserUid: string
}

export const useSendMessage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const sendMessage = (params: SendMessageProps) => {
        setIsLoading(true)

        const id = params.firstUserUid > params.secondUserUid ?
            `${params.firstUserUid + params.secondUserUid}` :
            `${params.secondUserUid + params.firstUserUid}`

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

    return {
        sendMessage,
        isLoading,
        hasError
    }
}
