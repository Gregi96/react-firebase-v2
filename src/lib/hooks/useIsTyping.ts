import { useState } from 'react'
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from 'firebase'
import { FirebaseCollectionEnum } from 'lib/types'
import { createCommonUid } from 'lib/utils'

type SetStartTypingModeProps = {
    firstUser: string,
    secondUser: string
}

export const useIsTyping = () => {
    const [receiverIsTyping, setReceiverIsTyping] = useState(false)

    const setStartTypingMode = (params: SetStartTypingModeProps) => {
        const id = createCommonUid(params.firstUser, params.secondUser)

        setDoc(doc(db, FirebaseCollectionEnum.IsTyping, id), {
            from: params.firstUser,
            to: params.secondUser,
            isTyping: true
        })
    }

    const setStopTypingMode = (params: SetStartTypingModeProps) => {
        const id = createCommonUid(params.firstUser, params.secondUser)

        updateDoc(doc(db, FirebaseCollectionEnum.IsTyping, id), {
            isTyping: false
        })
    }

    const getSecondUserTypingMode = (params: SetStartTypingModeProps) => {
        const id = createCommonUid(params.firstUser, params.secondUser)

        onSnapshot(doc(db, FirebaseCollectionEnum.IsTyping, id), doc => {
            const data = doc.data()

            if (auth.currentUser?.uid !== data?.from) {
                data?.isTyping ? setReceiverIsTyping(true) : setReceiverIsTyping(false)
            }
        })
    }

    return {
        setStartTypingMode,
        setStopTypingMode,
        receiverIsTyping,
        getSecondUserTypingMode
    }
}
