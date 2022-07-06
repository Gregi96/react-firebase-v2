import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import { Provider } from 'outstated'
import { theme } from 'lib/styles'
import { useAuthStore as authStore } from 'lib/stores'
import { Home, Login, Navigation, Register, PrivateRoute } from 'components'

export const App = () => (
    <ThemeProvider theme={theme}>
        <Provider stores={[authStore]}>
            <AppContainer>
                <BrowserRouter>
                    <Navigation/>
                    <Routes>
                        <Route
                            path="/"
                            element={(
                                <PrivateRoute>
                                    <Home/>
                                </PrivateRoute>
                            )}
                        />
                        <Route
                            path="/login"
                            element={(
                                <Login/>
                            )}
                        />
                        <Route
                            path="/register"
                            element={(
                                <Register/>
                            )}
                        />
                    </Routes>
                </BrowserRouter>
            </AppContainer>
        </Provider>
    </ThemeProvider>
)

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`
