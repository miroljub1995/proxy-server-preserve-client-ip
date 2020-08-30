import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router } from "react-router-dom"
import Navigation from './Navigation'
import Routes from './Routes'
import UserStatus from './UserStatus'

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
