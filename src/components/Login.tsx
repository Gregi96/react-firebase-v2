import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from 'lib/hooks'

export const Login: React.FunctionComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { hasError, logIn, isLoading } = useAuth()

    return (
        <FormContainer>
            <h3>
                Create An Account
            </h3>
            <FieldContainer>
                <p>
                    E-mail
                </p>
                <input
                    value={email}
                    placeholder="enter name"
                    type="email"
                    onChange={event => setEmail(event.target.value)}
                />
            </FieldContainer>
            <FieldContainer>
                <p>
                    Password
                </p>
                <input
                    value={password}
                    placeholder="enter password"
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                />
            </FieldContainer>
            {hasError && (
                <ErrorMessage>
                    Something went wrong
                </ErrorMessage>
            )}
            <button
                onClick={() => logIn({
                    email,
                    password
                })}
                disabled={isLoading}
            >
                {isLoading ? 'Logging ...' : 'Log in'}
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
