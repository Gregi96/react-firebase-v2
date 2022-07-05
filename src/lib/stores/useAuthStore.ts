import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'

type useAuthStoreResponse = {
    user: User | null,
    isLoading: boolean,
    logOut(): Promise<any>
}

export const useAuthStore = (): useAuthStoreResponse => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, user => {
            setUser(user)
            setIsLoading(false)
        })
    }, [])

    const logOut  = () => {
        const auth = getAuth()

        return signOut(auth).then(() => {

            if (user?.uid) {
                updateDoc(doc(db, 'users', user.uid), {
                    isOnline: false
                }).then(() => {
                    setUser(null)
                })
            }
        }).catch(error => {
            // An error happened.
        })
    }

    return { user, logOut, isLoading }
}
