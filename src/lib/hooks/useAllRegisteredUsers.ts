import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from 'firebase'
import { UserResponseModel, FirebaseCollectionEnum } from 'lib/types'

export const useAllRegisteredUsers = () => {
    const [users, setUsers] = useState<Array<UserResponseModel>>([])

    useEffect(() => {
        if (!auth.currentUser?.uid) {
            return
        }

        const queryUsers = query(collection(db, FirebaseCollectionEnum.User), where('uid', 'not-in', [auth.currentUser.uid]))

        const unsubscribe = onSnapshot(queryUsers, querySnapshot => {
            const users = querySnapshot.docs.map(doc => doc.data()) as Array<UserResponseModel>

            setUsers(users)
        })

        return unsubscribe
    }, [auth.currentUser])

    return {
        users
    }
}
