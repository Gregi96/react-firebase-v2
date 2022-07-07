import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Navigation, PrivateRoute, Register } from 'components'
import React from 'react'

export const renderRoutes = () => (
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
)
