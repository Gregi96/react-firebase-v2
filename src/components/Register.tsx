import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from 'lib/hooks'
import { FieldContainer, FormContainer, SubmitButton, ErrorMessage } from 'lib/styles'

export const Register: React.FunctionComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const { signUp, isLoading, hasError } = useAuth()

    return (
        <FormContainer>
            <Heading>
                Create An Account
            </Heading>
            <FieldContainer>
                <p>
                    Name
                </p>
                <input
                    value={name}
                    placeholder="enter name"
                    onChange={event => setName(event.target.value)}
                />
                {nameError && (
                    <ErrorMessage>
                        {nameError}
                    </ErrorMessage>
                )}
            </FieldContainer>
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
                onClick={() => {
                    if (name.length < 5) {
                        return setNameError(`Name can't be smaller then 5 characters`)
                    }

                    setNameError('')
                    signUp({
                        name,
                        email,
                        password
                    })
                }}
                disabled={isLoading}
            >
                {isLoading ? 'Registering ...' : 'Register'}
            </SubmitButton>
        </FormContainer>
    )
}

const Heading = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
`
