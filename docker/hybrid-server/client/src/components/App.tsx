import React from 'react'
import { Container } from 'react-bootstrap'
import { HashRouter as Router } from "react-router-dom"
import Navigation from './Navigation'
import Routes from './Routes'
import UserStatus from './UserStatus'
import './Cursors.scss'

function App() {
  return (
    <UserStatus>
      <Router>
        <Navigation />
        <Container>
          <Routes />
        </Container>
      </Router>
    </UserStatus>
  )
}

export default App
