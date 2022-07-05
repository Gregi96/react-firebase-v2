import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {setDoc, doc, Timestamp} from 'firebase/firestore'
import { db, auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { UserModel } from 'lib/types'

export const Register = () => {
    const navigation = useNavigate()
    const [data, setData] = useState<UserModel>({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false
    })
    const { name, email, error, loading, password } = data

    const register = () => {
        setData({
            ...data,
            error: '',
            loading: true
        })
        if (!name  || !email || !password) {
            return setData({
                ...data,
                error: 'All fields are required'
            })
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    name,
                    email,
                    creatAt: Timestamp.fromDate(new Date()),
                    isOnline: true
                }).then(() => {
                    setData({
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        loading: false
                    })
                    navigation('/')
                })
            })
            .catch((error) => {
                setData({
                    ...data,
                    error: error.message
                })
            });
    }

    return (
        <FormContainer>
            <h3>Log into your Account</h3>
            <FieldContainer>
                <p>Name</p>
                <input
                    value={name}
                    placeholder="enter name"
                    onChange={(event) => setData((prev) => ({
                        ...prev,
                        name: event.target.value
                    }))}
                />
            </FieldContainer>
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
                onClick={() => register()}
                disabled={data.loading}
            >
                {loading ? 'Registering ...' : 'Register'}
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