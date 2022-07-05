import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from 'lib/styles'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Navigation, Register} from 'components'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from 'context/AuthContext'
import { PrivateRoute } from 'components/PrivateRoute'

export const App = () => (
    <ThemeProvider theme={theme}>
        <AuthProvider>
            <AppContainer>
                    <BrowserRouter>
                        <Navigation />
                        <Routes>
                            <Route
                               path='/'
                               element={(
                                   <PrivateRoute>
                                       <Home />
                                   </PrivateRoute>)}
                            />
                            <Route
                                path="/login"
                                element={<Login />}
                            />
                            <Route
                                path='/register'
                                element={<Register />}
                            />
                        </Routes>
                    </BrowserRouter>
            </AppContainer>
        </AuthProvider>
    </ThemeProvider>
)

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
`
