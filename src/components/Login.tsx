import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from "firebase/firestore";
import styled from 'styled-components'

type LoginFields = {
    email: string,
    password: string,
    error: string,
    loading: boolean
}

export const Login = () => {
    const navigation = useNavigate()
    const [data, setData] = useState<LoginFields>({
        email: '',
        password: '',
        error: '',
        loading: false
    })
    const { email, error, loading, password } = data
    const logIn = () => {
        setData({...data, error: '', loading: true})
        if (!email || !password) {
            return setData({...data, error: 'All fields are required'})
        }
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateDoc(doc(db, 'users', user.uid), {
                    isOnline: true
                }).then(() => {
                    setData({
                        email: '',
                        password: '',
                        error: '',
                        loading: false
                    })
                    navigation('/')
                })
            })
            .catch((error) => {
                const errorMessage = error.message;
                setData({...data, error: errorMessage})
            });
    }

    return (
        <FormContainer>
            <h3>Create An Account</h3>
            <FieldContainer>
                <p>E-mail</p>
                <input
                    value={email}
                    placeholder="enter name"
                    type='email'
                    onChange={(event) => setData((prev) => ({
                        ...prev,
                        email: event.target.value
                    }))}
                />
            </FieldContainer>
            <FieldContainer>
                <p>Password</p>
                <input
                    value={password}
                    placeholder="enter password"
                    type='password'
                    onChange={(event) => setData((prev) => ({
                        ...prev,
                        password: event.target.value
                    }))}
                />
            </FieldContainer>
            {error.length > 0 && (
                <ErrorMessage>{error}</ErrorMessage>
            )}
            <button
                onClick={() => logIn()}
                disabled={data.loading}
            >
                {loading ? 'Logging ...' : 'Log in'}
            </button>
        </FormContainer>
    )
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`

const FieldContainer = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  
    p {
      margin-bottom: 5px;
    } 
`

const ErrorMessage = styled.p`
    color: red;
    margin-bottom: 10px;
`