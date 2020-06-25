import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

function Navigation() {
  return (
   <Navbar bg="light" expand="lg">
     <Navbar.Brand href="/">Location saver</Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/saved">Saved</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default Navigation