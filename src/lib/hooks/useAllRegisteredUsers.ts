import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from 'firebase'
import { UserResponseModel } from 'lib/types'

export const useAllRegisteredUsers = () => {
    const [users, setUsers] = useState<Array<UserResponseModel>>([])

    useEffect(() => {
        if (!auth.currentUser?.uid) {
            return
        }

        const q = query(collection(db, 'users'), where('uid', 'not-in', [auth.currentUser.uid]))

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setUsers([])
            querySnapshot.forEach(doc => {
                setUsers(prev =>
                    [...prev, doc.data()] as Array<UserResponseModel>
                )
            })
        })

        return unsubscribe
    }, [auth.currentUser])

    return {
        users
    }
}
