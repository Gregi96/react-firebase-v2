import React, { useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { useStore } from 'outstated'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from 'firebase'
import { theme } from 'lib/styles'
import { useAuthStore as authStore } from 'lib/stores'
import { renderRoutes } from 'lib/routing'
import { useActiveUserStatus } from 'lib/hooks'

export const App = () => {
    const { setUser, setIsAuthorized  } = useStore(authStore)

    useActiveUserStatus()
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user)
            setIsAuthorized(true)
        })
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <AppContainer>
                {renderRoutes()}
            </AppContainer>
        </ThemeProvider>
    )
}

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`
