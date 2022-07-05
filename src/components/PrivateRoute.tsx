import React, { Fragment, useContext } from 'react'
import { AuthContext } from 'context/AuthContext'
import { Link, Navigate } from 'react-router-dom'

type PrivateRouteProps = {
    children?: React.ReactNode,
}

export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
        children
    }) => {
    const { user } = useContext(AuthContext)

    if (!user) {
        return (
            <Navigate
                to='/login'
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
