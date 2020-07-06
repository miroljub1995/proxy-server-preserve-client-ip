import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useUserStatus } from './UserStatus'

const Authenticated: FC = ({ children }) => {
    const [userStatus] = useUserStatus()
    if (userStatus.isAuthenticated)
        return (<>{children}</>)
    return (<Redirect push to='/login' />)
}

export default Authenticated