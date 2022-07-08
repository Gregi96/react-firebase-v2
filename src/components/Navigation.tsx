import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from 'outstated'
import { useAuthStore as authStore } from 'lib/stores'
import { useAuth } from 'lib/hooks'

export const Navigation = () => {
    const { user } = useStore(authStore)
    const { logOut, isLoading } = useAuth()

    return (
        <NavigationContainer>
            {user ? (
                <LogOutButton
                    onClick={logOut}
                    disabled={isLoading}
                >
                    {isLoading ? 'Is loging out' : 'log out'}
                </LogOutButton>
            ) : (
                <Fragment>
                    <BaseLink to="/login">
                        Log in
                    </BaseLink>
                    <BaseLink to="/register">
                        Register
                    </BaseLink>
                </Fragment>
            )}
        </NavigationContainer>
    )
}

const NavigationContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.backgroundColor};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px 30px;
    border-bottom: 1px solid #d2d1d1;
    height: 80px;
`

const BaseLink = styled(Link)`
    margin-right: 10px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      color: black;
    }
`

const LogOutButton = styled.button`
    padding: 5px 15px;
    border: none;
    background-color: ${({ theme }) => theme.colors.blueviolet};
    color: white;
    border-radius: 5px;
`
