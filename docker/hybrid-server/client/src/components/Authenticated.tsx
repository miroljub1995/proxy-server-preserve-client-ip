import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { useUserStatus } from './UserStatus'

const Authenticated: FC<{ redirect?: boolean }> = ({ children, redirect }) => {
    const [userStatus] = useUserStatus()
    if (userStatus.isAuthenticated)
        return (<>{children}</>)
    return redirect ? <Redirect push to='/login' /> : null
}

export default Authenticated