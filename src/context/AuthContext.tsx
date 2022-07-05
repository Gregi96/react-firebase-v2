import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../firebase'
import { User } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

type AuthContextInterface = {
    user: User | null,
    logOut: () => Promise<any>,
    isLoading: boolean
}

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = React.createContext<AuthContextInterface>({
    user: null,
    logOut: () => Promise.resolve(),
    isLoading: false
})

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({children} ) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            setIsLoading(false)
        })

    }, [])

    const logOut  = () => {
        const auth = getAuth();
        return signOut(auth).then(() => {
            updateDoc(doc(db, 'users', user!.uid), {
                isOnline: false
            }).then(() => {
                setUser(null)
            })
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                logOut,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}