import React from 'react'
import {
  Navbar,
  Nav,
  NavDropdown
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navigation() {
  const email = "miroljub1995@gmail.com"
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Location saver</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/saved">Saved</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <NavDropdown title={email} id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation