import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import NewHome from './NewHome'
import Register from './Register'
import Saved from './Saved'

const Routes: FC<{}> = () => (
  <Switch>
    <Route path="/saved">
      <Saved />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
    <Route path="/account">
      <p>Account</p>
    </Route>
    <Route path="/">
      <NewHome />
    </Route>
  </Switch>
)

export default Routes