import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'firebase'
import { FirebaseCollectionEnum, MessageResponse } from 'lib/types'
import { createCommonUid } from 'lib/utils'

type getMessagesProps = {
    firstUserUid: string,
    secondUserUid: string
}

export const useUserMessages = (onSuccess: (messages: Array<MessageResponse>) => void) => {
    const getMessages = (params: getMessagesProps) => {
        const id = createCommonUid(params.firstUserUid, params.secondUserUid)
        const messageRef = collection(db, FirebaseCollectionEnum.Messages, id, FirebaseCollectionEnum.Chat)
        const queryMessage = query(messageRef, orderBy('createdAt', 'asc'))

        onSnapshot(queryMessage, snapshot => {
            const messages = snapshot.docs.map(doc => doc.data()) as Array<MessageResponse>

            onSuccess(messages)
        })
    }

    const getGeneralMessages = () => {
        const messageRef = collection(db, 'generalMessages')
        const queryMessage = query(messageRef, orderBy('createdAt', 'asc'))

        onSnapshot(queryMessage, snapshot => {
            const messages = snapshot.docs.map(doc => doc.data()) as Array<MessageResponse>

            onSuccess(messages)
        })
    }

    return {
        getMessages,
        getGeneralMessages
    }
}
