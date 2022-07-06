import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from 'firebase'
import { FirebaseCollectionEnum, MessageResponse } from 'lib/types'

type useUserMessagesProps = {
    firstUserUid: string,
    secondUserUid: string
}

export const useUserMessages = (onSuccess: (messages: Array<MessageResponse>) => void) => {

    const getMessages = (params: useUserMessagesProps) => {
        const id = params.firstUserUid > params.secondUserUid ?
            `${params.firstUserUid + params.secondUserUid}` :
            `${params.secondUserUid + params.firstUserUid}`
        const messageRef = collection(db, FirebaseCollectionEnum.Messages, id, FirebaseCollectionEnum.Chat)
        const q = query(messageRef, orderBy('createdAt', 'asc'))

        onSnapshot(q, snapshot => {
            const messages = snapshot.docs.map(doc => doc.data()) as Array<MessageResponse>

            onSuccess(messages)
        })
    }

    return {
        getMessages
    }
}
