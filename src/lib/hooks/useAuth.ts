import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import { auth, db } from 'firebase'
import { FirebaseCollectionEnum } from 'lib/types'

type SignInProps = {
    name: string,
    email: string,
    password: string
}

type LogInParams = {
    email: string,
    password: string
}

export const useAuth = () => {
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)

    const signUp = (params: SignInProps) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, params.email, params.password)
            .then(userCredential => {
                const user = userCredential.user

                setDoc(doc(db, FirebaseCollectionEnum.User, user.uid), {
                    uid: user.uid,
                    name: params.name,
                    email: params.email,
                    creatAt: Timestamp.fromDate(new Date()),
                    isOnline: true
                })
                    .then(() => {
                        setIsLoading(false)
                        navigation('/')
                    })
                    .catch(() => setHasError(true))
            })
            .catch(error => {
                setIsLoading(false)
                setHasError(true)
            })
    }

    const logIn = (params: LogInParams) => {
        setIsLoading(true)
        signInWithEmailAndPassword(auth, params.email, params.password)
            .then(userCredential => {
                const user = userCredential.user

                updateDoc(doc(db, FirebaseCollectionEnum.User, user.uid), {
                    isOnline: true
                })
                    .then(() => navigation('/'))
                    .catch(() => setHasError(true))
            })
            .catch(error => {
                setIsLoading(false)
                setHasError(true)
            })
    }

    const logOut = () => {
        if (!auth.currentUser?.uid) {
            return
        }

        updateDoc(doc(db, FirebaseCollectionEnum.User, auth.currentUser!.uid), {
            isOnline: false
        })
            .then()
            .catch(() => console.log('error'))

        signOut(auth)
            .then(() => navigation('/login'))
            .catch(() => setHasError(true))
    }

    return {
        signUp,
        isLoading,
        hasError,
        logIn,
        logOut
    }
}

