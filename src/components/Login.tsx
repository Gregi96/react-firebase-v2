import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from 'lib/hooks'
import { FieldContainer, FormContainer, SubmitButton, ErrorMessage } from 'lib/styles'

export const Login: React.FunctionComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { hasError, logIn, isLoading } = useAuth()

    return (
        <FormContainer>
            <Heading>
                Log into your Account
            </Heading>
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
            <SubmitButton
                onClick={() => logIn({
                    email,
                    password
                })}
                disabled={isLoading}
            >
                {isLoading ? 'Logging ...' : 'Log in'}
            </SubmitButton>
        </FormContainer>
    )
}

const Heading = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`
