import { useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth } from 'firebase'
import { FirebaseCollectionEnum } from 'lib/types'

export const useActiveUserStatus = () => {
    useEffect(() => {
        document.addEventListener('visibilitychange', event => {
            if (document.visibilityState === 'visible' && auth.currentUser?.uid) {
                return updateDoc(doc(db, FirebaseCollectionEnum.User, auth.currentUser.uid), {
                    isOnline: true
                })
                    .then()
                    .catch(() => console.warn('Something went wrong with change user activity'))
            }

            if (auth.currentUser?.uid) {
                updateDoc(doc(db, FirebaseCollectionEnum.User, auth.currentUser!.uid), {
                    isOnline: false
                })
                    .then()
                    .catch(() => console.warn('Something went wrong with change user activity'))
            }
        })
    }, [])
}
