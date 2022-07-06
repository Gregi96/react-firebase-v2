import React, { Fragment, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useStore } from 'outstated'
import { useAuthStore as authStore } from 'lib/stores'

export const Navigation = () => {
    const { user,  logOut, isLoading } = useStore(authStore)
    const navigation = useNavigate()

    const signOutFunction = () => logOut()
        .then(() => navigation('/login'))

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <NavigationContainer>
            {user ? (
                <button onClick={signOutFunction}>
                    Log out
                </button>
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
    padding: 20px 30px;
    border-bottom: 1px solid #d2d1d1;
`

const BaseLink = styled(Link)`
    margin-right: 10px;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      color: black;
    }
`
