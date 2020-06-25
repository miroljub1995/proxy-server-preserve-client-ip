import React from 'react';
import './App.css'
import Navigation from './Navigation'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/saved">
          <p>Saved</p>
        </Route>
        <Route path="/">
          <p>Home</p>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
