import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Navigation, PrivateRoute, Register } from 'components'

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
