import React, { createContext, Dispatch, FC, useCallback, useContext, useEffect, useReducer, useState } from 'react'

interface IUserStatus {
  isAuthenticated: boolean
  email?: string
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

interface LoginAction {
  type: typeof LOGIN
  payload: { email: string }
}

interface LogoutAction {
  type: typeof LOGOUT
}

type ActionTypes = LoginAction | LogoutAction

export function login(email: string): LoginAction {
  return {
    type: LOGIN,
    payload: { email }
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
        email: action.payload.email
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        email: undefined
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
    const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/check-login', {
      credentials: 'include'
    })
    if (res.status === 200) {
      const { email } = await res.json()
      dispatch(login(email))
    }
    setLoginChecked(true)
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