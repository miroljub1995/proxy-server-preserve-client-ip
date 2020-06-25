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

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/saved">
          <Saved />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/account">
          <p>Account</p>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
