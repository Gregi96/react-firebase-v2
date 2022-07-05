import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { UserResponseModel } from '../types'

export const useAllRegisteredUsers = () => {
    const [users, setUsers] = useState<Array<UserResponseModel>>()

    useEffect(() => {
        const q = query(collection(db,'users'), where("uid", 'not-in', [auth.currentUser!.uid]))

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users: Array<UserResponseModel> = []
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as UserResponseModel)
            })
            setUsers(users)
        })
        return unsubscribe
    }, [])

    return ({
        users
    })
}