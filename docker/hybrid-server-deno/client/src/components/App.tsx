import React from 'react';
import './App.css'
import Navigation from './Navigation'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Saved from './Saved';
import Home from './Home';
import Login from './Login';
import { Container } from 'react-bootstrap'
import Register from './Register';

function App() {
  return (
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
  )
}

export default App
