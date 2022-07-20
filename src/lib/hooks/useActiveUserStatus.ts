import { useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from 'firebase'
import { FirebaseCollectionEnum } from 'lib/types'

export const useActiveUserStatus = () => {
    const updateUserActivity = (uid: string, isOnline: boolean) => updateDoc(doc(db, FirebaseCollectionEnum.User, uid), {
        isOnline
    })
        .catch(() => console.warn('Something went wrong with change user activity'))

    const changeVisibility = () => {
        if (auth.currentUser?.uid) {
            return updateUserActivity(auth.currentUser.uid, document.visibilityState === 'visible')
        }
    }

    useEffect(() => {
        document.addEventListener('visibilitychange', changeVisibility)

        return () => document.removeEventListener('visibilitychange', changeVisibility)
    }, [auth.currentUser])

    // fix bug when page reload
    useEffect(() => {
        if (auth.currentUser?.uid) {
            updateUserActivity(auth.currentUser.uid, true)
        }
    }, [auth.currentUser])
}
