import React from 'react';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Home from './Home';
import Login from './Login';
import Navigation from './Navigation';
import Register from './Register';
import Saved from './Saved';
import UserStatus from './UserStatus';

function App() {
  return (
    <UserStatus>
      <Router>
        <Navigation />
        <Container>
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
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </UserStatus>
  )
}

export default App
