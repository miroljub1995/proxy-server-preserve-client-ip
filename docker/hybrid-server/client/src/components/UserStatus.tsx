import React, { createContext, Dispatch, FC, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { ApiEndpoints } from '../api/endpoints'

interface IUserStatus {
  isAuthenticated: boolean
  user?: {
    _id: string,
    email: string
  }
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

interface LoginAction {
  type: typeof LOGIN
  payload: { _id: string, email: string }
}

interface LogoutAction {
  type: typeof LOGOUT
}

type ActionTypes = LoginAction | LogoutAction

export function login(info: { _id: string, email: string }): LoginAction {
  return {
    type: LOGIN,
    payload: info
  }
}

export function logout(): LogoutAction {
  return {
    type: LOGOUT,
  }
}

const reducer = (state: IUserStatus, action: ActionTypes): IUserStatus => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      }
  }
};

const UserStatusContext = createContext<[IUserStatus, Dispatch<ActionTypes>]>([{ isAuthenticated: false }, v => { }])

export function useUserStatus() {
  return useContext(UserStatusContext)
}

const UserStatus: FC = ({ children }) => {
  const [status, dispatch] = useReducer(reducer, { isAuthenticated: false })
  const [loginChecked, setLoginChecked] = useState(false)
  const checkLogin = useCallback(async () => {
    try {

      const res = await fetch(ApiEndpoints.check_login, {
        credentials: 'include'
      })
      if (res.status === 200) {
        const { email, _id } = await res.json()
        dispatch(login({ email, _id }))
      }
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setLoginChecked(true)
    }
  }, [dispatch, setLoginChecked])
  useEffect(() => {
    checkLogin()
  }, [checkLogin])
  return (
    <UserStatusContext.Provider value={[status, dispatch]}>
      {loginChecked && children}
    </UserStatusContext.Provider>
  )
}

export default UserStatus