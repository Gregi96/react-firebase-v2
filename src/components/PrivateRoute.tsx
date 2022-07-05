import React, { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useStore } from 'outstated'
import { useAuthStore as authStore } from '../lib/stores'

type PrivateRouteProps = {
    children?: React.ReactChild
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({ children }) => {
    const { user } = useStore(authStore)

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        )
    }

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}
