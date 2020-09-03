import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import RegisterPage from '../pages/RegisterPage'
import Saved from './Saved'
import ViewPostPage from '../pages/ViewPostPage'
import NewPostPage from '../pages/NewPostPage'
import EditPostPage from '../pages/EditPostPage'
import MyPostsPage from '../pages/MyPostsPage'

const Routes: FC<{}> = () => (
  <Switch>
    <Route path="/saved" component={Saved} />
    <Route path="/login" component={LoginPage} />
    <Route path="/register" component={RegisterPage} />
    <Route path="/account">
      <p>Account</p>
    </Route>
    <Route path="/create/post" component={NewPostPage} />
    <Route path="/posts/:id" component={ViewPostPage} />
    <Route path="/edit/post/:id" component={EditPostPage} />
    <Route path="/my/posts" component={MyPostsPage} />
    <Route exact path="/" component={HomePage} />
  </Switch>
)

export default Routes